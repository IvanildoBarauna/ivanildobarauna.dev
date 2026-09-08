import {
  HiArrowDown,
  HiArrowUpRight,
  HiArrowRight,
  HiCircleStack,
  HiCodeBracket,
  HiCubeTransparent,
  HiMagnifyingGlass,
  HiPresentationChartLine,
  HiOutlineSun,
  HiServerStack,
  HiSignal,
} from "react-icons/hi2";
import { SiFastapi, SiGooglebigquery, SiPython } from "react-icons/si";

const dataSkills = [
  { icon: SiPython, title: "Python", detail: "Linguagem" },
  { icon: SiGooglebigquery, title: "SQL / BigQuery", detail: "Consultas" },
  { icon: HiCubeTransparent, title: "Apache Beam / Dataflow", detail: "Processamento" },
];

const softwareSkills = [
  { icon: SiFastapi, title: "APIs / FastAPI", detail: "Interface" },
  { icon: HiCubeTransparent, title: "Microsserviços", detail: "Arquitetura" },
  { icon: HiSignal, title: "Observabilidade", detail: "Visibilidade" },
];

const projects = [
  {
    title: "api-to-dataframe",
    description: "Converte respostas de APIs REST em DataFrames estruturados, com retry, validação de schema e inferência de tipos.",
    href: "https://github.com/ivanildobarauna-dev/api-to-dataframe",
    icon: HiCodeBracket,
  },
  {
    title: "currency-quote",
    description: "Solução em Python para extrair cotações com validação, testes, configuração flexível e arquitetura hexagonal.",
    href: "https://github.com/ivanildobarauna-dev/currency-quote",
    icon: HiPresentationChartLine,
  },
];

function SkillNode({ item, side }) {
  const Icon = item.icon;
  return (
    <div className={`skill-node skill-node--${side}`}>
      <div className="skill-copy">
        <strong>{item.title}</strong>
        <span>{item.detail}</span>
      </div>
      <div className="icon-shell"><Icon aria-hidden="true" /></div>
      <span className="connector-dot" aria-hidden="true" />
    </div>
  );
}

