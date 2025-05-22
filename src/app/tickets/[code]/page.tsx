import Section from "@/components/layout/Section";
import Navigation from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Page({ params }: { params: { code: string } }) {
  const { code } = params;

  return (
    <main className="flex flex-col items-center justify-start h-screen w-full">
      <Navigation />
      <Section className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-start w-full h-full gap-4">
          <CheckCircle className="h-15 w-15 text-green-500" />
          <h1 className="text-3xl font-bold text-black">Ticket valide</h1>
          <p className="text-lg font-medium text-zinc-500">
            Code du billet : {code}
          </p>
          <div className="flex flex-col items-center justify-start p-6 border-border border rounded-md mt-5 gap-4 w-full max-w-md">
            <div className="flex flex-col items-center w-full gap-2">
              <span className="text-lg font-bold">Détails du billet</span>
              <span className="text-md font-medium text-zinc-500 text-center">
                Ce billet est valide pour la soirée OnCity & Lyon 6ème
              </span>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
