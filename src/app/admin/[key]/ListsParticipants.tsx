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
import { Download, File, Search } from "lucide-react";

export default function ListParticipants({ orders }: { orders: any[] }) {
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
                <Button variant="outline">
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
                        <TableHead className="text-left">
                          Ticket utiliser
                        </TableHead>
                        <TableHead className="text-left">Commande ID</TableHead>
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
                          console.log(part.ticket?.used);
                          return (
                            <TableRow key={orderIndex + partIndex}>
                              <TableCell>
                                {orderIndex + partIndex + 1}
                              </TableCell>
                              <TableCell>{part.lastName}</TableCell>
                              <TableCell>{part.firstName}</TableCell>
                              <TableCell>{part.email}</TableCell>
                              <TableCell className="text-left">
                                {part.ticket?.used !== undefined
                                  ? part.ticket.used
                                    ? "Oui"
                                    : "Non"
                                  : "Non générer"}
                              </TableCell>
                              <TableCell className="text-left">
                                {part.orderId}
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
      </Tabs>
    </div>
  );
}
