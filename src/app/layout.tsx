import type { Metadata } from "next";
import { Geist, Geist_Mono, Hubot_Sans, Inter } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import Header from "@/components/Header";
import Logo from "@/components/Logo";

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
        className={`${geistSans.variable} ${geistMono.variable} ${hubotSans.variable} ${inter.variable} antialiased`}
      >
        <LenisScroll>
          <Header />
          {children}
        </LenisScroll>
        
        {/* Logo com animação de fuga ao scrollar */}
        <Logo />
      </body>
    </html>
  );
}
