import type { Metadata, Viewport } from "next";
import { Fredoka, Noto_Sans_KR, Nunito } from "next/font/google";
import type { ReactNode } from "react";
import { APP_DESCRIPTION, APP_NAME } from "@/config/app.constants";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const notoSansKorean = Noto_Sans_KR({
  subsets: ["latin"],
  preload: false,
  variable: "--font-noto-korean",
  display: "swap",
  fallback: ["Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#c8edff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fredoka.variable} ${nunito.variable} ${notoSansKorean.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
