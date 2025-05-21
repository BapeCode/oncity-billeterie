import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/libs/prisma";

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
