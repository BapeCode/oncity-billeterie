import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Heros() {
  return (
    <Section className="flex flex-col items-center justify-center text-center w-full py-20 md:py-32">
      <div className="flex flex-col items-center justify-center text-center py-20 md:py-32 max-w-7xl mx-auto">
        <span className="text-4xl md:text-5xl font-bold text-primary">
          Le BAL 1925
        </span>
        <p className="text-zinc-400 text-2xl">
          Une soirée{" "}
          <a
            href="https://www.instagram.com/lyon6eme/"
            className="text-secondary cursor-pointer"
            target="_blank"
          >
            Lyon6ème
          </a>{" "}
          &{" "}
          <a
            href="https://www.instagram.com/oncity.fr/"
            className="text-secondary cursor-pointer"
            target="_blank"
          >
            OnCity
          </a>
          . Une parenthèse hors du temps où l&apos;esprit des Années folles
          retrouve toute sa magie.
        </p>

        <div className="flex flex-row items-center gap-4 p-4">
          <span className="text-4xl font-bold text-secondary">17</span>
          <span className="text-4xl font-bold text-secondary">Décembre</span>
          <span className="text-4xl font-bold text-secondary">2025</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link href={"/booking"}>
            <Button size={"lg"} className="text-lg" variant={"default"}>
              Réserver ma place
            </Button>
          </Link>
          <div className="block md:hidden">{/*<ModalTickets />*/}</div>
          <Button size={"lg"} className="text-lg" variant={"outline"}>
            En savoir plus
          </Button>
        </div>
      </div>
    </Section>
  );
}
