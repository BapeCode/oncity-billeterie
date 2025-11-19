"use client";

import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { redirect } from "next/navigation";
import { GetTicketsByPaymentId } from "@/app/action.action";
import { toast } from "sonner";

export default function ModalTickets() {
  const handleSearch = async () => {
    const paymentNumber: string = (
      document.getElementById("paymentNumber") as HTMLInputElement
    ).value;
    const resp = await GetTicketsByPaymentId({ paymentNumber });

    if (resp?.data?.error) {
        toast.error(resp?.data?.error)
    } else {
        toast.success("Billets trouvés")
        redirect(`/my-tickets/${paymentNumber}`);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="cursor-pointer text-lg">
          Mes billets
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">
              Chercher mes billets
            </AlertDialogTitle>
            <AlertDialogDescription>
              Pour retrouver vos billets, veuillez saisir votre numéro de
              paiement.
              <Input
                className="w-full mt-4"
                placeholder="Numéro de paiement"
                type="text"
                name="paymentNumber"
                id="paymentNumber"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleSearch}>
              Rechercher
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
