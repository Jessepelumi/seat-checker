import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";

const sen = Sen({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "T&J - View Your Seat",
  description: "T&J - View Your Seat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sen.className} h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
