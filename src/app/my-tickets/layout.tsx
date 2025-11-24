import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OnCity Bal 1925 - Mes billets",
  description: "Mes billets",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
