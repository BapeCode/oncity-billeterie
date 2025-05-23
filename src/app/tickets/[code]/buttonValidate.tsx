"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ValidateTicket } from "@/app/action.action"; // ← server action côté backend
import { useRouter } from "next/navigation";

export default function ButtonValidate({ ticketCode }: { ticketCode: string }) {
  const router = useRouter();

  const handleValidate = async () => {
    try {
      const res = await ValidateTicket({ code: ticketCode });

      if (res?.data?.success) {
        toast.success("✅ Le ticket a été validé !");
        setTimeout(() => {
          router.refresh();
        }, 1500);
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
