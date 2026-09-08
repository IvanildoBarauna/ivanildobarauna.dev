'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import {
  FaArrowUp,
  FaArrowDown,
  FaChartBar,
  FaCloud,
  FaCloudUploadAlt,
  FaCode,
  FaCogs,
  FaDatabase,
  FaExternalLinkAlt,
  FaGithub,
  FaMapMarkerAlt,
  FaRocket,
  FaWarehouse,
} from 'react-icons/fa';
import { SiApacheairflow, SiGooglebigquery } from 'react-icons/si';
import type { Experience } from '@/app/experience/interfaces';
import type { Project } from '@/app/projects/interfaces';
import type { Certification, Formation } from '@/app/education/interfaces';
import type { SocialLink } from '@/app/social-links/interfaces';
import { socialIconMap } from '@/utils/socialIconMap';
import CvDownloadButton from '@/components/CvDownloadButton';
import { getCentredEntryProgress, getStepIndex, getStickyTrackProgress } from '@/utils/scrollMotion';

type Props = {
  experiences: Record<string, Experience[]>;
  projects: Project[];
  formations: Formation[];
  certifications: Record<string, Certification[]>;
  socialLinks: SocialLink[];
};

const compactTitle = (title: string) => title.split('/').pop() ?? title;
const descriptionText = (description: string | string[]) =>
  Array.isArray(description) ? description.join(' ') : description;

type CodeSegment = { text: string; className?: string };

function TypingSnippet({ segments, className = 'project-code', label }: { segments: CodeSegment[]; className?: string; label: string }) {
  const containerRef = useRef<HTMLPreElement>(null);
  const startedRef = useRef(false);
  const totalLength = segments.reduce((total, segment) => total + segment.text.length, 0);
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setVisibleLength(totalLength);
      return;
    }

    let timer = 0;
    const startTyping = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      timer = window.setInterval(() => {
        setVisibleLength(current => {
          const next = Math.min(totalLength, current + 8);
          if (next === totalLength) window.clearInterval(timer);
          return next;
        });
      }, 25);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startTyping();
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(container);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [totalLength]);

  let charactersLeft = visibleLength;
  return (
    <pre ref={containerRef} className={className} aria-label={label}><code>{segments.map((segment, index) => {
      const visibleText = segment.text.slice(0, Math.max(0, Math.min(segment.text.length, charactersLeft)));
      charactersLeft -= visibleText.length;
      return visibleText ? <span key={index} className={segment.className}>{visibleText}</span> : null;
    })}<span className="typing-cursor" aria-hidden="true" /></code></pre>
  );
}

