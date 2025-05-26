import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Users } from "lucide-react";

export default function AdminTitle({
  participantsCount,
  paymentCount,
  totalAmount,
}: {
  participantsCount: number;
  paymentCount: number;
  totalAmount: number;
}) {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-2">
      <div className="flex flex-col">
        <span className="text-3xl font-bold text-primary">Administration</span>
        <span className="text-md text-zinc-400">
          Voici la liste des participants et des factures.
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        <Card className="gap-2">
          <CardHeader className="flex flex-row items-center justify-between gap=0">
            <CardTitle className="text-sm font-medium">
              Nombre de participants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{participantsCount}</div>
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader className="flex flex-row items-center justify-between gap=0">
            <CardTitle className="text-sm font-medium">
              Paiement confirmé
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {paymentCount}
            </div>
          </CardContent>
        </Card>

        <Card className="gap-2">
          <CardHeader className="flex flex-row items-center justify-between gap=0">
            <CardTitle className="text-sm font-medium">
              Total des paiements
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount / 100},00€</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
