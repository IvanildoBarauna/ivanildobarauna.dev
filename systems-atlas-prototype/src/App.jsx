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
import { useEffect, useState } from "react";
import { buildLanguageUrl, getLanguageFromUrl, supportedLanguages, translations } from "./i18n.js";

const projectDetails = [
  {
    title: "api-to-dataframe",
    href: "https://github.com/ivanildobarauna-dev/api-to-dataframe",
    icon: HiCodeBracket,
  },
  {
    title: "currency-quote",
    href: "https://github.com/ivanildobarauna-dev/currency-quote",
    icon: HiPresentationChartLine,
  },
];

/** Renders a skill and its icon in the systems map. */
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

/** Renders one outcome in the solution process. */
function Outcome({ icon: Icon, title, children }) {
  return (
    <div className="outcome">
      <div className="outcome-icon"><Icon aria-hidden="true" /></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

/** Renders the portfolio with URL-driven localization. */
export function App() {
  const [language, setLanguage] = useState(() => getLanguageFromUrl(window.location.href));
  const copy = translations[language];
  const dataSkills = [
    { icon: SiPython, title: "Python", detail: copy.skillDetails[0] },
    { icon: SiGooglebigquery, title: "SQL / BigQuery", detail: copy.skillDetails[1] },
    { icon: HiCubeTransparent, title: "Apache Beam / Dataflow", detail: copy.skillDetails[2] },
  ];
  const softwareSkills = [
    { icon: SiFastapi, title: copy.softwareSkills[0], detail: copy.skillDetails[3] },
    { icon: HiCubeTransparent, title: copy.softwareSkills[1], detail: copy.skillDetails[4] },
    { icon: HiSignal, title: copy.softwareSkills[2], detail: copy.skillDetails[5] },
  ];

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
    document.querySelector('meta[name="description"]').content = copy.metaDescription;
    if (new URL(window.location.href).searchParams.get("lang") !== language) {
      window.history.replaceState({}, "", buildLanguageUrl(window.location.href, language));
    }
  }, [copy, language]);

  useEffect(() => {
    /** Synchronizes the selected language when browser history changes. */
    const handlePopState = () => setLanguage(getLanguageFromUrl(window.location.href));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  /** Updates both application state and the language URL parameter. */
  const changeLanguage = (nextLanguage) => {
    window.history.pushState({}, "", buildLanguageUrl(window.location.href, nextLanguage));
    setLanguage(nextLanguage);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label={copy.brandLabel}><span />IB</a>
        <nav aria-label={copy.navigationLabel}>
          {["inicio", "projetos", "experiencia", "atlas", "contato"].map((anchor, index) => <a href={`#${anchor}`} key={anchor}>{copy.navigation[index]}</a>)}
        </nav>
        <div className="header-actions">
          <div className="language-selector" role="group" aria-label={copy.languageSelector}>
            {supportedLanguages.map((code) => <button type="button" className={code === language ? "active" : ""} aria-pressed={code === language} onClick={() => changeLanguage(code)} key={code}>{code.toUpperCase()}</button>)}
          </div>
          <HiOutlineSun className="theme-icon" aria-label={copy.themeLabel} />
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {copy.heroRole}</p>
          <h1>Ivanildo<br />Barauna</h1>
          <p className="hero-statement">{copy.heroStatement}</p>
          <a className="primary-cta" href="mailto:contato@ivanildobarauna.dev">{copy.talk} <HiArrowRight /></a>
          <p className="credibility">{copy.credibility}<br /><strong>Mercado Livre</strong><i />C6 Bank<i />Embracon</p>
        </div>
        <div className="portrait-wrap">
          <img src="/assets/ivanildo-profile.png" alt={copy.portraitAlt} />
        </div>
      </section>

      <section className="atlas-section" id="atlas">
        <div className="section-heading centered">
          <p className="eyebrow"><span /> Systems Atlas</p>
          <h2>{copy.atlasTitle}</h2>
          <p>{copy.atlasSubtitle}</p>
        </div>

        <div className="atlas" aria-label={copy.atlasLabel}>
          <div className="skill-column data-column">
            {dataSkills.map((item) => <SkillNode key={item.title} item={item} side="data" />)}
          </div>
          <div className="venn" aria-hidden="true">
            <div className="venn-circle venn-data"><span>{copy.data}</span></div>
            <div className="venn-circle venn-software"><span>{copy.software}</span></div>
            <div className="intersection">
              <HiServerStack />
              <span>{copy.architecture}</span>
            </div>
          </div>
          <div className="skill-column software-column">
            {softwareSkills.map((item) => <SkillNode key={item.title} item={item} side="software" />)}
          </div>
        </div>

        <div className="outcomes">
          <Outcome icon={HiMagnifyingGlass} title={copy.outcomes[0][0]}>{copy.outcomes[0][1]}</Outcome>
          <span className="outcome-arrow"><HiArrowRight /></span>
          <Outcome icon={HiCodeBracket} title={copy.outcomes[1][0]}>{copy.outcomes[1][1]}</Outcome>
          <span className="outcome-arrow"><HiArrowRight /></span>
          <Outcome icon={HiPresentationChartLine} title={copy.outcomes[2][0]}>{copy.outcomes[2][1]}</Outcome>
        </div>
      </section>

      <section className="featured" id="projetos">
        <div className="featured-copy">
          <p className="eyebrow"><span /> {copy.featured}</p>
          <h2>data-pipeline-<br />async-ingest</h2>
          <p>{copy.featuredDescription}</p>
          <ul>
            {copy.featuredBullets.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <a className="outline-cta" href="https://github.com/ivanildobarauna-dev/data-pipeline-async-ingest" target="_blank" rel="noreferrer">{copy.github} <HiArrowUpRight /></a>
        </div>

        <div className="pipeline-panel" aria-label={copy.pipelineLabel}>
          <div className="pipeline-labels">{copy.pipelineHeaders.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="pipeline-flow">
            <div className="source-stack">
              {[HiCodeBracket, HiCircleStack, HiSignal, HiServerStack].map((Icon, index) => <span key={copy.sources[index]}><Icon /> {copy.sources[index]}</span>)}
            </div>
            <HiArrowRight className="flow-arrow" />
            <div className="flow-box active"><HiCubeTransparent /><strong>Apache Beam<br />/ Dataflow</strong><small>{copy.parallel}</small></div>
            <HiArrowRight className="flow-arrow" />
            <div className="flow-box"><SiGooglebigquery /><strong>BigQuery</strong><small>{copy.analytical}</small></div>
          </div>
          <div className="observability"><HiSignal /> <strong>{copy.observability}</strong><span>{copy.signals[0]}</span><i /> <span>{copy.signals[1]}</span><i /> <span>{copy.signals[2]}</span></div>
        </div>
      </section>

      <section className="other-projects">
        <p className="eyebrow"><span /> {copy.otherProjects}</p>
        {projectDetails.map(({ title, href, icon: Icon }, index) => (
          <a className="project-row" href={href} target="_blank" rel="noreferrer" key={title}>
            <div className="project-icon"><Icon /></div>
            <div><h3>{title}</h3><p>{copy.projectDescriptions[index]}</p></div>
            <span>{copy.github} <HiArrowUpRight /></span>
          </a>
        ))}
      </section>

      <section className="experience" id="experiencia">
        <div>
          <p className="eyebrow"><span /> {copy.experience}</p>
          <h2>{copy.experienceTitle}</h2>
        </div>
        <div className="experience-list">
          <article><span>{copy.current}</span><h3>Mercado Livre</h3><p>{copy.roles[0]}</p></article>
          <article><span>2022 — 2023</span><h3>C6 Bank</h3><p>{copy.roles[1]}</p></article>
          <article><span>2018 — 2022</span><h3>Embracon</h3><p>{copy.roles[2]}</p></article>
        </div>
      </section>

      <footer id="contato">
        <p>{copy.footerQuestion}</p>
        <h2>{copy.footerTitle}</h2>
        <a className="primary-cta" href="mailto:contato@ivanildobarauna.dev">{copy.contact} <HiArrowUpRight /></a>
        <div className="footer-bottom"><span>© 2026 Ivanildo Barauna</span><a href="#inicio">{copy.backTop} <HiArrowDown /></a></div>
      </footer>
    </main>
  );
}
