import Navigation from "@/components/layout/Navigation";
import Heros from "./Heros";
import Informations from "./Informations";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start h-screen w-full">
      <Navigation />
      <Heros />
      <Informations />
      <Footer />
    </main>
  );
}
