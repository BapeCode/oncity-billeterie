"use server";

import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/libs/prisma";
import z from "zod";

const QRCodeSchema = z.object({
  code: z.string(),
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
