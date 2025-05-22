"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Section from "@/components/layout/Section";
import { CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import jsPDF from "jspdf";

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

      // Background blanc
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 210, 297, "F");

      // Soirée
      doc.setTextColor(217, 183, 90); // #d9b75a
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Soirée blanche", 20, 30);

      doc.setTextColor(113, 113, 123); // #71717b
      doc.setFontSize(12);
      doc.text(`ID Commande : ${order.id}`, 20, 36);
      doc.text(`${order.payment.amount / 100}€`, 20, 42);

      doc.setFontSize(16);
      doc.setTextColor(217, 183, 90);
      doc.text("Mardi 17 Juin 2025 - 19:30", 120, 30);

      // Nom complet du ticket
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(ticket.name, 105, 90, { align: "center" });

      // QR Code
      doc.addImage(ticket.qr, "PNG", 165, 60, 30, 30);

      // Conditions
      doc.setFillColor(197, 197, 197);
      doc.rect(0, 220, 210, 60, "F");
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Conditions d’utilisation", 10, 230);

      const conditions = [
        "Ce ticket est personnel, non remboursable, non échangeable.",
        "L’accès est contrôlé à l’entrée via code QR.",
        "Une tenue blanche est requise. Aucun animal accepté.",
        "Ce billet donne accès à un bracelet, une boisson, un buffet et deux concours.",
        "L’organisateur se réserve le droit de refuser l’entrée en cas de non-respect.",
      ];

      let y = 236;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      conditions.forEach((line) => {
        doc.text(line, 10, y);
        y += 6;
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
      </div>
    </Section>
  );
}
