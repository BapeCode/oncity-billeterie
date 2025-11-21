"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Section from "@/components/layout/Section";
import { CheckCircle, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import jsPDF from "jspdf";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [order, setOrder] = useState<any | null>(null);
  const [qrCode, setQrCode] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;

    fetch(`/api/confirm-payments?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.order);
        } else {
          toast.error("❌ Paiement non validé");
        }
      })
      .catch((err) => {
        console.error("Erreur API:", err);
      });
  }, [token]);

  const handleGenerateTickets = async (token: string) => {
    const res = await fetch("/api/generate-tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (res.ok) {
      const data = await res.json();
      setQrCode(data.QrData);
      toast.success("Billets générés !");
    } else {
      toast.error("Erreur lors de la génération.");
    }
  };

  const generateTickets = async () => {
    if (!order || !qrCode.length) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    for (let i = 0; i < qrCode.length; i++) {
      const ticket = qrCode[i];
      if (i > 0) doc.addPage();

      // Fond
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 210, 297, "F");

      // En-tête
      doc.setTextColor(217, 183, 90); // or
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("Soirée 1925 - OnCity x Lyon 6e", 105, 30, {
        align: "center",
      });

      doc.setFontSize(14);
      doc.text("Mercredi 17 Décembre 2025 – 21:00 à 2:00", 105, 40, { align: "center" });

      // Infos participant
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`ID Commande : ${order.id}`, 20, 55);
      doc.text(`Participant : ${ticket.name}`, 20, 63);
      doc.text(`Montant : ${order.payment.amount / 100} €`, 20, 71);
      doc.text(
        `Lieu : Gare des Brotteaux, Members, 13 ter Place Jules Ferry, 69006 Lyon `,
        20,
        79
      );

      // QR Code
      doc.addImage(ticket.qr, "PNG", 150, 55, 40, 40);
      doc.setFontSize(10);
      doc.text("Présentez ce QR Code à l'entrée", 170, 97, { align: "center" });

      // Détails de l’événement
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Inclus avec votre billet :", 20, 105);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const inclus = [
        "Accès à la soirée privée",
        "Un cocktail (alcoolisé ou non)",
        "Participation aux concours d'élégance",
      ];
      inclus.forEach((line, idx) => {
        doc.text(line, 25, 115 + idx * 8);
      });

      // Conditions
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);
      doc.text("Conditions d'utilisation :", 20, 155);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const conditionsText =
        "Ce billet est strictement personnel, non remboursable et non échangeable. L’accès à l’événement est soumis à la présentation du QR code unique figurant sur ce document. Une tenue vestimentaire blanche est exigée pour l’ensemble des participants. L’accès pourra être refusé à toute personne ne respectant pas le dress code ou les règles de sécurité en vigueur. Les animaux ne sont pas autorisés sur le lieu de l’événement. L’organisateur se réserve le droit d’admission sans avoir à en justifier les raisons. En cas d’annulation indépendante de la volonté de l’organisateur, aucun remboursement ne pourra être exigé. \nLa vente d’alcool est strictement interdite aux mineurs de moins de 18 ans. Une pièce d’identité pourra être exigée. L’abus d’alcool est dangereux pour la santé, à consommer avec modération. Toute personne en état d’ébriété manifeste pourra se voir refuser l’entrée ou être exclue de l’événement, sans possibilité de remboursement. Des contrôles de sécurité peuvent être effectués à l’entrée. Les objets interdits ou dangereux seront systématiquement confisqués.";

      const splitText = doc.splitTextToSize(conditionsText, 170);
      doc.text(splitText, 20, 163);

      // Footer
      doc.setFillColor(15, 42, 39); // vert foncé
      doc.rect(0, 285, 210, 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("www.lyon6emesoiree.oncity.fr – Powered by Lyon6ème & OnCity", 105, 292, {
        align: "center",
      });
    }

    doc.save(`billets-${order.firstName}-${order.lastName}.pdf`);
  };

  if (!order) return null;

  return (
    <Section className="flex items-start justify-center w-full h-screen p-4 overflow-y-auto">
      <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto">
        {!order ? (
          <X className="h-15 w-15 text-red-500 text-center" />
        ) : (
          <CheckCircle className="h-15 w-15 text-green-500 text-center" />
        )}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xl md:text-3xl font-bold text-black text-center">
            Paiement validé
          </span>
          <span className="text-md md:text-lg font-medium text-zinc-500 text-center">
            Merci pour votre achat et votre confiance. Votre place a bien été
            réservée.
          </span>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-md mt-5 gap-4 w-full">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">Résumé de la commande</span>
            <span className="text-md font-medium text-zinc-500 text-center">
              Vous pouvez retrouver le récapitulatif de votre commande
              ci-dessous.
            </span>
          </div>

          <ul className="flex flex-col items-center w-full">
            <li className="flex flex-col md:flex-row items-center md:justify-between md:w-full gap-2">
              <span className="text-md font-bold text-black">
                Numéro de commande :
              </span>
              <span className="text-md font-medium text-zinc-600">
                {order.id}
              </span>
            </li>
            <li className="flex flex-col md:flex-row items-center md:justify-between md:w-full gap-2">
              <span className="text-md font-bold text-black">
                Numéro de paiement :
              </span>
              <span className="text-md font-medium text-zinc-600">
                {order.payment.providerId}
              </span>
            </li>
            <li className="flex flex-col md:flex-row items-center md:justify-between md:w-full gap-2">
              <span className="text-md font-bold text-black">
                Nom et Prénom :
              </span>
              <span className="text-md font-medium text-zinc-600">
                {order.lastName.toUpperCase()} {order.firstName}
              </span>
            </li>
            <li className="flex flex-col md:flex-row items-center md:justify-between md:w-full gap-2">
              <span className="text-md font-bold text-black">Billet(s)</span>

              <span className="text-md font-medium text-zinc-600">
                {order.attendees ? JSON.parse(order.attendees).length : 0}
              </span>
            </li>
            <li className="flex flex-col md:flex-row items-center md:justify-between md:w-full gap-2">
              <span className="text-md font-bold text-black">Prix TTC</span>

              <span className="text-md font-medium text-zinc-600">
                {order.payment.amount / 100 + ",00€"}
              </span>
            </li>
          </ul>

          {qrCode.length > 0 && (
            <div className="flex flex-col items-center w-full py-4 gap-2">
              <div className="flex items-center justify-between w-full">
                <span className="text-zinc-400">Billets</span>
                <span className="text-primary font-bold text-xl">
                  {qrCode.length}
                </span>
              </div>
              <div className="flex flex-row items-center justify-center flex-wrap w-full gap-2">
                {qrCode.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 border-border border rounded-md p-2"
                  >
                    <img src={item.qr} alt="QR Code" />
                    <span className="text-zinc-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {qrCode.length > 0 ? (
            <Button
              variant={"default"}
              className="w-full"
              onClick={() => generateTickets()}
            >
              <Download className="h-5 w-5 mr-2" />
              Télécharger les billets
            </Button>
          ) : (
            <Button
              variant={"default"}
              className="w-full"
              onClick={() => handleGenerateTickets(token || "")}
            >
              <Download className="h-5 w-5 mr-2" />
              Généré les billets
            </Button>
          )}
        </div>

        <Link href={"/"}>
          <Button variant={"ghost"}>Retour à la page d'accueil</Button>
        </Link>
      </div>
    </Section>
  );
}
