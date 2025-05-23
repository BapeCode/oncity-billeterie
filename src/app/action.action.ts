"use server";

import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/libs/prisma";
import QRCode from "qrcode";
import z from "zod";

const QRCodeSchema = z.object({
  code: z.string(),
});

const GetTicketsByPaymentIdSchema = z.object({
  paymentNumber: z.string(),
});

export const GetCountTickets = actionClient.action(async () => {
  const res = await prisma.participant.count();

  if (res === 0)
    return {
      success: true,
      tickets: res,
    };

  if (res >= 200)
    return {
      error: "Erreur, vous avez déjà réservé 200 places",
    };
});

export const GetCodeQR = actionClient
  .schema(QRCodeSchema)
  .action(async ({ parsedInput: { code } }) => {
    if (!code)
      return {
        error: "Aucun QRCode trouver",
      };

    const res = await prisma.participant.findFirst({
      where: {
        ticket: {
          code: code,
        },
      },
      include: {
        ticket: true,
      },
    });

    if (!res)
      return {
        error: "QRCode invalide. Aucune personne est affilié à ce QRCode",
      };

    if (res.ticket?.used)
      return {
        error: "QRCode invalide. Ce QRCode a déjà été utilisé",
      };

    return {
      success: true,
      data: res,
    };
  });

export const ValidateTicket = actionClient
  .schema(QRCodeSchema)
  .action(async ({ parsedInput: { code } }) => {
    if (!code) return { error: "Aucun QRCode trouver" };

    const now = new Date();
    const limitDate = new Date("2025-06-17T18:00:00+02:00");

    if (now < limitDate) {
      return {
        error:
          "La validation du buillet ne sera disponible qu'à partir du Mardi 17 Juin 2025.",
      };
    }

    const res = await prisma.participant.findFirst({
      where: {
        ticket: {
          code: code,
        },
      },
      include: {
        ticket: true,
      },
    });

    if (!res)
      return {
        error: "QRCode invalide. Aucune personne est affilié à ce QRCode",
      };

    if (res.ticket?.used)
      return { error: "QRCode invalide. Ce QRCode a déjà été utilisé" };

    const used = await prisma.participant.update({
      where: {
        id: res.id,
      },
      data: {
        ticket: {
          update: {
            used: true,
          },
        },
      },
    });

    if (!used) return { error: "Erreur lors de la validation du ticket" };

    return {
      success: true,
      data: res,
    };
  });

export const GetTicketsByPaymentId = actionClient
  .schema(GetTicketsByPaymentIdSchema)
  .action(async ({ parsedInput: { paymentNumber } }) => {
    if (!paymentNumber)
      return {
        error: "Aucun numéro de paiement trouver",
      };

    const res = await prisma.payment.findFirst({
      where: {
        providerId: paymentNumber,
      },
      include: {
        order: {
          select: {
            firstName: true,
            lastName: true,
            accessToken: true,
            participants: {
              select: {
                firstName: true,
                lastName: true,
                ticket: {
                  select: {
                    code: true,
                    used: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    let qrcode: any[] = [];

    for (const item of res?.order?.participants ?? []) {
      const qrURL = await QRCode.toDataURL(
        `${process.env.URL_PUBLIC}tickets/${item.ticket?.code}`
      );
      qrcode.push({
        name: `${item.firstName} ${item.lastName}`,
        url: qrURL,
        used: item.ticket?.used,
      });
    }

    if (!res)
      return {
        error: "Aucun paiement trouvé",
      };

    return {
      success: true,
      data: res,
      qrcode: qrcode,
    };
  });
