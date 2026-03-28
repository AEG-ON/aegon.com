import type { Metadata } from "next";
import "./app.css";

export const metadata: Metadata = {
  title: "AEGON | Estratégia de Transformação Digital",
  description: "Arquitetura de Experiência Imersiva, Interatividade Espacial e Narrativa de Marca para 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="dark" suppressHydrationWarning>
      <body
        className="bg-transparent text-black dark:text-white font-sans selection:bg-aegon-blue selection:text-white cursor-none transition-colors duration-500"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
