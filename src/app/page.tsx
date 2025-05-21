import Navigation from "@/components/layout/Navigation";
import Heros from "./Heros";
import Informations from "./Informations";
import Footer from "@/components/layout/Footer";

export default function Home() {
  // const [email, setEmail] = useState("");
  // const [amount, setAmount] = useState(10);

  // const handlePay = async () => {
  //   const res = await fetch("/api/payments", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, amount }),
  //   });

  //   const data = await res.json();
  //   if (data.url) window.location.href = data.url;
  //   else alert("Erreur lors du paiement");
  // };

  return (
    <main className="flex flex-col items-center justify-start h-screen w-full">
      <Navigation />
      <Heros />
      <Informations />
      <Footer />
    </main>
    // <main className="flex flex-col items-center justify-center min-h-screen gap-4">
    //   <h1 className="text-2xl font-bold">Payer avec PayPlug</h1>
    //   <input
    //     type="email"
    //     placeholder="Votre email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     className="border px-4 py-2"
    //   />
    //   <input
    //     type="number"
    //     value={amount}
    //     onChange={(e) => setAmount(Number(e.target.value))}
    //     className="border px-4 py-2"
    //   />
    //   <button
    //     onClick={handlePay}
    //     className="bg-blue-600 text-white px-4 py-2 rounded"
    //   >
    //     Payer {amount} €
    //   </button>
    // </main>
  );
}
