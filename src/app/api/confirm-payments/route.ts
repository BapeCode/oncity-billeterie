import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token: string = searchParams.get("token") || "";

  if (!token) return NextResponse.json("Invalid Order ID", { status: 400 });

  const order = await prisma.order.findUnique({
    where: { accessToken: token },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      attendees: true,
      payment: {
        select: {
          id: true,
          providerId: true,
          amount: true,
          status: true,
        },
      },
    },
  });

  if (!order || !order.payment)
    return NextResponse.json("Order not found", { status: 404 });

  const payplugRes = await fetch(
    `https://api.payplug.com/v1/payments/${order.payment.providerId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYPLUG_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const payplugData = await payplugRes.json();
  if (!payplugData.is_paid) {
    return new NextResponse("Paiement non confirmé", { status: 403 });
  }

  if (order.payment.status !== "paid") {
    await prisma.payment.update({
      where: { id: order.payment.id },
      data: { status: "paid" },
    });

    const attendees = JSON.parse(order.attendees || "[]");

    await prisma.participant.createMany({
      data: attendees.map((p: any) => ({
        orderId: order.id,
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        offer: "Standard",
      })),
    });
  }

  return NextResponse.json({ success: true, order: order });
}
