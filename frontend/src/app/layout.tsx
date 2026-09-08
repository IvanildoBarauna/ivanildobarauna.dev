import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export const metadata: Metadata = {
  title: {
    default: 'Ivanildo Barauna - Senior Software Engineer',
    template: '%s | Ivanildo Barauna'
  },
  description: 'Portfólio de Ivanildo Barauna, Senior Software Engineer no Mercado Livre, com atuação em software, dados, arquitetura e sistemas de decisão.',
  openGraph: {
    title: 'Ivanildo Barauna - Senior Software Engineer',
    description: 'Software Engineering, Data Engineering e arquitetura para transformar problemas de negócio em sistemas de decisão prontos para produção.',
    url: 'https://ivanildobarauna.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <LanguageProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <div className="flex flex-col">
              {children}
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
