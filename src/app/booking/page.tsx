import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import Booking from "./Booking";
import { GetCountTickets } from "../action.action";

export default async function Page() {
  const ticketsCounts = await GetCountTickets();

  return (
    <main className="flex flex-col items-center justify-start h-screen w-full">
      <Navigation />
      <Booking />
      <Footer />
    </main>
  );
}
