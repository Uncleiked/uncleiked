import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Scene from "@/components/three/Scene";
import { Providers } from "@/components/Providers";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ExperienceProgress from "@/components/ui/ExperienceProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Amechi Ikediashi | Creative Developer Portfolio",
  description: "Lead Creative Developer specializing in Next.js, React, GSAP, and Three.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30`}>
        <Providers>
          <ExperienceProgress />
          <ThemeToggle />
          <Scene>
            {children}
          </Scene>
        </Providers>
      </body>
    </html>
  );
}
