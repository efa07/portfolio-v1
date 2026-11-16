import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://efatariku.dev"),
  title: {
    default: "Efa Tariku — Software Engineer & Full-Stack Developer",
    template: "%s | Efa Tariku",
  },
  description:
    "Personal developer portfolio of Efa Tariku, a software engineer focused on building scalable applications, distributed systems, and intelligent digital products.",
  keywords: [
    "Efa Tariku",
    "Software Engineer",
    "Full-Stack Developer",
    "Distributed Systems",
    "Spring Boot",
    "Next.js",
    "React",
    "Java",
    "TypeScript",
    "PostgreSQL",
    "RabbitMQ",
    "OneCitizen",
    "Canaan Pharmacy",
    "Iddir System",
    "INSA",
    "Ethiopia Developer",
  ],
  authors: [{ name: "Efa Tariku", url: "https://github.com/efa07" }],
  creator: "Efa Tariku",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://efatariku.dev",
    title: "Efa Tariku — Software Engineer & Full-Stack Developer",
    description:
      "Software engineer focused on scalable applications, backend architectures, distributed systems, and AI-powered applications.",
    siteName: "Efa Tariku Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Efa Tariku — Software Engineer & Full-Stack Developer",
    description:
      "Software engineer focused on scalable enterprise systems, modern web engineering, and intelligent products.",
    creator: "@efa_tariku",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased selection:bg-[#d4f932] selection:text-black`}
    >
      <body className="min-h-full flex flex-col bg-[#070709] text-zinc-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
