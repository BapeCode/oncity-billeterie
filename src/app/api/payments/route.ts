import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, amount } = await req.json();

  const auth = Buffer.from(process.env.PAYPLUG_SECRET_KEY + ":").toString(
    "base64"
  );

  const res = await fetch("https://api.payplug.com/v1/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYPLUG_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount * 100,
      currency: "EUR",
      customer: { email },
      hosted_payment: {
        return_url: "http://localhost:3000/merci",
      },
      notification_url: "http://localhost:3000/api/payments/webhook",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(data);
    return NextResponse.json({ error: "Erreur PayPlug" }, { status: 500 });
  }

  return NextResponse.json({ url: data.hosted_payment.payment_url });
}
