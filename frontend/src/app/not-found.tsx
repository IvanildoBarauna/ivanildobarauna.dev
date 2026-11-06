import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="site-info-page">
      <div className="site-info-card">
        <p className="site-info-eyebrow">Erro 404</p>
        <h1>Página não encontrada</h1>
        <p>O endereço pode ter mudado ou não existe. Volte ao portfólio para continuar navegando.</p>
        <Link className="site-info-action" href="/">Voltar ao início</Link>
      </div>
    </main>
  );
}
