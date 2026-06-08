import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BenThec | Trilha guiada para concursos, PMES, ENEM e redacao",
  description:
    "Plataforma educacional com trilhas guiadas, biblioteca, questoes, simulados e correcao humana especializada BenThec.",
  openGraph: {
    title: "BenThec",
    description: "Continue daqui. Assista, leia e pratique com trilha guiada, simulados e correcao humana.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
