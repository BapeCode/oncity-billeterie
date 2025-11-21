import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Informations() {
  return (
    <Section className="bg-secondary w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-7xl mx-auto p-5 md:p-16">
        <div className="relative flex flex-col justify-start items-start gap-2 h-full">
          <span className="text-primary font-bold text-left text-2xl md:text-3xl">
            Informations sur la soirée
          </span>
          <p className="text-md md:text-xl text-white text-left">
            Plongez dans l&apos;atmosphère envoûtante des années folles lors
            d’une soirée exceptionnelle où élégance, mystère et fête se mêlent
            jusqu&apos;au bout de la nuit. Dès votre arrivée, vous serez
            transporté dans un décor inspiré des bars clandestins de la
            Prohibition américaine : lumières tamisées, ambiance feutrée et
            esprit speakeasy garanti.
            <br /> La soirée débutera au son du jazz, dans une atmosphère
            immersive rappelant les clubs mythiques des années 1920. Puis,
            progressivement, le rythme s’accélère : le DJ prendra le relais pour
            faire vibrer la piste et transformer le bal en véritable nuit
            festive jusqu’à 2h du matin. Pour rester dans l’esprit, chacun est
            invité à adopter une tenue inspirée des Années folles : robes à
            franges, plumes, perles, gants, bretelles, nœuds papillon et allure
            Gatsby. <br />
            Et, comme dans tout rendez-vous clandestin, le masque sera
            obligatoire, ajoutant une touche de mystère à cette soirée hors du
            temps. Une expérience immersive qui se ponctuera d&apos;un concours
            d&apos;élégance, avec de très beaux lots à gagner.
          </p>

          <ul className="text-white flex flex-col items-start gap-2 w-full text-md md:text-lg md:mt-5">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>
                Date : <strong>Mercredi 17 décembre 2025</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>
                Horaire : <strong>De 21h00 à 02h00 du matin</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>
                Lieu :{" "}
                <strong>
                  <Link
                    href={
                      "https://www.google.com/maps/search/Gare+des+Brotteaux,+Members,+13+ter+Place+Jules+Ferry,+69006+Lyon+/@45.7675585,4.8569196,18z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D"
                    }
                    className="underline cursor-pointer"
                  >
                    Gare des Brotteaux, Members, 13 ter Place Jules Ferry, 69006
                    Lyon
                  </Link>
                </strong>
              </span>
            </li>
          </ul>

          <Link href={"/booking"} className=" w-full">
            <Button
              size={"lg"}
              className="text-lg w-full md:w-auto mt-5"
              variant={"default"}
            >
              Réserver maintenant
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-10 bg-white/5 p-6 rounded-lg border border-white/10 w-full">
            <div className="w-full flex flex-col gap-2">
              <span className="text-2xl text-left md:text-3xl font-bold text-primary">
                Ce que comprend la réservation
              </span>

              <ul className="text-white flex flex-col items-start gap-2 w-full text-lg">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>
                    Un cocktail offert (alcoolisé ou non)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Participation aux concours d&apos;élégance.</span>
                </li>
              </ul>
            </div>

            <div className="w-full flex flex-col gap-2">
              <span className="text-2xl md:text-3xl font-bold text-primary">
                Informations importantes
              </span>

              <ul className="text-white flex flex-col items-start gap-2 w-full text-lg">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>
                    Tenue dans le thème 1925 (Années folles) obligatoire
                  </span>
                </li>
                 <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Le masque sera fourni à l'entrée de l'événement</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Accès uniquement sur réservation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Animaux non admis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Mineurs non admis</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between bg-white/5 p-3 md:p-6 w-full rounded-md">
              <span className="text-white font-semibold text-md md:text-lg">
                Prix par personne
              </span>
              <span className="text-primary font-bold text-xl md:text-2xl">
                29€ TTC
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
