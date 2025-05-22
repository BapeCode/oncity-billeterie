"use client";

import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FormBooking from "./Form";
import Overview from "./Overview";
import { useState } from "react";

export default function Booking() {
  const [quantity, setQuantity] = useState(1);

  return (
    <Section className="h-full w-full">
      <div className="flex flex-col justify-start items-center gap-2 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center w-full">
          <Link href={"/"}>
            <Button
              variant={"ghost"}
              className="hover:translate-x-5 transition-transform duration-300 ease-in text-lg"
              size={"lg"}
            >
              <ArrowLeft className="h-6 w-6" />
              <span>Retour à l'acceuil</span>
            </Button>
          </Link>

          <span className="text-lg text-center md:text-right font-bold text-zinc-500">
            Réservation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center w-full gap-6">
          <FormBooking setQuantity={setQuantity} quantity={quantity} />
          <Overview quantity={quantity} />
        </div>
      </div>
    </Section>
  );
}
