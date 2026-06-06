import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BENTHEC",
  description:
    "Plataforma premium para concursos e ENEM com trilhas de estudo, acompanhamento e área do aluno."
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

