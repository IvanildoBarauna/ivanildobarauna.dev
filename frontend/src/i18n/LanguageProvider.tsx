'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const supportedLanguages = ['pt', 'en', 'es'] as const;
export type Language = (typeof supportedLanguages)[number];

const dictionaries: Record<Language, Record<string, string>> = {
  pt: {
    'Download CV': 'Baixar CV',
    'Pipeline for processing and consuming streaming data from Pub/Sub, integrating with Dataflow for real-time data processing': 'Pipeline para processamento e consumo de dados em streaming do Pub/Sub, integrado ao Dataflow para processamento em tempo real.',
    'Lightweight Python library that transforms REST API responses into well-structured Pandas DataFrames — with built-in retry logic, schema validation, and intelligent type inference.': 'Biblioteca Python leve que transforma respostas de APIs REST em DataFrames Pandas bem estruturados, com retentativas, validação de esquema e inferência inteligente de tipos.',
    'Complete solution for extracting currency pair quotes data with comprehensive testing, parameter validation, flexible configuration management, Hexagonal Architecture, CI/CD pipelines, code quality tools, and detailed documentation.': 'Solução completa para extrair cotações de pares de moedas, com testes abrangentes, validação de parâmetros, configuração flexível, arquitetura hexagonal, pipelines de CI/CD e ferramentas de qualidade.',
  },
  en: {
    'Download CV': 'Download CV', 'Data & Software Engineer': 'Data & Software Engineer', 'Response example': 'Response example', 'Events Producer': 'Events Producer', 'Ingest & Process Events': 'Ingest & Process Events', 'Store Processed Events': 'Store Processed Events',
    'Sobre mim': 'About me', 'Projetos': 'Projects', 'Experiência': 'Experience', 'Formação': 'Education', 'Senior Software Engineer @ Mercado Livre': 'Senior Software Engineer @ Mercado Livre', 'Senior Software Engineer': 'Senior Software Engineer', 'Senior Data Engineer': 'Senior Data Engineer',
    'Navegação principal': 'Main navigation', 'Abrir menu': 'Open menu', 'Fechar menu': 'Close menu', 'Selecionar idioma': 'Select language',
    'Projeto e construo sistemas que conectam Engenharia de Software e Dados, transformando insights analíticos em sistemas de decisão prontos para produção — da ingestão à ação.': 'I design and build systems that connect Software and Data Engineering, transforming analytical insights into production-ready decision systems — from ingestion to action.',
    'Redes sociais': 'Social media', 'Resumo profissional': 'Professional summary', '+14 anos': '+14 years', 'de experiência profissional na área de tecnologia': 'of professional experience in technology', 'Áreas de especialidade': 'Areas of expertise', 'Explore a solução': 'Explore the solution',
    'Ivanildo Barauna com camiseta cinza e braços cruzados': 'Ivanildo Barauna wearing a gray T-shirt with arms crossed',
    'Resolução de problemas de ponta a ponta': 'End-to-end problem solving', 'Software gera dados. Dados alimentam analytics, decisões e impacto.': 'Software generates data. Data drives analytics, decisions, and impact.', 'Software, dados e arquitetura juntos para transformar problemas complexos de negócio em sistemas de decisão prontos para produção.': 'Software, data, and architecture working together to turn complex business problems into production-ready decision systems.', 'Senior Software Engineer com forte experiência em Data Engineering, atuando na interseção entre software, dados e tomada de decisão.': 'Senior Software Engineer with a strong Data Engineering background, working at the intersection of software, data, and decision-making.', 'Minha abordagem conecta problema de negócio, arquitetura, dados, software e decisão em soluções escaláveis, com foco em DDD, arquitetura hexagonal, APIs e sistemas distribuídos.': 'My approach connects business problems, architecture, data, software, and decisions through scalable solutions focused on DDD, Hexagonal Architecture, APIs, and distributed systems.',
    'Mapa de competências conectando dados e software': 'Skills map connecting data and software', 'Dados': 'Data', 'Solução de ponta a ponta': 'End-to-end solution',
    'Ingestão de dados': 'Data ingestion', 'Conectar diferentes fontes': 'Connect different sources', 'Processamento': 'Processing', 'Transformar dados em informação': 'Transform data into information', 'Armazenamento': 'Storage', 'Data warehouses serverless': 'Serverless data warehouses', 'Visualização de dados': 'Data visualization', 'Apoiar decisões': 'Support decisions', 'Integrar sistemas e produtos': 'Integrate systems and products', 'Microsserviços': 'Microservices', 'Evoluir com independência': 'Evolve independently', 'Observabilidade': 'Observability', 'Operar com confiança': 'Operate with confidence',
    'Entender o problema': 'Understand the problem', 'Contexto antes da tecnologia.': 'Context before technology.', 'Construir a solução': 'Build the solution', 'Dados e software, juntos.': 'Data and software, together.', 'Gerar impacto': 'Create impact', 'Tecnologia que entrega valor.': 'Technology that delivers value.',
    'Solução em destaque': 'Featured solution', 'Sistema de decisão construído do zero para lidar com disputas de clientes de alto risco nos canais Reclame Aqui, Consumidor.gov.br e Procon, usando regras de elegibilidade, lógica de negócio e templates de resposta.': 'A decision system built from scratch to handle high-risk customer disputes across Reclame Aqui, Consumidor.gov.br, and Procon using eligibility rules, business logic, and response templates.', 'Regras de negócio operacionalizadas em software': 'Business rules operationalized in software', 'Decisões automatizadas com rastreabilidade': 'Automated decisions with traceability', 'Arquitetura preparada para evolução': 'Architecture ready to evolve',
    'Software que gera eventos de negócio': 'Software that generates business events', 'Processamento assíncrono e escalável': 'Asynchronous and scalable processing', 'Dados disponíveis para analytics': 'Data available for analytics', 'Repositórios da solução': 'Solution repositories',
    'Fluxo da solução de processamento de eventos em tempo real': 'Real-time event processing solution flow', 'Produção de eventos': 'Event production', 'Processamento reativo': 'Reactive processing', 'Armazenamento analítico': 'Analytical storage', 'Arquitetura orientada a eventos': 'Event-driven architecture', 'Pub/Sub é o adaptador que desacopla a Producer API dos consumidores': 'Pub/Sub is the adapter that decouples the Producer API from consumers', 'Arquitetura hexagonal': 'Hexagonal architecture', 'publica eventos': 'publishes events', 'Consome eventos': 'Consumes events', 'persiste': 'persists', 'Pronto para analytics': 'Analytics-ready', 'Observabilidade end-to-end': 'End-to-end observability',
    'Outros projetos': 'Other projects', 'Biblioteca Python': 'Python library', 'Ver no GitHub': 'View on GitHub', 'Exemplo de uso em Python': 'Python usage example', 'Exemplo de resposta JSON': 'JSON response example',
    'Trajetória profissional': 'Professional journey', 'Empresas da trajetória profissional': 'Companies in my professional journey', 'Experiência profissional': 'Professional experience', 'cargos na empresa': 'roles at the company', 'etapa': 'step', 'de': 'of', 'Role para navegar pela trajetória': 'Scroll to navigate the journey', 'Controles da trajetória': 'Journey controls', 'Experiência anterior': 'Previous experience', 'Próxima experiência': 'Next experience',
    'Base técnica. Aprendizado contínuo.': 'Technical foundation. Continuous learning.', 'Certificação': 'Certification', 'Voltar ao início': 'Back to top',
    'Erro ao carregar dados': 'Error loading data',
    'São Paulo, Brasil': 'São Paulo, Brazil', 'Santana de Parnaíba, São Paulo, Brasil': 'Santana de Parnaíba, São Paulo, Brazil',
    'Sr. Data & Software Engineer': 'Senior Data & Software Engineer', 'Analista de Business Intelligence': 'Business Intelligence Analyst', 'Analista de Aplicações Digitais PL': 'Mid-level Digital Applications Analyst', 'Analista de Aplicações Digitais Jr': 'Junior Digital Applications Analyst', 'Analista Administrativo': 'Administrative Analyst',
    'Desenvolvimento de soluções de observabilidade de negócio entre microsserviços. Trabalho com tecnologias como Apache Beam, Google Cloud Platform, e Python': 'Development of business observability solutions across microservices, using technologies such as Apache Beam, Google Cloud Platform, and Python.',
    'Responsável por garantir a execução de pipelines e fornecimento de dados para Investimentos, Core Banking e outros assuntos de Corporate Banking. Desenvolvimento de processos de Data Quality. Suporte no desenvolvimento da plataforma de dados do banco': 'Responsible for pipeline execution and data delivery for Investments, Core Banking, and other Corporate Banking domains. Developed Data Quality processes and supported the bank data platform.',
    'Mapeamento, definição e planejamento de entrada/manutenção de pipelines de Dados no Data Lake. Estruturação e disponibilização de Data Marts e/ou Data Warehouses para as demais áreas do banco. Foco em otimização de custo e performance dos pipelines produtivos': 'Mapped, defined, and planned Data Lake pipeline onboarding and maintenance. Built Data Marts and Data Warehouses for other bank areas, focusing on production pipeline cost and performance.',
    'Desenvolvimento de solução de ETL auto orquestrada para análise de grandes volumes de dados. Foco em redução de custo e criação de Data Mart para área de negócio. Implementação de processos automatizados de transformação de dados': 'Developed a self-orchestrated ETL solution for high-volume analysis, focused on cost reduction, business Data Marts, and automated data transformation.',
    'Criação de indicadores de performance de negócio para suporte à tomada de decisão. Desenvolvimento de dashboards e relatórios para acompanhamento de resultados. Automatização de processos de ETL para carga de dados': 'Created business performance indicators for decision support, dashboards and reports for results tracking, and automated ETL loading processes.',
    'Construção de Indicadores para tomada de decisão estratégica. Desenvolvimento de análises descritivas e preditivas. Suporte à decisão através de análise de dados': 'Built indicators for strategic decision-making, developed descriptive and predictive analyses, and supported decisions through data analysis.',
    'Construção de Indicadores para tomada de decisão estratégica. Foco em análise de dados para área comercial. Desenvolvimento de relatórios e dashboards': 'Built strategic decision indicators, focusing on commercial data analysis and the development of reports and dashboards.',
    'Desenvolvimento de relatórios no Excel usando ferramentas de SSBI (Power Query, Power Pivot e Power View). Automatização de tarefas manuais usando programação VBA': 'Developed Excel reports using SSBI tools (Power Query, Power Pivot, and Power View) and automated manual tasks with VBA.',
  },
  es: {
    'Download CV': 'Descargar CV', 'Data & Software Engineer': 'Ingeniero de Datos y Software', 'Response example': 'Ejemplo de respuesta', 'Events Producer': 'Productor de eventos', 'Ingest & Process Events': 'Ingestar y procesar eventos', 'Store Processed Events': 'Almacenar eventos procesados',
    'Sobre mim': 'Sobre mí', 'Projetos': 'Proyectos', 'Experiência': 'Experiencia', 'Formação': 'Formación',
    'Navegação principal': 'Navegación principal', 'Abrir menu': 'Abrir menú', 'Fechar menu': 'Cerrar menú', 'Selecionar idioma': 'Seleccionar idioma',
    'Projeto e construo sistemas que conectam Engenharia de Software e Dados, transformando insights analíticos em sistemas de decisão prontos para produção — da ingestão à ação.': 'Diseño y construyo sistemas que conectan la Ingeniería de Software y Datos, transformando conocimientos analíticos en sistemas de decisión listos para producción, desde la ingesta hasta la acción.',
    'Redes sociais': 'Redes sociales', 'Resumo profissional': 'Resumen profesional', '+14 anos': '+14 años', 'de experiência profissional na área de tecnologia': 'de experiencia profesional en tecnología', 'Áreas de especialidade': 'Áreas de especialidad', 'Explore a solução': 'Explora la solución',
    'Ivanildo Barauna com camiseta cinza e braços cruzados': 'Ivanildo Barauna con camiseta gris y brazos cruzados',
    'Resolução de problemas de ponta a ponta': 'Resolución de problemas de extremo a extremo', 'Software gera dados. Dados alimentam analytics, decisões e impacto.': 'El software genera datos. Los datos impulsan análisis, decisiones e impacto.',
    'Mapa de competências conectando dados e software': 'Mapa de competencias que conecta datos y software', 'Dados': 'Datos', 'Solução de ponta a ponta': 'Solución de extremo a extremo',
    'Ingestão de dados': 'Ingesta de datos', 'Conectar diferentes fontes': 'Conectar diferentes fuentes', 'Processamento': 'Procesamiento', 'Transformar dados em informação': 'Transformar datos en información', 'Armazenamento': 'Almacenamiento', 'Data warehouses serverless': 'Data warehouses sin servidor', 'Visualização de dados': 'Visualización de datos', 'Apoiar decisões': 'Apoyar decisiones', 'Integrar sistemas e produtos': 'Integrar sistemas y productos', 'Microsserviços': 'Microservicios', 'Evoluir com independência': 'Evolucionar con independencia', 'Observabilidade': 'Observabilidad', 'Operar com confiança': 'Operar con confianza',
    'Entender o problema': 'Entender el problema', 'Contexto antes da tecnologia.': 'El contexto antes que la tecnología.', 'Construir a solução': 'Construir la solución', 'Dados e software, juntos.': 'Datos y software, juntos.', 'Gerar impacto': 'Generar impacto', 'Tecnologia que entrega valor.': 'Tecnología que aporta valor.',
    'Solução em destaque': 'Solución destacada', 'Uma solução end-to-end que transforma dados recebidos por requisições de API em informações prontas para análise: a Producer API publica eventos no Pub/Sub; o pipeline assíncrono os processa no Dataflow e os armazena no BigQuery.': 'Una solución de extremo a extremo que transforma datos recibidos mediante solicitudes API en información lista para el análisis: Producer API publica eventos en Pub/Sub; el pipeline asíncrono los procesa en Dataflow y los almacena en BigQuery.',
    'Software que gera eventos de negócio': 'Software que genera eventos de negocio', 'Processamento assíncrono e escalável': 'Procesamiento asíncrono y escalable', 'Dados disponíveis para analytics': 'Datos disponibles para análisis', 'Repositórios da solução': 'Repositorios de la solución',
    'Fluxo da solução de processamento de eventos em tempo real': 'Flujo de la solución de procesamiento de eventos en tiempo real', 'Produção de eventos': 'Producción de eventos', 'Processamento reativo': 'Procesamiento reactivo', 'Armazenamento analítico': 'Almacenamiento analítico', 'Arquitetura orientada a eventos': 'Arquitectura orientada a eventos', 'Pub/Sub é o adaptador que desacopla a Producer API dos consumidores': 'Pub/Sub es el adaptador que desacopla Producer API de los consumidores', 'Arquitetura hexagonal': 'Arquitectura hexagonal', 'publica eventos': 'publica eventos', 'Consome eventos': 'Consume eventos', 'persiste': 'persiste', 'Pronto para analytics': 'Listo para análisis', 'Observabilidade end-to-end': 'Observabilidad de extremo a extremo',
    'Outros projetos': 'Otros proyectos', 'Biblioteca Python': 'Biblioteca Python', 'Ver no GitHub': 'Ver en GitHub', 'Exemplo de uso em Python': 'Ejemplo de uso en Python', 'Exemplo de resposta JSON': 'Ejemplo de respuesta JSON',
    'Trajetória profissional': 'Trayectoria profesional', 'Empresas da trajetória profissional': 'Empresas de la trayectoria profesional', 'Experiência profissional': 'Experiencia profesional', 'cargos na empresa': 'cargos en la empresa', 'etapa': 'etapa', 'de': 'de', 'Role para navegar pela trajetória': 'Desplázate para navegar por la trayectoria', 'Controles da trajetória': 'Controles de la trayectoria', 'Experiência anterior': 'Experiencia anterior', 'Próxima experiência': 'Siguiente experiencia',
    'Base técnica. Aprendizado contínuo.': 'Base técnica. Aprendizaje continuo.', 'Certificação': 'Certificación', 'Voltar ao início': 'Volver al inicio',
    'Erro ao carregar dados': 'Error al cargar los datos',
    'Pipeline for processing and consuming streaming data from Pub/Sub, integrating with Dataflow for real-time data processing': 'Pipeline para procesar y consumir datos en streaming de Pub/Sub, integrado con Dataflow para el procesamiento en tiempo real.',
    'Lightweight Python library that transforms REST API responses into well-structured Pandas DataFrames — with built-in retry logic, schema validation, and intelligent type inference.': 'Biblioteca Python ligera que transforma respuestas de APIs REST en DataFrames de Pandas bien estructurados, con reintentos, validación de esquema e inferencia inteligente de tipos.',
    'Complete solution for extracting currency pair quotes data with comprehensive testing, parameter validation, flexible configuration management, Hexagonal Architecture, CI/CD pipelines, code quality tools, and detailed documentation.': 'Solución completa para extraer cotizaciones de pares de monedas, con pruebas exhaustivas, validación de parámetros, configuración flexible, arquitectura hexagonal, pipelines de CI/CD y herramientas de calidad.',
    'Sr. Data & Software Engineer': 'Ingeniero Sénior de Datos y Software', 'Senior Data Analyst': 'Analista Sénior de Datos', 'Data Analyst': 'Analista de Datos', 'Business Intelligence Analyst': 'Analista de Business Intelligence', 'Analista de Business Intelligence': 'Analista de Business Intelligence', 'Analista de Aplicações Digitais PL': 'Analista de Aplicaciones Digitales Semisénior', 'Analista de Aplicações Digitais Jr': 'Analista de Aplicaciones Digitales Júnior', 'Analista Administrativo': 'Analista Administrativo',
    'Desenvolvimento de soluções de observabilidade de negócio entre microsserviços. Trabalho com tecnologias como Apache Beam, Google Cloud Platform, e Python': 'Desarrollo de soluciones de observabilidad de negocio entre microservicios con tecnologías como Apache Beam, Google Cloud Platform y Python.',
    'Responsável por garantir a execução de pipelines e fornecimento de dados para Investimentos, Core Banking e outros assuntos de Corporate Banking. Desenvolvimento de processos de Data Quality. Suporte no desenvolvimento da plataforma de dados do banco': 'Responsable de garantizar la ejecución de pipelines y el suministro de datos para Inversiones, Core Banking y otros dominios de Corporate Banking. Desarrollo de procesos de calidad de datos y soporte a la plataforma de datos del banco.',
    'Mapeamento, definição e planejamento de entrada/manutenção de pipelines de Dados no Data Lake. Estruturação e disponibilização de Data Marts e/ou Data Warehouses para as demais áreas do banco. Foco em otimização de custo e performance dos pipelines produtivos': 'Mapeo, definición y planificación de la incorporación y mantenimiento de pipelines en el Data Lake. Creación de Data Marts y Data Warehouses con foco en costes y rendimiento.',
    'Desenvolvimento de solução de ETL auto orquestrada para análise de grandes volumes de dados. Foco em redução de custo e criação de Data Mart para área de negócio. Implementação de processos automatizados de transformação de dados': 'Desarrollo de una solución ETL autoorquestada para analizar grandes volúmenes, reducir costes, crear Data Marts y automatizar transformaciones.',
    'Criação de indicadores de performance de negócio para suporte à tomada de decisão. Desenvolvimento de dashboards e relatórios para acompanhamento de resultados. Automatização de processos de ETL para carga de dados': 'Creación de indicadores de rendimiento para apoyar decisiones, paneles e informes de resultados y automatización de cargas ETL.',
    'Construção de Indicadores para tomada de decisão estratégica. Desenvolvimento de análises descritivas e preditivas. Suporte à decisão através de análise de dados': 'Creación de indicadores para decisiones estratégicas, análisis descriptivos y predictivos y apoyo a decisiones mediante datos.',
    'Construção de Indicadores para tomada de decisão estratégica. Foco em análise de dados para área comercial. Desenvolvimento de relatórios e dashboards': 'Creación de indicadores estratégicos con foco en análisis comercial, informes y paneles.',
    'Desenvolvimento de relatórios no Excel usando ferramentas de SSBI (Power Query, Power Pivot e Power View). Automatização de tarefas manuais usando programação VBA': 'Desarrollo de informes en Excel con herramientas SSBI y automatización de tareas manuales con VBA.',
  },
};

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (text: string) => string };
const LanguageContext = createContext<LanguageContextValue>({ language: 'pt', setLanguage: () => undefined, t: (text) => text });

