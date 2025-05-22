import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (secret !== process.env.WEBHOOK_SECRET) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const payload = JSON.parse(rawBody);

  console.log("🚀 ~ file: route.ts:54 ~ POST ~ payload:", payload);

  if (payload.object === "payment" && payload.is_paid) {
    const providerId = payload.id;

    const payment = await prisma.payment.findFirst({
      where: { providerId },
      include: { order: true },
    });

    if (!payment || !payment.order)
      return new NextResponse("Order not found", { status: 404 });

    const order = payment.order;

    // Mise à jour du statut du paiement
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "paid" },
    });

    const attendees = Array.isArray(order.attendees) ? order.attendees : [];

    const allParticipants = [
      {
        orderId: order.id,
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        offer: "Standard",
      },
      ...attendees.map((p: any) => ({
        orderId: order.id,
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        offer: "Standard",
      })),
    ];

    await prisma.participant.createMany({
      data: allParticipants,
    });

    console.log("✅ Participants créés après paiement PayPlug");
  }

  return new NextResponse("OK");
}