function ProjectCodeExample({ projectName }: { projectName: string }) {
  if (projectName === 'api-to-dataframe') {
    return (
      <TypingSnippet label="Exemplo de uso em Python" segments={[
        { text: 'from', className: 'code-keyword' }, { text: ' api_to_dataframe ' }, { text: 'import', className: 'code-keyword' }, { text: ' ClientBuilder\n\n' },
        { text: 'client = ' }, { text: 'ClientBuilder', className: 'code-function' }, { text: '(\n' },
        { text: '  endpoint=' }, { text: '"https://api.example.com/items"', className: 'code-string' }, { text: '\n' },
        { text: ')\n' },
        { text: 'data = client.' }, { text: 'get_api_data', className: 'code-function' }, { text: '()\n' },
        { text: 'df = client.' }, { text: 'api_to_dataframe', className: 'code-function' }, { text: '(data)' },
      ]} />
    );
  }

  return (
    <>
      <TypingSnippet label="Exemplo de uso em Python" segments={[
        { text: 'from', className: 'code-keyword' }, { text: ' currency_quote ' }, { text: 'import', className: 'code-keyword' }, { text: ' ClientBuilder\n\n' },
        { text: 'client = ' }, { text: 'ClientBuilder', className: 'code-function' }, { text: '([\n' },
        { text: '  "USD-BRL", "EUR-BRL"', className: 'code-string' }, { text: '\n])\n' },
        { text: 'quotes = client.' }, { text: 'get_last_quote', className: 'code-function' }, { text: '()\n' },
        { text: 'print', className: 'code-function' }, { text: '(quotes)\n\n' },
        { text: '# Get historical quote for a specific date (YYYYMMDD)\n', className: 'code-comment' },
        { text: 'print', className: 'code-function' }, { text: '(client.' }, { text: 'get_history_quote', className: 'code-function' }, { text: '(reference_date=' }, { text: '20220101', className: 'code-number' }, { text: '))' },
      ]} />
      <div className="project-response-example">
        <span>Response example</span>
        <pre className="project-response-code" aria-label="Exemplo de resposta JSON"><code>[{`\n`}  {'{'}{`\n`}    <span className="code-property">&quot;currency_pair&quot;</span>: <span className="code-string">&quot;USD-BRL&quot;</span>,{`\n`}    <span className="code-property">&quot;currency_pair_name&quot;</span>: <span className="code-string">&quot;Dólar Americano/Real Brasileiro&quot;</span>,{`\n`}    <span className="code-property">&quot;base_currency_code&quot;</span>: <span className="code-string">&quot;USD&quot;</span>,{`\n`}    <span className="code-property">&quot;quote_currency_code&quot;</span>: <span className="code-string">&quot;BRL&quot;</span>,{`\n`}    <span className="code-property">&quot;quote_timestamp&quot;</span>: <span className="code-number">1727201744</span>,{`\n`}    <span className="code-property">&quot;bid_price&quot;</span>: <span className="code-string">&quot;5.4579&quot;</span>,{`\n`}    <span className="code-property">&quot;ask_price&quot;</span>: <span className="code-string">&quot;5.4589&quot;</span>,{`\n`}    <span className="code-property">&quot;quote_extracted_at&quot;</span>: <span className="code-number">1727201753</span>{`\n`}  {'}'}{`\n`}]</code></pre>
      </div>
    </>
  );
}
const dataSkills = [
  { icon: FaCloudUploadAlt, title: 'Ingestão de dados', detail: 'Conectar diferentes fontes' },
  { icon: FaCogs, title: 'Processamento', detail: 'Transformar dados em informação' },
  { icon: FaWarehouse, title: 'Armazenamento', detail: 'Data warehouses serverless' },
  { icon: FaChartBar, title: 'Visualização de dados', detail: 'Apoiar decisões' },
];

const softwareSkills = [
  { icon: FaCode, title: 'APIs', detail: 'Integrar sistemas e produtos' },
  { icon: FaRocket, title: 'Microsserviços', detail: 'Evoluir com independência' },
  { icon: SiApacheairflow, title: 'Observabilidade', detail: 'Operar com confiança' },
];

function SkillNode({
  item,
  side,
  position,
}: {
  item: (typeof dataSkills)[number];
  side: 'data' | 'software';
  position: 'left' | 'right';
}) {
  const Icon = item.icon;
  return (
    <div className={`atlas-skill atlas-skill--${side} atlas-skill--${position}`}>
      <div className="atlas-skill-copy"><strong>{item.title}</strong><span>{item.detail}</span></div>
      <span className="atlas-icon"><Icon aria-hidden="true" /></span>
      <i aria-hidden="true" />
    </div>
  );
}

