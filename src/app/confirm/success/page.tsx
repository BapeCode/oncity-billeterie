"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Section from "@/components/layout/Section";
import { CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import jsPDF from "jspdf";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any | null>(null);
  const [qrCode, setQrCode] = useState<any[]>([]);

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/confirm-payments?orderId=${orderId}`)
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
  }, [orderId]);

  const handleGenerateTickets = async (orderId: number) => {
    const res = await fetch("/api/generate-tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
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
      doc.text("Soirée Blanche – OnCity x Lyon 6e", 105, 30, {
        align: "center",
      });

      doc.setFontSize(14);
      doc.text("Mardi 17 Juin 2025 – 19h30", 105, 40, { align: "center" });

      // Infos participant
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`ID Commande : ${order.id}`, 20, 55);
      doc.text(`Participant : ${ticket.name}`, 20, 63);
      doc.text(`Montant : ${order.payment.amount / 100} €`, 20, 71);
      doc.text(
        `Lieu : Café du pond, 11 Pl. Maréchal Lyautey, 69006 Lyon`,
        20,
        79
      );

      // QR Code
      doc.addImage(ticket.qr, "PNG", 150, 55, 40, 40);
      doc.setFontSize(10);
      doc.text("Présentez ce QR Code à l’entrée", 170, 97, { align: "center" });

      // Détails de l’événement
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Inclus avec votre billet :", 20, 105);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const inclus = [
        "Accès à la soirée privée",
        "Une boisson offerte",
        "Accès au buffet dinatoire",
        "Participation aux concours de pétanque & élégance",
      ];
      inclus.forEach((line, idx) => {
        doc.text(line, 25, 115 + idx * 8);
      });

      // Conditions
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);
      doc.text("Conditions d’utilisation :", 20, 155);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const conditionsText =
        "Ce billet est strictement personnel, non remboursable et non échangeable. L’accès à l’événement est soumis à la présentation du QR code unique figurant sur ce document. Une tenue vestimentaire blanche est exigée pour l’ensemble des participants. L’accès pourra être refusé à toute personne ne respectant pas le dress code ou les règles de sécurité en vigueur. Les animaux ne sont pas autorisés sur le lieu de l’événement. L’organisateur se réserve le droit d’admission sans avoir à en justifier les raisons. En cas d’annulation indépendante de la volonté de l’organisateur, aucun remboursement ne pourra être exigé.";

      const splitText = doc.splitTextToSize(conditionsText, 170);
      doc.text(splitText, 20, 163);

      // Footer
      doc.setFillColor(15, 42, 39); // vert foncé
      doc.rect(0, 285, 210, 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text("www.soireeblanche.com – Powered by OnCity", 105, 292, {
        align: "center",
      });
    }

    doc.save(`billets-${order.firstName}-${order.lastName}.pdf`);
  };

  if (!order) return null;

  return (
    <Section className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-start w-full h-full gap-2">
        <CheckCircle className="h-15 w-15 text-green-500" />
        <span className="text-3xl font-bold text-black">Paiement validé</span>
        <span className="text-lg font-medium text-zinc-500">
          Merci pour votre achat et votre confiance. Votre place a bien été
          réservée.
        </span>

        <div className="flex flex-col items-center justify-start p-6 border-border border rounded-md mt-5 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">Résumé de la commande</span>
            <span className="text-md font-medium text-zinc-500">
              Vous pouvez retrouver le récapitulatif de votre commande
              ci-dessous.
            </span>
          </div>

          <ul className="flex flex-col items-center w-full">
            <li className="flex items-center justify-between gap-2 w-full">
              <span className="text-md font-medium text-black">
                Numéro de la commande :
              </span>
              <span className="text-md font-medium text-zinc-600">
                {orderId ? orderId : "N/A"}
              </span>
            </li>

            <li className="flex items-center justify-between gap-2 w-full">
              <span className="text-md font-medium text-black">
                Numéro de paiement :
              </span>
              <span className="text-md font-medium text-zinc-600">
                {order.payment.providerId ? order.payment.providerId : "N/A"}
              </span>
            </li>

            <li className="flex items-center justify-between gap-2 w-full">
              <span className="text-md font-medium text-black">
                Nom et Prénom :
              </span>
              <span className="text-md font-medium text-zinc-600">
                {order.lastName.toUpperCase()} {order.firstName}
              </span>
            </li>

            <li className="flex items-center justify-between gap-2 w-full">
              <span className="text-md font-medium text-black">Billet(s)</span>
              <span className="text-md font-medium text-zinc-600">
                {order.attendees ? JSON.parse(order.attendees).length : 0}
              </span>
            </li>

            <li className="flex items-center justify-between gap-2 w-full">
              <span className="text-md font-medium text-black">Soirée</span>
              <span className="text-md font-medium text-zinc-600">
                Soirée OnCity & Lyon 6ème
              </span>
            </li>

            <li className="flex items-center justify-between gap-2 w-full">
              <span className="text-md font-medium text-black">Prix TTC</span>
              <span className="text-md font-medium text-zinc-600">
                {order.payment.amount
                  ? order.payment.amount / 100 + ",00€"
                  : "N/A"}
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
              onClick={() => handleGenerateTickets(order.id)}
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
