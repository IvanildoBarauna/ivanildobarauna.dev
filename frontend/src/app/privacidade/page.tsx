import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacidade',
  description: 'Informações sobre privacidade e contato no portfólio de Ivanildo Barauna.',
};

export default function PrivacyPage() {
  return (
    <main className="site-info-page">
      <article className="site-info-card">
        <p className="site-info-eyebrow">Informações do site</p>
        <h1>Privacidade</h1>
        <p>Este portfólio não possui formulário de cadastro nem ferramenta de análise de visitantes configurada no aplicativo.</p>
        <h2>Contato</h2>
        <p>Se você entrar em contato por e-mail, os dados que enviar serão usados para responder à sua mensagem. Envie apenas as informações necessárias.</p>
        <h2>Hospedagem e links externos</h2>
        <p>O site é hospedado na Cloudflare, que pode processar dados técnicos de acesso, como endereço IP, para entregar e proteger as páginas. Links para outros sites seguem as políticas de privacidade dos respectivos serviços.</p>
        <h2>Dúvidas</h2>
        <p>Escreva para <a href="mailto:contato@ivanildobarauna.dev">contato@ivanildobarauna.dev</a>.</p>
        <Link className="site-info-action" href="/">Voltar ao portfólio</Link>
      </article>
    </main>
  );
}
