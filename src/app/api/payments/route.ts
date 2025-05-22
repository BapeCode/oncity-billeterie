import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, quantity, attendees } =
    await req.json();

  const allParticipants = [
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    },
    ...attendees.map((p: any) => ({
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      phone: p.phone,
    })),
  ];

  const order = await prisma.order.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      attendees: JSON.stringify(allParticipants),
    },
  });

  const res = await fetch("https://api.payplug.com/v1/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYPLUG_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: quantity * 4500,
      currency: "EUR",
      customer: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        email: email,
      },
      hosted_payment: {
        return_url:
          process.env.URL_PUBLIC + `confirm/success?orderId=${order.id}`,
      },
    }),
  });

  const payment = await res.json();

  await prisma.payment.create({
    data: {
      providerId: payment.id,
      status: payment.is_paid ? "paid" : "pending",
      amount: payment.amount,
      order: {
        connect: {
          id: order.id,
        },
      },
    },
  });

  return NextResponse.json({ url: payment.hosted_payment.payment_url });
}
