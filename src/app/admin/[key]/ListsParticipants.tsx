"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPhone, formatTime } from "@/lib/format";
import jsPDF from "jspdf";
import { Download, File, Search } from "lucide-react";

export default function ListParticipants({ orders }: { orders: any[] }) {
  const exportParticipantsToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(
      "Liste des Participants - Soirée en blanc Lyon 6ème OnCity",
      20,
      20
    );

    doc.setFontSize(10);
    doc.text(`Exporté le: ${new Date().toLocaleDateString("fr-FR")}`, 20, 30);

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    let yPosition = 50;
    doc.text("ID", 20, yPosition);
    doc.text("Nom", 40, yPosition);
    doc.text("Prénom", 70, yPosition);
    doc.text("Email", 100, yPosition);
    doc.text("Téléphone", 150, yPosition);

    doc.line(20, yPosition + 2, 190, yPosition + 2);

    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    yPosition += 10;

    orders.forEach((part, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      const partIndex = index + 1;

      doc.text(partIndex.toString(), 20, yPosition);
      doc.text(part.lastName, 40, yPosition);
      doc.text(part.firstName, 70, yPosition);
      doc.text(
        part.email.length > 20
          ? part.email.substring(0, 20) + "..."
          : part.email,
        100,
        yPosition
      );
      doc.text(part.phone, 150, yPosition);

      yPosition += 8;
    });

    doc.save("liste_participants_soiree_blanche.pdf");
  };

  const exportFactureToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Facture - Soirée en blanc Lyon 6ème OnCity", 20, 20);

    doc.setFontSize(10);
    doc.text(`Exporté le: ${new Date().toLocaleDateString("fr-FR")}`, 20, 30);

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    let yPosition = 80;
    doc.text("ID", 20, yPosition);
    doc.text("Nom", 40, yPosition);
    doc.text("Prénom", 65, yPosition);
    doc.text("Montant", 90, yPosition);
    doc.text("Statut", 115, yPosition);
    doc.text("Date", 140, yPosition);

    doc.line(20, yPosition + 2, 190, yPosition + 2);
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    yPosition += 10;

    orders.forEach((order, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      const orderIndex = index + 1;
      const price = order.payment?.amount / 100;

      doc.text(orderIndex.toString(), 20, yPosition);
      doc.text(order.lastName, 40, yPosition);
      doc.text(order.firstName, 65, yPosition);
      doc.text(price.toString() + "€", 90, yPosition);
      doc.text(order.payment?.status ? "Payé" : "En attente", 115, yPosition);
      doc.text(formatTime(order.payment?.createdAt) || "N/A", 140, yPosition);

      yPosition += 8;
    });
    doc.save("facture_soiree_blanche.pdf");
  };

  return (
    <div className="w-full h-full flex flex-col mt-6">
      <Tabs defaultValue="participants">
        <TabsList
          defaultValue={"participants"}
          className="grid w-full grid-cols-2"
        >
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
        </TabsList>

        <TabsContent value="participants">
          <Card className="w-full p-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start gap-1">
                <CardTitle>Liste des Participants</CardTitle>
                <CardDescription>
                  Gérez tous les participants inscrits à votre soirée
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="default">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
                <Button variant="outline" onClick={exportParticipantsToPDF}>
                  <File className="h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center gap-2 bg-popover rounded-md border px-4 py-2">
                  <Label htmlFor="search">
                    <Search className="h-4 w-4" />
                  </Label>
                  <input
                    type="text"
                    id="search"
                    className="w-full bg-transparent outline-none text-sm"
                    placeholder="Rechercher un participant"
                  />
                </div>

                <div className="rounded-md border w-full p-2">
                  <Table>
                    <TableCaption>Liste des participants</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-left">Téléphone</TableHead>
                        <TableHead className="text-left">
                          Status ticket
                        </TableHead>
                        <TableHead className="text-right">
                          Paiement ID
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">
                            Aucun participant trouvé
                          </TableCell>
                        </TableRow>
                      )}

                      {orders.map((order, orderIndex) => {
                        return order.participants.map((part, partIndex) => {
                          return (
                            <TableRow key={orderIndex + partIndex}>
                              <TableCell>
                                {orderIndex + partIndex + 1}
                              </TableCell>
                              <TableCell>{part.lastName}</TableCell>
                              <TableCell>{part.firstName}</TableCell>
                              <TableCell>{part.email}</TableCell>
                              <TableCell className="text-left">
                                {formatPhone(order?.phone)}
                              </TableCell>
                              <TableCell className="text-left">
                                {part.ticket?.used !== undefined
                                  ? part.ticket.used
                                    ? "Oui"
                                    : "Non"
                                  : "Non générer"}
                              </TableCell>
                              <TableCell className="text-right">
                                {order.payment.providerId}
                              </TableCell>
                            </TableRow>
                          );
                        });
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="w-full p-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start gap-1">
                <CardTitle>Paiement & Facturation</CardTitle>
                <CardDescription>
                  Suivez tous les paiements et leur statut
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="default">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
                <Button variant="outline" onClick={exportFactureToPDF}>
                  <File className="h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex items-center gap-2 bg-popover rounded-md border px-4 py-2">
                  <Label htmlFor="search">
                    <Search className="h-4 w-4" />
                  </Label>
                  <input
                    type="text"
                    id="search"
                    className="w-full bg-transparent outline-none text-sm"
                    placeholder="Rechercher un participant"
                  />
                </div>

                <div className="rounded-md border w-full p-2">
                  <Table>
                    <TableCaption>Liste des participants</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID de commande</TableHead>
                        <TableHead>Paiement ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead className="text-left">Montant</TableHead>
                        <TableHead className="text-left">Status</TableHead>
                        <TableHead className="text-right">
                          Date de paiement
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">
                            Aucun facturation trouvé
                          </TableCell>
                        </TableRow>
                      )}

                      {orders.map((order, orderIndex) => {
                        return (
                          <TableRow key={orderIndex + orderIndex}>
                            <TableCell>{orderIndex + 1}</TableCell>
                            <TableCell>
                              {order.payment?.providerId ?? "NA"}
                            </TableCell>
                            <TableCell>{order.lastName}</TableCell>
                            <TableCell>{order.firstName}</TableCell>
                            <TableCell>
                              {order.payment?.amount
                                ? order.payment?.amount / 100 + ",00€"
                                : "NA"}
                            </TableCell>
                            <TableCell className="text-left">
                              {order.payment?.status === "paid" ? (
                                <Badge className="bg-green-500 text-white">
                                  Paiement confirmé
                                </Badge>
                              ) : order.payment?.status === "pending" ? (
                                <Badge className="bg-yellow-500 text-white">
                                  Paiement en attente
                                </Badge>
                              ) : (
                                <Badge className="bg-red-500 text-white">
                                  Paiement échoué
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {order.payment?.createdAt
                                ? formatTime(order.payment?.createdAt)
                                : "NA"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
