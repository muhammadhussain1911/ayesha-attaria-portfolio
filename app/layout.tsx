import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Footer } from "@/components/layout/Footer";
import {
  PersonSchema,
  OrganizationSchema,
} from "@/components/seo/SchemaMarkup";
import { Providers } from "@/app/providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ayesha Attaria | Web App & API Penetration Tester | Ethical Hacker",
  description:
    "Ayesha Attaria is a certified Web Application & API Penetration Tester helping companies in the USA, UK, Europe, Australia & Canada secure their systems. OWASP Top 10 aligned VAPT services.",
  metadataBase: new URL("https://ayeshaattaria.site"),
  generator: "v0.app",
  openGraph: {
    title: "Ayesha Attaria | Web App & API Penetration Tester",
    description:
      "Certified ethical hacker and penetration tester helping global companies secure their web applications.",
    url: "https://ayeshaattaria.site",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/ayeshaattaria.jpeg",
        width: 1200,
        height: 630,
        alt: "Ayesha Attaria - Web App & API Penetration Tester",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayesha Attaria | Penetration Tester",
    description: "Web App & API security expert",
  },
  icons: {
    icon: [
      {
        url: "/ayeshaattaria.jpeg",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        url: "/ayeshaattaria.jpeg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} bg-off-white`}
    >
      <head>
        <PersonSchema />
        <OrganizationSchema />
      </head>
      <body className="font-sans antialiased text-black bg-off-white selection:bg-[#4ddcd3] selection:text-black">
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-off-white">{children}</main>
          <Footer />
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
