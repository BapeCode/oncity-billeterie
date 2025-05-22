"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ValidateTicket } from "@/app/action.action"; // ← server action côté backend

export default function ButtonValidate({ ticketCode }: { ticketCode: string }) {
  const handleValidate = async () => {
    try {
      const res = await ValidateTicket({ code: ticketCode });

      if (res?.data?.success) {
        toast.success("✅ Le ticket a été validé !");
      } else {
        toast.error(res?.data?.error || "Erreur inconnue.");
      }
    } catch (err) {
      toast.error("Erreur de validation");
    }
  };

  return (
    <Button onClick={handleValidate} variant="default">
      Valider le passage
    </Button>
  );
}