export default function PortfolioExperience({
  experiences,
  projects,
  formations,
  certifications,
  socialLinks,
}: Props) {
  const atlasSectionRef = useRef<HTMLElement>(null);
  const atlasVisualRef = useRef<HTMLDivElement>(null);
  const featuredSolutionRef = useRef<HTMLDivElement>(null);
  const pipelinePanelRef = useRef<HTMLDivElement>(null);
  const experienceSectionRef = useRef<HTMLElement>(null);
  const experienceTrackRef = useRef<HTMLDivElement>(null);
  const activeExperienceIndexRef = useRef(0);
  const experienceStaticRef = useRef(false);
  const companies = useMemo(() => Object.entries(experiences), [experiences]);
  const experienceSteps = useMemo(
    () => companies.flatMap(([company, roles], companyIndex) => roles.map((role, roleIndex) => ({ company, roles, role, companyIndex, roleIndex }))),
    [companies],
  );
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
  const [isExperienceStatic, setIsExperienceStatic] = useState(false);
  const otherProjects = projects.slice(1);
  const certificationList = Object.values(certifications).flat();
  const activeExperience = experienceSteps[activeExperienceIndex] ?? experienceSteps[0];

  useEffect(() => {
    const section = atlasSectionRef.current;
    const atlasVisual = atlasVisualRef.current;
    const solution = featuredSolutionRef.current;
    const pipelinePanel = pipelinePanelRef.current;
    if (!section || !atlasVisual || !solution || !pipelinePanel) return;

    const staticMotionQuery = window.matchMedia?.('(max-width: 760px), (max-height: 700px), (hover: none) and (pointer: coarse), (prefers-reduced-motion: reduce)');

    let frameId = 0;
    const updateSceneProgress = () => {
      // Read all geometry before writing styles to avoid forced layout while scrolling.
      const viewportHeight = window.innerHeight;
      const sectionBounds = section.getBoundingClientRect();
      const atlasBounds = atlasVisual.getBoundingClientRect();
      const solutionBounds = solution.getBoundingClientRect();
      const pipelineBounds = pipelinePanel.getBoundingClientRect();
      const isStatic = staticMotionQuery?.matches ?? false;
      const atlasProgress = isStatic ? 1 : getCentredEntryProgress(atlasBounds, viewportHeight);
      const solutionProgress = isStatic ? 1 : getCentredEntryProgress(solutionBounds, viewportHeight, 0.98, 0.5);
      const atlasIsVisible = sectionBounds.bottom > 0 && sectionBounds.top < viewportHeight;
      const solutionIsVisible = pipelineBounds.bottom > 0 && pipelineBounds.top < viewportHeight;

      section.style.setProperty('--atlas-progress', atlasProgress.toFixed(3));
      solution.style.setProperty('--solution-progress', solutionProgress.toFixed(3));
      section.dataset.atlasComplete = atlasProgress >= 0.999 ? 'true' : 'false';
      solution.dataset.solutionComplete = solutionProgress >= 0.999 ? 'true' : 'false';
      section.dataset.motionActive = atlasIsVisible ? 'true' : 'false';
      solution.dataset.motionActive = solutionIsVisible ? 'true' : 'false';
      frameId = 0;
    };
    const onScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateSceneProgress);
    };

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(onScroll) : null;
    resizeObserver?.observe(atlasVisual);
    resizeObserver?.observe(solution);
    updateSceneProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    staticMotionQuery?.addEventListener?.('change', onScroll);
    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      staticMotionQuery?.removeEventListener?.('change', onScroll);
    };
  }, []);

  useEffect(() => {
    const section = experienceSectionRef.current;
    const track = experienceTrackRef.current;
    if (!section || !track || experienceSteps.length < 2) return;

    const staticExperienceQuery = window.matchMedia?.('(max-width: 840px), (max-height: 700px), (hover: none) and (pointer: coarse), (prefers-reduced-motion: reduce)');
    let frameId = 0;

    const updateExperience = () => {
      const isStatic = staticExperienceQuery?.matches ?? false;
      if (experienceStaticRef.current !== isStatic) {
        experienceStaticRef.current = isStatic;
        setIsExperienceStatic(isStatic);
      }
      section.dataset.experienceStatic = isStatic ? 'true' : 'false';

      if (isStatic) {
        section.style.setProperty('--experience-progress', '0');
        section.dataset.motionActive = 'false';
        frameId = 0;
        return;
      }

      const bounds = track.getBoundingClientRect();
      const progress = getStickyTrackProgress(bounds.top, bounds.height, window.innerHeight);
      const nextIndex = getStepIndex(progress, experienceSteps.length);
      section.style.setProperty('--experience-progress', progress.toFixed(3));
      section.dataset.motionActive = bounds.bottom > 0 && bounds.top < window.innerHeight ? 'true' : 'false';
      if (activeExperienceIndexRef.current !== nextIndex) {
        activeExperienceIndexRef.current = nextIndex;
        setActiveExperienceIndex(nextIndex);
      }
      frameId = 0;
    };

    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateExperience);
    };
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(scheduleUpdate) : null;
    resizeObserver?.observe(track);
    updateExperience();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    staticExperienceQuery?.addEventListener?.('change', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      staticExperienceQuery?.removeEventListener?.('change', scheduleUpdate);
    };
  }, [experienceSteps.length]);

  const goToExperienceStep = (index: number) => {
    const track = experienceTrackRef.current;
    if (!track || experienceSteps.length < 2 || isExperienceStatic) return;
    const boundedIndex = Math.min(experienceSteps.length - 1, Math.max(0, index));
    const trackTop = window.scrollY + track.getBoundingClientRect().top;
    const scrollRange = Math.max(0, track.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: trackTop + (boundedIndex / (experienceSteps.length - 1)) * scrollRange,
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <main className="portfolio-shell">
      <section id="home" data-testid="hero-section" className="portfolio-hero">
        <div className="portfolio-hero-copy">
          <h1>Ivanildo<br />Barauna</h1>
          <p className="portfolio-eyebrow"><span /> Data &amp; Software Engineer</p>
          <p className="portfolio-lead">Projeto e construo sistemas que conectam Engenharia de Software e Dados, transformando insights analíticos em sistemas de decisão prontos para produção — da ingestão à ação.</p>
          <div className="portfolio-hero-socials" aria-label="Redes sociais">
            {socialLinks.map(link => {
              const Icon = socialIconMap[link.type];
              return Icon ? (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} title={link.label}>
                  <Icon aria-hidden="true" />
                </a>
              ) : null;
            })}
          </div>
          <CvDownloadButton variant="portfolio" />
          <div className="portfolio-stats portfolio-hero-stats" aria-label="Resumo profissional">
            <span><strong>+14 anos</strong> de experiência profissional na área de tecnologia</span>
          </div>
          <p className="portfolio-proof" aria-label="Áreas de especialidade">
            <span><strong>Analytics</strong><i /></span>
            <span><strong>Software Engineering</strong><i /></span>
            <span><strong>Data Pipelines</strong></span>
          </p>
          <a className="portfolio-scroll-cue" href="#about"><span>Explore a solução</span><i aria-hidden="true">↓</i></a>
        </div>
        <div className="portfolio-portrait">
          <Image src="/images/profile/profile-professional-casual.png" alt="Ivanildo Barauna com camiseta cinza e braços cruzados" fill priority sizes="(max-width: 760px) 100vw, 52vw" />
        </div>
      </section>

      <section ref={atlasSectionRef} id="about" data-testid="about-section" className="portfolio-atlas-section">
        <div className="portfolio-heading portfolio-heading--center">
          <div className="portfolio-heading-copy">
            <h2>Resolução de problemas de ponta a ponta</h2>
            <p>Software gera dados. Dados alimentam analytics, decisões e impacto.</p>
          </div>
        </div>

        <div ref={atlasVisualRef} className="portfolio-atlas" aria-label="Mapa de competências conectando dados e software">
          <div className="atlas-column">{softwareSkills.map(item => <SkillNode key={item.title} item={item} side="software" position="left" />)}</div>
          <div className="atlas-venn" aria-hidden="true">
            <div className="atlas-circle atlas-circle--software"><span>Software</span></div>
            <div className="atlas-circle atlas-circle--data"><span>Dados</span></div>
            <div className="atlas-intersection"><FaDatabase /><span>Solução de<br />ponta a ponta</span></div>
          </div>
          <div className="atlas-column atlas-column--data-flow">
            <div className="atlas-sql-connector" aria-hidden="true"><span>SQL</span><i /><i /></div>
            {dataSkills.map(item => <SkillNode key={item.title} item={item} side="data" position="right" />)}
          </div>
        </div>

        <div className="portfolio-outcomes">
          <article><span><FaMapMarkerAlt /></span><h3>Entender o problema</h3><p>Contexto antes da tecnologia.</p></article>
          <span className="outcome-arrow" aria-hidden="true">→</span>
          <article><span><FaCode /></span><h3>Construir a solução</h3><p>Dados e software, juntos.</p></article>
          <span className="outcome-arrow" aria-hidden="true">→</span>
          <article><span><FaRocket /></span><h3>Gerar impacto</h3><p>Tecnologia que entrega valor.</p></article>
        </div>
      </section>

      <section id="projects" data-testid="projects-section" className="portfolio-projects">
        <div ref={featuredSolutionRef} className="portfolio-featured">
          <div className="portfolio-featured-copy">
            <p className="portfolio-eyebrow"><span /> Solução em destaque</p>
            <h2>Real-time Event<br />Processing Pipeline</h2>
            <p>Uma solução end-to-end que transforma dados recebidos por requisições de API em informações prontas para análise: a Producer API publica eventos no Pub/Sub; o pipeline assíncrono os processa no Dataflow e os armazena no BigQuery.</p>
            <ul>
              <li>Software que gera eventos de negócio</li>
              <li>Processamento assíncrono e escalável</li>
              <li>Dados disponíveis para analytics</li>
            </ul>
            <div className="portfolio-repo-links" aria-label="Repositórios da solução">
                <a className="portfolio-outline" href="https://github.com/IvanildoBarauna/data-producer-api" target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> Producer API <FaExternalLinkAlt aria-hidden="true" /></a>
                <a className="portfolio-outline" href="https://github.com/IvanildoBarauna/data-pipeline-async-ingest" target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> Async Pipeline <FaExternalLinkAlt aria-hidden="true" /></a>
            </div>
          </div>
          <div ref={pipelinePanelRef} className="pipeline-panel" aria-label="Fluxo da solução de processamento de eventos em tempo real">
            <div className="pipeline-labels pipeline-labels--solution"><span>Produção de eventos</span><span>Processamento reativo</span><span>Armazenamento analítico</span></div>
            <div className="pipeline-architecture-note"><FaRocket /><span>Arquitetura orientada a eventos</span><small>Pub/Sub é o adaptador que desacopla a Producer API dos consumidores</small></div>
            <div className="pipeline-flow pipeline-flow--solution">
              <div className="producer-architecture">
                <div className="producer-hexagon"><div className="producer-hexagon-content"><FaCode /><strong>Producer<br />API</strong><small>Arquitetura<br />hexagonal</small></div></div>
                <div className="producer-pubsub-port"><FaRocket /><span>Pub/Sub</span></div>
                <div className="producer-event-label">Events Producer</div>
              </div>
              <span className="pipeline-connector pipeline-connector--events" aria-hidden="true"><small>publica eventos</small><span className="pipeline-event-line"><i /><i /><i /></span><b>→</b></span>
              <div className="pipeline-stage">
                <div className="pipeline-box pipeline-box--active"><FaCloud /><strong>Reactive<br />Pipeline</strong><small>Consome eventos</small><em>Apache Beam · Dataflow</em></div>
                <div className="pipeline-stage-label">Ingest &amp; Process Events</div>
              </div>
              <span className="pipeline-connector pipeline-connector--events" aria-hidden="true"><small>persiste</small><span className="pipeline-event-line"><i /><i /><i /></span><b>→</b></span>
              <div className="pipeline-stage">
                <div className="pipeline-box"><SiGooglebigquery /><strong>BigQuery</strong><small>Data warehouse</small><em>Pronto para analytics</em></div>
                <div className="pipeline-stage-label pipeline-stage-label--storage">Store Processed Events</div>
              </div>
            </div>
            <div className="pipeline-observability"><strong>Observabilidade end-to-end</strong><em>Datadog</em><span>Metrics</span><i /><span>Logs</span><i /><span>Traces</span></div>
          </div>
        </div>
        <div className="portfolio-project-list">
          <p className="portfolio-eyebrow"><span /> Outros projetos</p>
          {otherProjects.map(project => (
            <article key={project.id} className="portfolio-project-showcase">
              <div className="portfolio-project-copy">
                <p>Biblioteca Python</p>
                <h3>{compactTitle(project.title)}</h3>
                <p>{project.description}</p>
                <a href={project.projectUrl} target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> Ver no GitHub <FaExternalLinkAlt aria-hidden="true" /></a>
              </div>
              <div className="project-code-window">
                <div className="project-code-window-bar"><span /><span /><span /><em>Python</em></div>
                <ProjectCodeExample projectName={compactTitle(project.title)} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        ref={experienceSectionRef}
        id="experience"
        data-testid="experience-section"
        className="portfolio-experience"
        style={{ '--experience-steps': Math.max(1, experienceSteps.length - 1) } as CSSProperties}
      >
        <div ref={experienceTrackRef} className="experience-scroll-track">
          <div className="experience-sticky-stage">
            <div className="portfolio-heading"><p className="portfolio-eyebrow"><span /> Experiência</p></div>
            {activeExperience && <div className="experience-active-company">
              <span className="company-logo company-logo--focus">{activeExperience.role.companyLogo && <Image src={activeExperience.role.companyLogo} alt={`Logo ${activeExperience.company}`} width={56} height={56} />}</span>
              <div><p>{activeExperience.role.period}</p><h3>{activeExperience.company.replace(' Administradora de Consórcio Ltda', '')}</h3><span>{activeExperience.role.location}</span></div>
            </div>}
            {activeExperience && (
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {`${activeExperience.company}, ${activeExperience.role.position}, etapa ${activeExperienceIndex + 1} de ${experienceSteps.length}`}
              </p>
            )}
            <div className="experience-role-deck" aria-label="Trajetória profissional">
              {experienceSteps.map((step, index) => (
                <article
                  key={step.role.id}
                  className={`experience-role-card ${index === activeExperienceIndex ? 'is-active' : index < activeExperienceIndex ? 'is-past' : 'is-future'}`}
                  aria-hidden={!isExperienceStatic && index !== activeExperienceIndex}
                >
                  <div className="experience-card-company">
                    <span className="company-logo">{step.role.companyLogo && <Image src={step.role.companyLogo} alt="" width={30} height={30} />}</span>
                    <span><strong>{step.company.replace(' Administradora de Consórcio Ltda', '')}</strong><small>{step.role.period} · {step.role.location}</small></span>
                  </div>
                  <span className="experience-role-count">{step.roles.length > 1 ? `${step.roleIndex + 1} de ${step.roles.length} cargos na empresa` : 'Experiência profissional'}</span>
                  <h3>{step.role.position}</h3>
                  <p>{descriptionText(step.role.description)}</p>
                  <small className="experience-role-skills">{step.role.skills?.split(';').slice(0, 5).join(' · ')}</small>
                </article>
                ))}
            </div>
            <div className="experience-company-stack" aria-label="Empresas da trajetória profissional">
              {companies.map(([company, roles], index) => (
                <button
                  type="button"
                  key={company}
                  className={`experience-company-preview ${index === activeExperience?.companyIndex ? 'is-active' : ''}`}
                  style={{ '--stack-index': index } as CSSProperties}
                  aria-pressed={index === activeExperience?.companyIndex}
                  onClick={() => goToExperienceStep(experienceSteps.findIndex(step => step.companyIndex === index))}
                >
                  <span className="company-logo">{roles[0]?.companyLogo && <Image src={roles[0].companyLogo} alt="" width={30} height={30} />}</span>
                  <strong>{company.replace(' Administradora de Consórcio Ltda', '')}</strong>
                </button>
              ))}
            </div>
            {experienceSteps.length > 1 && (
              <div className="experience-navigation">
                <div className="experience-scroll-hint"><span /> <p>Role para navegar pela trajetória</p></div>
                <div className="experience-progress" aria-hidden="true"><i /></div>
                <span className="experience-step-count">{String(activeExperienceIndex + 1).padStart(2, '0')} / {String(experienceSteps.length).padStart(2, '0')}</span>
                <div className="experience-step-buttons" aria-label="Controles da trajetória">
                  <button type="button" onClick={() => goToExperienceStep(activeExperienceIndex - 1)} disabled={activeExperienceIndex === 0} aria-label="Experiência anterior"><FaArrowUp aria-hidden="true" /></button>
                  <button type="button" onClick={() => goToExperienceStep(activeExperienceIndex + 1)} disabled={activeExperienceIndex === experienceSteps.length - 1} aria-label="Próxima experiência"><FaArrowDown aria-hidden="true" /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="education" data-testid="education-section" className="portfolio-education">
        <div className="portfolio-heading"><p className="portfolio-eyebrow"><span /> Formação</p><h2>Base técnica.<br />Aprendizado contínuo.</h2></div>
        <div className="portfolio-education-list">
          {formations.map(formation => <article key={formation.id}><span>{formation.period}</span><h3>{formation.course}</h3><p>{formation.institution} · {formation.type}</p></article>)}
          {certificationList.map(certification => <a key={certification.id} href={certification.credential_url} target="_blank" rel="noreferrer"><span>Certificação</span><h3>{certification.name}</h3><p>{certification.institution} <FaExternalLinkAlt /></p></a>)}
        </div>
      </section>

      <footer className="portfolio-footer">
        <p>Ivanildo Barauna</p>
        <div className="portfolio-footer-socials" aria-label="Redes sociais">
          {socialLinks.map(link => {
            const Icon = socialIconMap[link.type];
            return Icon ? (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} title={link.label}>
                <Icon aria-hidden="true" />
              </a>
            ) : null;
          })}
        </div>
        <a className="portfolio-back-to-top" href="#home">Voltar ao início <FaArrowUp aria-hidden="true" /></a>
      </footer>

    </main>
  );
}
