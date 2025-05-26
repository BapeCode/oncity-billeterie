import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full p-4 bg-secondary">
      <span className="text-white text-md">© 2025 Lyon 6ème & OnCity</span>

      <Link href={"/cguv"} className="text-white text-sm underline text-center">
        Conditions Général d'utilisation et de vente (CGUV)
      </Link>
    </footer>
  );
}
