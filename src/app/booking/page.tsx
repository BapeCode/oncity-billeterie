import Navigation from "@/components/layout/Navigation";
// import { GetCountTickets } from "../action.action";
import Footer from "@/components/layout/Footer";
import Booking from "./components/Booking";

export default async function Page() {
  return (
    <main className="flex flex-col items-center justify-start h-screen w-full">
      <Navigation />
      <Booking />
      <Footer />
    </main>
  );
}
