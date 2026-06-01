import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlas Aprova Premium",
  description:
    "Plataforma premium para concursos e ENEM com pacotes, trilhas de estudo, compra online e área do aluno."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
