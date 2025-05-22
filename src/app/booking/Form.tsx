"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
}

export default function FormBooking({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [phone, setPhone] = useState("");
  const [attendeSelect, setAttendeeSelect] = useState<string>("1");
  const [attendees, setAttendees] = useState<Attendee[]>([
    { firstName: "", lastName: "", email: "" },
  ]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    const limiteNumbers = numbers.slice(0, 10);
    const formatted = limiteNumbers.replace(/(\d{2})(?=\d)/g, "$1 ");

    return formatted;
  };

  const HandlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formtedPhone = formatPhone(e.target.value);
    setPhone(formtedPhone);
  };

  const HandleAddQuantity = () => {
    setQuantity(quantity + 1 > 5 ? 5 : quantity + 1);
  };

  const HandleRemoveQuantity = () => {
    console.log({ attendees });
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };

  const handleAttendeeChange = (
    index: number,
    field: keyof Attendee,
    value: string
  ) => {
    const newAttendees = [...attendees];
    newAttendees[index] = { ...newAttendees[index], [field]: value };
    setAttendees(newAttendees);
  };

  useEffect(() => {
    if (quantity > attendees.length) {
      const newAttendees = [...attendees];
      for (let i = attendees.length; i < quantity; i++) {
        newAttendees.push({ firstName: "", lastName: "", email: "" });
      }
      setAttendees(newAttendees);
    } else if (quantity < attendees.length) {
      setAttendees(attendees.slice(0, quantity));
    }
  }, [quantity]);

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full h-full">
      <div className="flex flex-col gap-2 items-start w-full">
        <span className="text-2xl text-primary font-bold">
          Selection des places
        </span>
        <div className="flex flex-row items-center justify-between w-full p-4 rounded-lg border border-border">
          <div className="flex flex-col items-start gap-2">
            <span className="text-lg text-zinc-600 font-bold">
              Place standard
            </span>
            <span className="text-sm text-zinc-500">45€ TTC / personne</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={HandleRemoveQuantity}
              className="p-3 border-border border rounded-md"
            >
              <MinusIcon className="h-6 w-6 text-zinc-500" />
            </button>
            <span className="text-lg font-bold">{quantity}</span>
            <button
              onClick={HandleAddQuantity}
              className="p-3 border-border border rounded-md"
            >
              <PlusIcon className="h-6 w-6 text-zinc-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <span className="text-2xl text-primary font-bold">
          Réservation de votre place
        </span>
        <span className="text-md text-black">
          Veuillez remplir le formulaire ci-dessous pour réserver votre place.
        </span>
      </div>
      <form className="flex flex-col w-full gap-4">
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
            value={phone}
            onChange={HandlePhoneChange}
            maxLength={14}
            name="email"
            autoComplete="off"
            id="phone"
          />
        </div>
      </form>

      {quantity > 1 && (
        <div className="flex flex-col items-center w-full py-4 gap-4">
          <div className="flex flex-col w-full">
            <span className="text-2xl text-primary font-bold">
              Informations complémentaires
            </span>
            <span className="text-md text-black">
              Veuillez remplir le formulaire ci-dessous pour attribué la place.
            </span>
          </div>

          <Separator />

          <Tabs
            value={attendeSelect}
            onValueChange={setAttendeeSelect}
            className="w-full"
          >
            <TabsList className="mb-4 flex flex-wrap w-full">
              {Array.from({ length: quantity }, (_, i) => (
                <TabsTrigger key={i} value={(i + 1).toString()}>
                  Participant {i + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {attendees.map((item, index) => {
              return (
                <TabsContent
                  key={index}
                  value={(index + 1).toString()}
                  className="space-y-4"
                >
                  <div className="flex flex-row items-center gap-4 w-full">
                    <div className="flex flex-col items-start flex-1 gap-2">
                      <Label htmlFor={"lastname-" + index} className="text-lg">
                        Nom de famille
                      </Label>
                      <Input
                        id={"lastname-" + index}
                        value={item.lastName}
                        onChange={(e) =>
                          handleAttendeeChange(
                            index,
                            "lastName",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    <div className="flex flex-col items-start flex-1 gap-2">
                      <Label htmlFor={"firstname-" + index} className="text-lg">
                        Prénom
                      </Label>
                      <Input
                        id={"firstname-" + index}
                        value={item.firstName}
                        onChange={(e) =>
                          handleAttendeeChange(
                            index,
                            "firstName",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start flex-1 gap-2">
                    <Label htmlFor={"email-" + index} className="text-lg">
                      Email
                    </Label>
                    <Input
                      id={"email-" + index}
                      value={item.email}
                      onChange={(e) =>
                        handleAttendeeChange(index, "email", e.target.value)
                      }
                      required
                    />
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      )}
      <Button size={"lg"} className="w-full">
        Confirmée pour réserver ma place
      </Button>
      <Separator />
    </div>
  );
}
