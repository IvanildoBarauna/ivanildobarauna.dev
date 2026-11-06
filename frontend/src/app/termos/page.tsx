import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos de uso',
  description: 'Condições de uso do portfólio de Ivanildo Barauna.',
};

export default function TermsPage() {
  return (
    <main className="site-info-page">
      <article className="site-info-card">
        <p className="site-info-eyebrow">Informações do site</p>
        <h1>Termos de uso</h1>
        <p>Este site apresenta a trajetória profissional, projetos e meios de contato de Ivanildo Barauna. O conteúdo é informativo e pode ser atualizado.</p>
        <h2>Links externos</h2>
        <p>Repositórios, perfis e certificados externos são operados por seus respectivos responsáveis. Consulte as condições desses serviços antes de utilizá-los.</p>
        <h2>Contato</h2>
        <p>Para dúvidas sobre o conteúdo, escreva para <a href="mailto:contato@ivanildobarauna.dev">contato@ivanildobarauna.dev</a>.</p>
        <Link className="site-info-action" href="/">Voltar ao portfólio</Link>
      </article>
    </main>
  );
}
