import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OnCity Soirée Blanche Reservation",
  description: "Soirée blanche - 17 Juin 2025",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
