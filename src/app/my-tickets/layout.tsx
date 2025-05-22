import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OnCity Soirée blanche - Mes billets",
  description: "Mes billets",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
