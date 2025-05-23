import Section from "@/components/layout/Section";
import Navigation from "@/components/layout/Navigation";
import { CheckCircle, X } from "lucide-react";
import { GetCodeQR } from "@/app/action.action";
import ButtonValidate from "./buttonValidate";

export default async function Page({ params }: { params: { code: string } }) {
  const { code } = await params;
  const codeQR = await GetCodeQR({ code });

  return (
    <main className="flex flex-col items-center justify-start overflow-y-hidden w-full">
      <Navigation />
      <Section className="flex items-center justify-center h-full p-4">
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          {codeQR?.data?.error ? (
            <X className="h-15 w-15 text-red-500" />
          ) : (
            <CheckCircle className="h-15 w-15 text-green-500" />
          )}
          <h1 className="text-3xl font-bold text-black">Ticket valide</h1>

          <div className="flex flex-col items-center gap-1 w-full">
            <p className="text-lg font-medium text-zinc-600">
              Code du billet :
            </p>
            <p className="text-md font-medium text-zinc-500">{code}</p>
          </div>

          {!codeQR?.data?.error ? (
            <div className="flex flex-col items-center gap-1 w-full">
              <p className="text-lg font-medium text-zinc-600">
                Nom et Prénom du billet :
              </p>
              <p className="text-md font-medium text-zinc-500">
                {codeQR?.data?.data?.lastName +
                  " " +
                  codeQR?.data?.data?.firstName}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 w-full">
              <p className="text-lg font-medium text-zinc-600">Message</p>
              <p className="text-md font-medium text-zinc-500">
                {codeQR?.data?.error}
              </p>
            </div>
          )}

          <div className="flex flex-col items-center justify-start p-6 border-border border rounded-md mt-5 gap-4 w-full max-w-md">
            <div className="flex flex-col items-center w-full gap-2">
              <span className="text-lg font-bold">Détails du billet</span>
              <span className="text-md font-medium text-zinc-500 text-center">
                Ce billet est valide pour la soirée OnCity & Lyon 6ème. Une fois
                le billet valider il ne peut plus être utilisé.
              </span>
            </div>
          </div>

          {!codeQR?.data?.error && (
            <ButtonValidate
              ticketCode={codeQR?.data?.data?.ticket?.code ?? ""}
            />
          )}
        </div>
      </Section>
    </main>
  );
}
