import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased selection:bg-accent selection:text-accent-fg`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        {/* Applies the stored theme before first paint so there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("theme")==="light"){document.documentElement.dataset.theme="light";document.documentElement.style.colorScheme="light";}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
