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
    icon: [
      { url: "/favicon-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
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
        alt: "Joaquín Gañán - Senior QA Engineer",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#111511" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem("portfolio-theme");var dark=saved==="dark"||(saved!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",dark);document.documentElement.style.colorScheme=dark?"dark":"light"}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
