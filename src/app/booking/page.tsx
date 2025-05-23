import Navigation from "@/components/layout/Navigation";
import Booking from "./Booking";
import { GetCountTickets } from "../action.action";
import Footer from "@/components/layout/Footer";

export default async function Page() {
  return (
    <main className="flex flex-col items-center justify-start h-screen w-full">
      <Navigation />
      <Booking />
      <Footer />
    </main>
  );
}
