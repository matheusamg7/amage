import type { Metadata } from "next";
import { Geist, Geist_Mono, Hubot_Sans, Inter, Figtree, Outfit } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import { PageTransitionProvider } from "@/contexts/PageTransitionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hubotSans = Hubot_Sans({
  variable: "--font-hubot-sans",
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMAGE - Agência Web",
  description: "Transformamos ideias em experiências digitais memoráveis",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hubotSans.variable} ${inter.variable} ${figtree.variable} ${outfit.variable} antialiased`}
      >
        <PageTransitionProvider>
          <LenisScroll>
            <Header />
            {children}
          </LenisScroll>
          
          {/* Logo com animação de fuga ao scrollar */}
          <Logo />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
