import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { access } from "fs";

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, quantity, attendees } = await req.json();

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
      email: email,
      phone: phone,
    })),
  ];

  const participantToAddCount = allParticipants.length;

  const result = await prisma.$transaction(async (tx: any) => {
    const totalUsers = await tx.participant.count();

    if (totalUsers + participantToAddCount > 100) {
      throw new Error("PLACES_LIMIT_REACHED");
    }

    const generateAccessToken = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      32
    );

    console.log(JSON.stringify(allParticipants));
    console.log(generateAccessToken());

    const order = await tx.order.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        attendees: JSON.stringify(allParticipants),
        accessToken: generateAccessToken(),
      }
    })

    return { order };
  });

  const order = result.order;

  const res = await fetch("https://api.payplug.com/v1/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYPLUG_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: quantity * 2900,
      currency: "EUR",
      customer: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        email: email,
      },
      hosted_payment: {
        return_url:
          process.env.URL_PUBLIC + `confirm/success?token=${order.accessToken}`,
      },
    }),
  })

  const payment = await res.json();

  await prisma.payment.create({
    data: {
      providerId: payment.id,
      status: payment.is_paid ? "paid" : "pending",
      amount: payment.amount || 29,
      order: {
        connect: {
          id: order.id,
        },
      },
    },
  })
  
  return NextResponse.json({ url: payment.hosted_payment.payment_url });
}
