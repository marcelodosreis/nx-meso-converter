import { Fredoka, Noto_Sans_KR, Nunito } from "next/font/google";
import type { ReactNode } from "react";

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

type RootDocumentProps = Readonly<{
  lang: string;
  children: ReactNode;
}>;

export function RootDocument({ lang, children }: RootDocumentProps) {
  return (
    <html lang={lang}>
      <body
        className={`${fredoka.variable} ${nunito.variable} ${notoSansKorean.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
