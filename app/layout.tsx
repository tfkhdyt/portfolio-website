import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/jetbrains-mono";

export const metadata: Metadata = {
  title: "Taufik Hidayat - Full Stack Developer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
