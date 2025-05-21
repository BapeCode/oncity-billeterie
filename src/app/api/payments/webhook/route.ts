import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("payplug-signature");

  // Vérification de la signature non disponible sans SDK, il faut l'implémenter manuellement ou la valider par IP ou jeton
  const payload = JSON.parse(rawBody);

  if (payload.object === "payment" && payload.is_paid) {
    console.log("✅ Paiement validé pour :", payload.customer.email);
    // TODO: mettre à jour la BDD, envoyer un mail, etc.
  }

  return new NextResponse("OK");
}
