import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

const ticketId = () => {
  return `OCL6-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
};

export async function POST(req: Request) {
  const { token: token } = await req.json();

  if (!token) return NextResponse.json("Invalid Order ID", { status: 400 });

  const order = await prisma.order.findFirst({
    where: {
      accessToken: token,
    },
    include: {
      participants: {
        include: {
          ticket: true,
        },
      },
    },
  });

  if (!order)
    return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const qrData: { name: string; qr: string }[] = [];

  for (const item of order.participants) {
    if (!item.ticket) {
      const code = ticketId();
      await prisma.qRCodeTicket.create({
        data: {
          code,
          participant: {
            connect: {
              id: item.id,
            },
          },
        },
      });

      const qrUrl = await QRCode.toDataURL(
        `${process.env.URL_PUBLIC}tickets/${code}`
      );
      qrData.push({ name: `${item.firstName} ${item.lastName}`, qr: qrUrl });
    } else {
      const qrUrl = await QRCode.toDataURL(
        `${process.env.URL_PUBLIC}tickets/${item.ticket.code}`
      );
      qrData.push({ name: `${item.firstName} ${item.lastName}`, qr: qrUrl });
    }
  }

  return NextResponse.json({ success: true, QrData: qrData });
}
