"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function FormBooking({
  attendees,
  quantity,
}: {
  attendees: { firstName: string; lastName: string; }[];
  quantity: number;
}) {
  const validateAttendees = () => {
    return attendees.every(
      (attendee) =>
        attendee.firstName.trim() !== "" &&
        attendee.lastName.trim() !== ""
    );
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const email = formData.get("email");
    const phone = formData.get("phone");

    if (!firstName || !lastName || !email || !phone) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (quantity > 1 && !validateAttendees()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const res = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        quantity,
        attendees,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else toast.error("Erreur lors du paiement");
    } else {
      toast.error("Erreur lors de la réservation. Plus de places disponibles");
    }
  };

  return (
    <form onSubmit={HandleSubmit} className="flex flex-col w-full gap-4" suppressHydrationWarning>
      <div className="flex flex-row items-center gap-4 w-full">
        <div className="flex flex-col items-start flex-1 gap-2">
          <Label htmlFor="lastname" className="text-lg">
            Nom de famille
          </Label>
          <Input
            type="text"
            placeholder="Nom"
            className="w-full"
            name="lastname"
            id="lastname"
          />
        </div>

        <div className="flex flex-col items-start flex-1 gap-2">
          <Label htmlFor="firstname" className="text-lg">
            Prénom
          </Label>
          <Input
            type="text"
            placeholder="Prénom"
            className="w-full"
            name="firstname"
            id="firstname"
          />
        </div>
      </div>
      <div className="flex flex-col items-start flex-1 gap-2">
        <Label htmlFor="email" className="text-lg">
          Email
        </Label>
        <Input
          type="text"
          placeholder="Email"
          className="w-full"
          name="email"
          autoComplete="off"
          id="email"
        />
      </div>
      <div className="flex flex-col items-start flex-1 gap-2">
        <Label htmlFor="phone" className="text-lg">
          Téléphone
        </Label>
        <Input
          type="tel"
          placeholder="06 XX XX XX XX"
          className="w-full"
          maxLength={10}
          name="phone"
          autoComplete="off"
          id="phone"
        />
      </div>
      <Button size={"lg"} className="w-full" type="submit">
        Confirmer pour réserver ma place
      </Button>
    </form>
  );
}
