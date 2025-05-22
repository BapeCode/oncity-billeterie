import Link from "next/link";
import { Button } from "../ui/button";

export default function Navigation() {
  return (
    <header className="flex items-center justify-start border-b border-primary w-full shadow-md">
      <nav className="flex items-center justify-center md:justify-between gap-4 mx-auto max-w-7xl w-full">
        <Link
          href={"/"}
          className="flex items-center justify-center w-full md:w-auto gap-4"
        >
          <img src="/logo.png" alt="logo" className="h-20 w-auto" />
          <img src={"/logo-lyon-6.png"} alt="logo" className="h-30 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href={"/booking"}>
            <Button
              variant={"default"}
              className="cursor-pointer text-lg"
              size={"lg"}
            >
              Réserver ma place
            </Button>
          </Link>

          <Link href={"/my-tickets"}>
            <Button
              variant={"outline"}
              className="cursor-pointer text-lg"
              size={"lg"}
            >
              Mes billets
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
