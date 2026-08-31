import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joaquín Gañán | Senior QA Engineer",
  description:
    "Senior QA Engineer specializing in manual testing, REST APIs, backend validation, integrated systems, and Playwright automation.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