/** Normalizes an arbitrary language value to a supported language code. */
export function normalizeLanguage(value: string | null): Language {
  return supportedLanguages.includes(value as Language) ? value as Language : 'pt';
}

/** Returns the selected language from a URL. */
export function getLanguageFromUrl(url: string): Language {
  return normalizeLanguage(new URL(url).searchParams.get('lang'));
}

/** Returns a URL path containing the selected language while preserving its current state. */
export function getLocalizedUrl(url: string, language: Language): string {
  const localizedUrl = new URL(url);
  localizedUrl.searchParams.set('lang', language);
  return `${localizedUrl.pathname}${localizedUrl.search}${localizedUrl.hash}`;
}

/** Provides URL-synchronized translations to the portfolio. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>('pt');

  useEffect(() => {
    const syncLanguage = () => updateLanguage(getLanguageFromUrl(window.location.href));
    syncLanguage();
    window.addEventListener('popstate', syncLanguage);
    return () => window.removeEventListener('popstate', syncLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
    if (new URL(window.location.href).searchParams.get('lang') !== language) {
      window.history.replaceState({}, '', getLocalizedUrl(window.location.href, language));
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: (nextLanguage) => {
      window.history.pushState({}, '', getLocalizedUrl(window.location.href, nextLanguage));
      updateLanguage(nextLanguage);
    },
    t: (text) => dictionaries[language][text] ?? text,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Returns the current language and translation helpers. */
export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