function Outcome({ icon: Icon, title, children }) {
  return (
    <div className="outcome">
      <div className="outcome-icon"><Icon aria-hidden="true" /></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Voltar ao início"><span />IB</a>
        <nav aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#projetos">Projetos</a>
          <a href="#experiencia">Experiência</a>
          <a href="#atlas">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
        <HiOutlineSun className="theme-icon" aria-label="Tema escuro" />
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Data &amp; Software Engineer</p>
          <h1>Ivanildo<br />Barauna</h1>
          <p className="hero-statement">Da origem do dado ao software<br />que entrega valor.</p>
          <a className="primary-cta" href="mailto:contato@ivanildobarauna.dev">Vamos conversar <HiArrowRight /></a>
          <p className="credibility">Experiência em<br /><strong>Mercado Livre</strong><i />C6 Bank<i />Embracon</p>
        </div>
        <div className="portrait-wrap">
          <img src="/assets/ivanildo-profile.png" alt="Retrato de Ivanildo Barauna" />
        </div>
      </section>

      <section className="atlas-section" id="atlas">
        <div className="section-heading centered">
          <p className="eyebrow"><span /> Systems Atlas</p>
          <h2>Arquitetura de ponta a ponta</h2>
          <p>A interseção entre Dados e Software orientada a impacto.</p>
        </div>

        <div className="atlas" aria-label="Mapa de competências conectando dados e software">
          <div className="skill-column data-column">
            {dataSkills.map((item) => <SkillNode key={item.title} item={item} side="data" />)}
          </div>
          <div className="venn" aria-hidden="true">
            <div className="venn-circle venn-data"><span>Dados</span></div>
            <div className="venn-circle venn-software"><span>Software</span></div>
            <div className="intersection">
              <HiServerStack />
              <span>Arquitetura<br />de ponta<br />a ponta</span>
            </div>
          </div>
          <div className="skill-column software-column">
            {softwareSkills.map((item) => <SkillNode key={item.title} item={item} side="software" />)}
          </div>
        </div>

        <div className="outcomes">
          <Outcome icon={HiMagnifyingGlass} title="Entender o problema">Contexto antes da tecnologia.</Outcome>
          <span className="outcome-arrow"><HiArrowRight /></span>
          <Outcome icon={HiCodeBracket} title="Construir a solução">Dados e software, juntos.</Outcome>
          <span className="outcome-arrow"><HiArrowRight /></span>
          <Outcome icon={HiPresentationChartLine} title="Gerar impacto">Tecnologia que entrega valor.</Outcome>
        </div>
      </section>

      <section className="featured" id="projetos">
        <div className="featured-copy">
          <p className="eyebrow"><span /> Projeto em destaque</p>
          <h2>data-pipeline-<br />async-ingest</h2>
          <p>Pipeline assíncrono para processamento de streaming com Pub/Sub, Dataflow, Apache Beam e Python.</p>
          <ul>
            <li>Ingestão assíncrona com Pub/Sub e Dataflow</li>
            <li>Transformações escaláveis com Apache Beam</li>
            <li>Código modular, testável e orientado à manutenção</li>
          </ul>
          <a className="outline-cta" href="https://github.com/ivanildobarauna-dev/data-pipeline-async-ingest" target="_blank" rel="noreferrer">Ver no GitHub <HiArrowUpRight /></a>
        </div>

        <div className="pipeline-panel" aria-label="Fluxo do projeto data pipeline async ingest">
          <div className="pipeline-labels"><span>Fontes</span><span>Processamento</span><span>Armazenamento</span></div>
          <div className="pipeline-flow">
            <div className="source-stack">
              <span><HiCodeBracket /> APIs</span>
              <span><HiCircleStack /> Arquivos</span>
              <span><HiSignal /> Eventos</span>
              <span><HiServerStack /> Sistemas</span>
            </div>
            <HiArrowRight className="flow-arrow" />
            <div className="flow-box active"><HiCubeTransparent /><strong>Apache Beam<br />/ Dataflow</strong><small>Processamento paralelo</small></div>
            <HiArrowRight className="flow-arrow" />
            <div className="flow-box"><SiGooglebigquery /><strong>BigQuery</strong><small>Armazenamento analítico</small></div>
          </div>
          <div className="observability"><HiSignal /> <strong>Observabilidade</strong><span>Logs</span><i /> <span>Métricas</span><i /> <span>Alertas</span></div>
        </div>
      </section>

      <section className="other-projects">
        <p className="eyebrow"><span /> Outros projetos</p>
        {projects.map(({ title, description, href, icon: Icon }) => (
          <a className="project-row" href={href} target="_blank" rel="noreferrer" key={title}>
            <div className="project-icon"><Icon /></div>
            <div><h3>{title}</h3><p>{description}</p></div>
            <span>Ver no GitHub <HiArrowUpRight /></span>
          </a>
        ))}
      </section>

      <section className="experience" id="experiencia">
        <div>
          <p className="eyebrow"><span /> Experiência</p>
          <h2>Uma trajetória entre<br />dados e software.</h2>
        </div>
        <div className="experience-list">
          <article><span>2023 — atual</span><h3>Mercado Livre</h3><p>Engenheiro de Dados Sênior</p></article>
          <article><span>2022 — 2023</span><h3>C6 Bank</h3><p>Business Intelligence &amp; Dados</p></article>
          <article><span>2018 — 2022</span><h3>Embracon</h3><p>Aplicações Digitais &amp; BI</p></article>
        </div>
      </section>

      <footer id="contato">
        <p>Tem um problema complexo?</p>
        <h2>Vamos conectar as peças.</h2>
        <a className="primary-cta" href="mailto:contato@ivanildobarauna.dev">Entre em contato <HiArrowUpRight /></a>
        <div className="footer-bottom"><span>© 2026 Ivanildo Barauna</span><a href="#inicio">Voltar ao topo <HiArrowDown /></a></div>
      </footer>
    </main>
  );
}
