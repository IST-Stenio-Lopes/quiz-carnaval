import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Carnavalense",
  description: "Quiz de carnaval para museu SENAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${nunito.className} antialiased portrait`}>
        {children}
        <Image
          src="/parceria.svg"
          alt="Parcerias"
          width={500}
          height={500}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-50 -z-0"
        />
      </body>
    </html>
  );
}
