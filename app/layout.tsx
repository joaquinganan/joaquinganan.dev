import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Joaquín Gañán | Senior QA Engineer";
const description =
  "Senior QA Engineer specializing in quality strategy, REST APIs, backend validation, integrated systems, and Playwright automation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://joaquinganan.dev"),
  title,
  description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://joaquinganan.dev",
    siteName: "Joaquín Gañán",
    title,
    description,
    images: [
      {
        url: "/og-portfolio.png",
        width: 1200,
        height: 630,
        alt: "Joaquín Gañán — Senior QA Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-portfolio.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5d5",
  colorScheme: "light",
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
