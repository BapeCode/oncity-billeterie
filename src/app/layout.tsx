import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Lyon6ème & OnCity - Billeterie Officielle",
  description:
    "Billeterie officielle de Lyon6ème & OnCity, pour des événements organisé sur Lyon et sa périphérie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
