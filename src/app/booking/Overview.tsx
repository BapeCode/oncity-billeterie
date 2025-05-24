import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Pin } from "lucide-react";

export default function Overview({ quantity }: { quantity: number }) {
  return (
    <div className="flex flex-col items-start justify-start border border-border p-6 rounded-lg shadow-sm h-full">
      <span className="text-primary font-bold text-2xl">
        Résumé de la commande
      </span>
      <span className="text-neutral-400 font-bold text-md">
        Soirée blanche avec Lyon 6ème & OnCity
      </span>

      <div className="flex flex-col items-start mt-5 w-full">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-zinc-600">Date</span>
        </div>
        <span className="ml-8 font-medium text-zinc-500 text-lg">
          17 Juin 2025
        </span>
      </div>

      <div className="flex flex-col items-start mt-5 w-full">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-zinc-600">Horaire</span>
        </div>
        <span className="ml-8 font-medium text-zinc-500 text-lg">
          19:30 - 01:00
        </span>
      </div>

      <div className="flex flex-col items-start mt-5 w-full">
        <div className="flex items-center gap-2">
          <Pin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-zinc-600">Lieu</span>
        </div>
        <span className="ml-8 font-medium text-zinc-500 text-lg">
          Café du pond, 11 Pl. Maréchal Lyautey, 69006 Lyon
        </span>
      </div>

      <Separator className="mt-5" />
      <div className="flex flex-col items-center w-full py-4 gap-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-zinc-400">Quantité</span>
          <span className="text-primary font-bold text-xl">{quantity}</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-zinc-400">Prix TTC</span>
          <span className="text-primary font-bold text-xl">
            {quantity * 45}€
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col items-center w-full py-4 gap-2">
        <span className="text-primary font-bold text-xl">
          En cas de problème
        </span>
        <span className="text-zinc-600 text-sm text-center">
          Veuillez nous contacter à l'adresse suivante : <br />
          <strong>hello@oncity.fr</strong> <br />
          ou par téléphone :<br />
          <strong>06.19.45.38.26</strong>
        </span>
      </div>
    </div>
  );
}
