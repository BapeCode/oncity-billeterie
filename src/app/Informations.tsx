import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Informations() {
  return (
    <Section className="bg-secondary w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto p-5 md:p-16">
        <div className="relative flex flex-col justify-start items-start gap-2 h-full">
          <span className="text-primary font-bold text-left text-2xl md:text-3xl">
            Informations sur la soirée
          </span>
          <p className="text-md md:text-xl text-white text-left">
            Lyon 6ème vous donne rendez-vous le 17 juin 2025 pour un événement
            hors du temps : la Soirée en blanc au Café du Pond. Une nuit pensée
            comme un écrin, où chaque détail compte, et où le raffinement
            devient la seule règle. Un concours de pétanque et un concours
            d'élégance seront organisés, avec de très beaux lots à la clé !
          </p>

          <ul className="text-white flex flex-col items-start gap-2 w-full text-md md:text-lg md:mt-5">
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>
                Date : <strong>17 juin 2025</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>
                Horaire : <strong>de 19:30 à 01:00</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>
                Lieu :{" "}
                <strong>
                  <Link
                    href={
                      "https://www.google.com/maps/place/Caf%C3%A9+Du+Pond/@45.7682479,4.8427085,17z/data=!3m1!4b1!4m6!3m5!1s0x47f4eaf0d2b69f33:0x9497e733dc6e3076!8m2!3d45.7682479!4d4.8427085!16s%2Fg%2F1tfj2j17?entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D"
                    }
                    className="underline cursor-pointer"
                  >
                    Café du Pond, 11 Pl. Maréchal Lyautey, 69006 Lyon
                  </Link>
                </strong>
              </span>
            </li>
          </ul>

          <Link href={"/booking"} className="md:absolute md:bottom-0 w-full">
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
                    Une boisson de votre choix (verre de vin, bière, soft)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Buffet dinatoire</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Participation aux concours de pétanque et élégance.</span>
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
                  <span>Tenue blanche exigée</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Chaussures colorées acceptées</span>
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
                45€ TTC
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
