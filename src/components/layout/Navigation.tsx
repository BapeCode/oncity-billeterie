import Link from "next/link";
import { Button } from "../ui/button";
import ModalTickets from "./Modal";

export default function Navigation() {
  return (
    <header className="flex items-center justify-start border-b border-primary w-full shadow-md">
      <nav className="flex items-center justify-center md:justify-between gap-4 mx-auto max-w-7xl w-full">
        <Link
          href={"/"}
          className="flex items-center justify-center w-full md:w-auto gap-4"
        >
          <img
            src={"/logo-lyon-6.jpg"}
            alt="logo"
            className="h-30 object-cover w-auto"
          />
          <img src="/logo.png" alt="logo" className="h-15 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-4 px-6">
          <Link href={"/booking"}>
            <Button
              variant={"default"}
              className="cursor-pointer text-lg"
              size={"lg"}
            >
              Réserver ma place
            </Button>
          </Link>

          <ModalTickets/>
        </div>
      </nav>
    </header>
  );
}
