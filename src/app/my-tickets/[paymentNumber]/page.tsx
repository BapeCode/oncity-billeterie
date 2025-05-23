import { GetTicketsByPaymentId } from "@/app/action.action";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: {
    paymentNumber: string;
  };
}) {
  const { paymentNumber } = await params;
  if (!paymentNumber) {
    return null;
  }
  const res = await GetTicketsByPaymentId({ paymentNumber });

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full">
      <Navigation />
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-6 h-full">
        {res?.data?.error ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <span className="text-2xl font-medium text-red-500">
              {res?.data?.error}
            </span>
            <Link href={"/"}>
              <Button variant={"ghost"}>
                <ArrowLeft className="h-6 w-6" />
                Retour à la page d'accueil
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-start w-full h-full gap-4">
            <span className="text-2xl font-bold text-primary text-center w-full">
              {res?.data?.qrcode?.length} billets trouvés
            </span>

            <div className="flex flex-row items-center justify-center flex-wrap w-full gap-2">
              {res?.data?.qrcode?.map((qrcode: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col items-center border border-border p-4 rounded-md cursor-pointer"
                >
                  <img
                    src={qrcode.url}
                    className="h-40 w-40 object-contain"
                    alt="qrcode"
                  />

                  <span className="text-zinc-400 text-md">{qrcode.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
