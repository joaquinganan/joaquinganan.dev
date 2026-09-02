"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  AppWindow,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  CalendarCheck,
  ChevronDown,
  Download,
  Globe2,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Network,
  Users,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Language = "en" | "es";

const copy = {
  en: {
    skip: "Skip to content",
    navLabel: "Primary navigation",
    role: "Senior QA Engineer",
    nav: [
      ["Expertise", "#expertise"],
      ["Experience", "#experience"],
      ["Work", "#work"],
      ["Contact", "#contact"],
    ],
    language: "Switch to Spanish",
    resume: "Download résumé (EN)",
    resumeShort: "CV (EN)",
    availability: "Open to remote opportunities",
    location: "Santo Domingo · UTC-4",
    eyebrow: "Quality across complex systems",
    headline: "I turn release risk into confident decisions.",
    intro:
      "Senior QA Engineer with 7+ years of experience leading quality across enterprise programs, web and mobile products, REST APIs, and interconnected backend systems.",
    explore: "View selected work",
    contact: "Contact me",
    portrait: "Portrait of Joaquín Gañán",
    metrics: [
      ["20+", "integrated applications"],
      ["100+", "stakeholders coordinated"],
      ["36+", "release validations per year"],
      ["6+", "QAs mentored"],
      ["Global", "multinational delivery teams"],
      ["E2E", "UI + backend validation"],
      ["Provisioning flow", "SME"],
    ],
    impactLabel: "Project impact",
    impactScope: "Newtech SRL · Verizon contractor · 2019 - 2024",
    expertiseLabel: "Expertise",
    expertiseTitle: "Quality from strategy to production.",
    expertise: [
      {
        number: "01",
        title: "Quality strategy",
        text: "Risk-led planning, estimation, test design, UAT, defect triage, and evidence-based release decisions.",
        detail: "STLC · Risk-based QA · UAT · Leadership",
      },
      {
        number: "02",
        title: "Backend & integration",
        text: "REST API validation, SQL data checks, and end-to-end coverage across modern and legacy systems.",
        detail: "Postman · REST · SQL · E2E",
      },
      {
        number: "03",
        title: "Automation & CI",
        text: "Pragmatic Playwright coverage and delivery checks that reinforce thoughtful manual and exploratory testing.",
        detail: "Playwright · JavaScript · GitHub Actions",
      },
    ],
    labLabel: "QA Automation Lab",
    labTitle: "This portfolio tests itself.",
    labIntro:
      "A real Playwright framework validates the experience you are using now. The interactive runner is the next step; the current suite and CI history are already public.",
    labStatus: "Lab preview",
    latestRunTitle: "Current production coverage",
    latestRunText: "16 test cases · 44 cross-browser executions · 5 browser projects",
    suiteLink: "View automation suite",
    runsLink: "View latest CI run",
    terminalLabel: "Latest verified suite summary",
    terminalChecks: [
      "✓ Homepage smoke coverage",
      "✓ Section navigation",
      "✓ External destinations",
      "✓ Responsive layout",
      "✓ Cross-browser coverage",
    ],
    terminalStatus: "Status: passed",
    workLabel: "Selected work",
    workTitle: "Evidence over buzzwords.",
    featured: "Public automation project",
    confidential: "Anonymized case snapshot",
    repository: "View M4PP project",
    caseStatus: "Case study in progress",
    projects: [
      {
        title: "M4PP Playwright Automation Suite",
        text: "End-to-end and API coverage for authentication, interactive canvas behavior, access control, and backend integrations.",
        meta: "Playwright · JavaScript · POM · API",
      },
      {
        title: "Integrated Release Assurance",
        text: "A risk-led QA operating model connecting dependencies across 20+ applications with evidence-based go/no-go recommendations.",
        meta: "Enterprise QA · Integration · UAT",
      },
    ],
    experienceLabel: "Experience",
    experienceTitle: "Enterprise scale. Hands-on depth.",
    experience: [
      {
        dates: "2024 - 2026",
        title: "Software Testing Analyst",
        company: "Thryv Dominicana",
        text: "Quality ownership for integrated web applications, API validation, accessibility, Playwright maintenance, and release readiness.",
      },
      {
        dates: "2019 - 2024",
        title: "QA Program Lead / QA Project Manager",
        company: "Newtech SRL · Verizon contractor",
        text: "Led QA across 20+ connected applications, teams of 6-10 analysts, 100+ stakeholders, and 36+ releases per year.",
      },
      {
        dates: "2021 - 2023",
        title: "Software QA Analyst",
        company: "Applaudo Studios",
        text: "Manual and exploratory QA across distributed Agile teams delivering web and mobile products.",
      },
    ],
    earlier: "Earlier: Supervisor & Quality Analyst · Visionary Solutions FTZ · 2017 - 2019",
    toolboxLabel: "Toolbox & education",
    toolboxTitle: "Hands-on where the evidence lives.",
    toolGroups: [
      ["Testing", "Manual · Functional · Regression · Exploratory · Integration · E2E · UAT · Mobile"],
      ["API & data", "Postman · REST APIs · JSON · SQL · Chrome DevTools · curl · Linux CLI"],
      ["Delivery", "Playwright · JavaScript · Git · GitHub Actions · Jenkins · Jira · Xray · Zephyr"],
    ],
    education: "B.S. Computer Systems Engineering · Universidad APEC (UNAPEC)",
    languages: "Spanish - Native · English - Full professional proficiency",
    contactLabel: "Let’s work together",
    contactTitle: "Let’s build reliable software.",
    contactText:
      "I’m open to remote Senior and Mid-level QA opportunities across the US, LATAM, and Europe.",
    email: "Start a conversation",
    linkedin: "LinkedIn",
    github: "GitHub",
    footer: "Designed around evidence, clarity, and quality.",
    backToTop: "Back to top",
  },
  es: {
    skip: "Saltar al contenido",
    navLabel: "Navegación principal",
    role: "Ingeniero QA Senior",
    nav: [
      ["Especialidad", "#expertise"],
      ["Experiencia", "#experience"],
      ["Proyectos", "#work"],
      ["Contacto", "#contact"],
    ],
    language: "Cambiar a inglés",
    resume: "Descargar CV (ES)",
    resumeShort: "CV (ES)",
    availability: "Disponible para oportunidades remotas",
    location: "Santo Domingo · UTC-4",
    eyebrow: "Calidad en sistemas complejos",
    headline: "Convierto el riesgo de cada release en decisiones seguras.",
    intro:
      "Ingeniero QA Senior con más de 7 años liderando la calidad en programas empresariales, productos web y móviles, APIs REST y sistemas backend interconectados.",
    explore: "Ver trabajo seleccionado",
    contact: "Contáctame",
    portrait: "Retrato de Joaquín Gañán",
    metrics: [
      ["20+", "aplicaciones integradas"],
      ["100+", "stakeholders coordinados"],
      ["36+", "validaciones de release por año"],
      ["6+", "QAs mentoreados"],
      ["Global", "equipos multinacionales"],
      ["E2E", "validación de UI + backend"],
      ["Flujo de provisioning", "SME"],
    ],
    impactLabel: "Impacto del proyecto",
    impactScope: "Newtech SRL · Contratista de Verizon · 2019 - 2024",
    expertiseLabel: "Especialidad",
    expertiseTitle: "Calidad desde la estrategia hasta producción.",
    expertise: [
      {
        number: "01",
        title: "Estrategia de calidad",
        text: "Planificación por riesgo, estimación, diseño de pruebas, UAT, triaje y decisiones de release basadas en evidencia.",
        detail: "STLC · QA por riesgo · UAT · Liderazgo",
      },
      {
        number: "02",
        title: "Backend e integración",
        text: "Validación de APIs REST, comprobaciones SQL y cobertura end-to-end entre sistemas modernos y legacy.",
        detail: "Postman · REST · SQL · E2E",
      },
      {
        number: "03",
        title: "Automatización y CI",
        text: "Cobertura pragmática con Playwright y controles de entrega que fortalecen las pruebas manuales y exploratorias.",
        detail: "Playwright · JavaScript · GitHub Actions",
      },
    ],
    labLabel: "Laboratorio de automatización QA",
    labTitle: "Este portafolio se prueba a sí mismo.",
    labIntro:
      "Un framework real de Playwright valida la experiencia que estás utilizando. El runner interactivo es el próximo paso; la suite y su historial de CI ya son públicos.",
    labStatus: "Vista previa del lab",
    latestRunTitle: "Cobertura actual en producción",
    latestRunText: "16 casos de prueba · 44 ejecuciones cross-browser · 5 proyectos de navegador",
    suiteLink: "Ver suite de automatización",
    runsLink: "Ver última ejecución CI",
    terminalLabel: "Resumen de la última suite verificada",
    terminalChecks: [
      "✓ Cobertura smoke del inicio",
      "✓ Navegación entre secciones",
      "✓ Destinos externos",
      "✓ Layout responsive",
      "✓ Cobertura cross-browser",
    ],
    terminalStatus: "Estado: aprobado",
    workLabel: "Trabajo seleccionado",
    workTitle: "Evidencia antes que palabras de moda.",
    featured: "Proyecto público de automatización",
    confidential: "Caso anonimizado",
    repository: "Ver proyecto M4PP",
    caseStatus: "Caso en preparación",
    projects: [
      {
        title: "Suite de automatización Playwright para M4PP",
        text: "Cobertura end-to-end y de API para autenticación, canvas interactivo, control de acceso e integraciones backend.",
        meta: "Playwright · JavaScript · POM · API",
      },
      {
        title: "Aseguramiento de releases integrados",
        text: "Modelo QA por riesgo que conecta dependencias entre más de 20 aplicaciones y sustenta recomendaciones go/no-go con evidencia.",
        meta: "QA empresarial · Integración · UAT",
      },
    ],
    experienceLabel: "Experiencia",
    experienceTitle: "Escala empresarial. Profundidad práctica.",
    experience: [
      {
        dates: "2024 - 2026",
        title: "Software Testing Analyst",
        company: "Thryv Dominicana",
        text: "Responsabilidad de calidad para aplicaciones integradas, validación API, accesibilidad, mantenimiento de Playwright y preparación de releases.",
      },
      {
        dates: "2019 - 2024",
        title: "QA Program Lead / QA Project Manager",
        company: "Newtech SRL · Contratista de Verizon",
        text: "Lideré QA en más de 20 aplicaciones conectadas, equipos de 6-10 analistas, más de 100 stakeholders y 36+ releases al año.",
      },
      {
        dates: "2021 - 2023",
        title: "Software QA Analyst",
        company: "Applaudo Studios",
        text: "QA manual y exploratorio en equipos Agile distribuidos para productos web y móviles.",
      },
    ],
    earlier: "Anterior: Supervisor & Quality Analyst · Visionary Solutions FTZ · 2017 - 2019",
    toolboxLabel: "Herramientas y educación",
    toolboxTitle: "Experiencia práctica donde vive la evidencia.",
    toolGroups: [
      ["Pruebas", "Manual · Funcional · Regresión · Exploratoria · Integración · E2E · UAT · Móvil"],
      ["API y datos", "Postman · APIs REST · JSON · SQL · Chrome DevTools · curl · Linux CLI"],
      ["Entrega", "Playwright · JavaScript · Git · GitHub Actions · Jenkins · Jira · Xray · Zephyr"],
    ],
    education: "Ingeniería de Sistemas de Computación · Universidad APEC (UNAPEC)",
    languages: "Español - Nativo · Inglés - Dominio profesional completo",
    contactLabel: "Trabajemos juntos",
    contactTitle: "Construyamos software confiable.",
    contactText:
      "Estoy disponible para oportunidades remotas de QA Senior y Mid-level en Estados Unidos, LATAM y Europa.",
    email: "Iniciar una conversación",
    linkedin: "LinkedIn",
    github: "GitHub",
    footer: "Diseñado alrededor de evidencia, claridad y calidad.",
    backToTop: "Volver arriba",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeSection, setActiveSection] = useState("");
  const [expandedExpertise, setExpandedExpertise] = useState<number | null>(null);
  const t = copy[language];

  useEffect(() => {
    let savedLanguage: string | null = null;

    try {
      savedLanguage = window.localStorage.getItem("portfolio-language");
    } catch {
      return;
    }

    if (savedLanguage === "en" || savedLanguage === "es") {
      const frame = window.requestAnimationFrame(() => setLanguage(savedLanguage));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const sections = ["expertise", "experience", "work", "qa-lab", "toolbox", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-intro, .expertise-item, .job, .project-row, .lab-copy, .terminal, .tool-list article, .education-row",
      ),
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.classList.add("motion-ready");
    revealItems.forEach((item) => item.classList.add("reveal-item"));

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const revealObserver = reduceMotion
      ? null
      : new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 },
        );

    revealItems.forEach((item) => revealObserver?.observe(item));

    const navigationObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => navigationObserver.observe(section));

    return () => {
      revealObserver?.disconnect();
      navigationObserver.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => {
      const nextLanguage = currentLanguage === "en" ? "es" : "en";

      try {
        window.localStorage.setItem("portfolio-language", nextLanguage);
      } catch {
        // The language switch still works when storage is unavailable.
      }

      return nextLanguage;
    });
  };

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    const header = document.querySelector<HTMLElement>(".site-header");

    if (!target || !header) return;

    event.preventDefault();
    const targetTop = window.scrollY + target.getBoundingClientRect().top;
    const headerHeight = header.getBoundingClientRect().height;
    const sectionId = href.slice(1);

    setActiveSection(sectionId);
    window.history.pushState(null, "", href);
    window.scrollTo({
      top: Math.max(0, targetTop - headerHeight - 8),
      behavior: "smooth",
    });
  };

  return (
    <main id="content" className="site-shell">
      <a className="skip-link" href="#intro">
        {t.skip}
      </a>

      <header className="site-header">
        <a className="brand" href="#intro" aria-label="Joaquín Gañán - home">
          JG
        </a>

        <nav className="site-nav" aria-label={t.navLabel}>
          {t.nav.map(([label, href]) => (
            <a
              href={href}
              key={href}
              className={activeSection === href.slice(1) ? "is-active" : undefined}
              aria-current={activeSection === href.slice(1) ? "location" : undefined}
              onClick={(event) => navigateToSection(event, href)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <Button
            type="button"
            variant="ghost"
            className="language-button"
            onClick={toggleLanguage}
            aria-label={t.language}
          >
            <Languages aria-hidden="true" />
            <span>{language.toUpperCase()}</span>
          </Button>
          <a
            className="resume-link"
            href={language === "es" ? "/joaquin-ganan-resume-es.pdf" : "/joaquin-ganan-resume-en.pdf"}
            download
            aria-label={t.resume}
          >
            <Download aria-hidden="true" />
            <span className="resume-label-full">{t.resume}</span>
            <span className="resume-label-short" aria-hidden="true">{t.resumeShort}</span>
          </a>
        </div>
      </header>

      <section id="intro" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="availability-row">
            <span className="availability">
              <i aria-hidden="true" />
              {t.availability}
            </span>
            <span className="location">
              <MapPin aria-hidden="true" />
              {t.location}
            </span>
          </div>

          <p className="eyebrow">{t.eyebrow}</p>
          <p className="hero-name">Joaquín Gañán</p>
          <p className="hero-role">{t.role}</p>
          <h1 id="hero-title">{t.headline}</h1>
          <p className="hero-intro">{t.intro}</p>

          <div className="hero-actions">
            <a className="primary-link" href="#work">
              {t.explore}
              <ArrowDown aria-hidden="true" />
            </a>
            <a className="text-link" href="#contact">
              {t.contact}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="portrait-frame">
          <Image
            src="/joaquin-ganan-profile.jpeg"
            alt={t.portrait}
            width={1122}
            height={1402}
            sizes="(max-width: 820px) calc(100vw - 2rem), 38vw"
            priority
          />
        </div>
      </section>

      <section id="impact" className="metric-row" aria-labelledby="impact-context-title">
        <div className="metric-context">
          <p className="section-label">{t.impactLabel}</p>
          <p id="impact-context-title">{t.impactScope}</p>
        </div>
        <div className="metric-marquee">
          <div className="metric-track">
            {[false, true].map((isDuplicate) => (
              <div className="metric-set" aria-hidden={isDuplicate || undefined} key={String(isDuplicate)}>
                {t.metrics.map(([value, label], index) => {
                  const MetricIcon = metricIcons[index];

                  return (
                    <article
                      className={`metric${index === metricIcons.length - 1 ? " metric-long" : ""}`}
                      key={`${value}-${label}`}
                    >
                      <MetricIcon aria-hidden="true" />
                      <div>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="content-section expertise-section">
        <SectionIntro label={t.expertiseLabel} title={t.expertiseTitle} />
        <div className="expertise-grid">
          {t.expertise.map((item, index) => {
            const isExpanded = expandedExpertise === index;
            const detailId = `expertise-detail-${index}`;

            return (
            <article className={`expertise-item${isExpanded ? " is-expanded" : ""}`} key={item.title}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={detailId}
                  onClick={() => setExpandedExpertise(isExpanded ? null : index)}
                >
                  <span>{item.title}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
              </h3>
              <p>{item.text}</p>
              <div className="expertise-detail" id={detailId} aria-hidden={!isExpanded}>
                <small>{item.detail}</small>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="content-section experience-section">
        <SectionIntro label={t.experienceLabel} title={t.experienceTitle} />
        <div className="timeline">
          {t.experience.map((job) => (
            <article className="job" key={`${job.company}-${job.dates}`}>
              <span className="job-dates">{job.dates}</span>
              <div className="job-title">
                <h3>{job.title}</h3>
                <strong>{job.company}</strong>
              </div>
              <p>{job.text}</p>
            </article>
          ))}
        </div>
        <p className="earlier-role">{t.earlier}</p>
      </section>

      <section id="work" className="content-section work-section">
        <SectionIntro label={t.workLabel} title={t.workTitle} />
        <div className="project-list">
          {t.projects.map((project, index) => (
            <article className="project-row" key={project.title}>
              <div>
                <div className="project-heading">
                  <span className="project-number" aria-hidden="true">0{index + 1}</span>
                  <p className="project-type">{index === 0 ? t.featured : t.confidential}</p>
                </div>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
              </div>
              <div className="project-meta">
                <span>{project.meta}</span>
                {index === 0 ? (
                  <a
                    href="https://github.com/joaquinganan/m4pp-sqe"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.repository}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ) : (
                  <span className="project-status">
                    <i aria-hidden="true" />
                    {t.caseStatus}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="qa-lab" className="lab-section" aria-labelledby="lab-title">
        <div className="lab-copy">
          <div className="lab-heading-row">
            <p className="section-label">{t.labLabel}</p>
            <span className="status-badge">
              <i aria-hidden="true" />
              {t.labStatus}
            </span>
          </div>
          <h2 id="lab-title">{t.labTitle}</h2>
          <p className="lab-intro">{t.labIntro}</p>

          <div className="lab-summary">
            <span>{t.latestRunTitle}</span>
            <strong>{t.latestRunText}</strong>
          </div>

          <div className="lab-actions">
            <a
              className="primary-link"
              href="https://github.com/joaquinganan/portfolio-e2e-automation"
              target="_blank"
              rel="noreferrer"
            >
              {t.suiteLink}
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              className="text-link"
              href="https://github.com/joaquinganan/portfolio-e2e-automation/actions"
              target="_blank"
              rel="noreferrer"
            >
              {t.runsLink}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="terminal" role="img" aria-label={t.terminalLabel}>
          <div className="terminal-bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <pre>{`$ npm run test:prod

${t.terminalChecks.join("\n")}

${t.terminalStatus}`}</pre>
        </div>
      </section>

      <section id="toolbox" className="content-section toolbox-section">
        <SectionIntro label={t.toolboxLabel} title={t.toolboxTitle} />
        <div className="tool-list">
          {t.toolGroups.map(([title, items]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{items}</p>
            </article>
          ))}
        </div>
        <div className="education-row">
          <p>{t.education}</p>
          <p>{t.languages}</p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <p className="contact-label">{t.contactLabel}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
        </div>
        <div className="contact-links">
          <a className="contact-primary" href="mailto:joaquinganan95@gmail.com">
            <Mail aria-hidden="true" />
            {t.email}
          </a>
          <a href="https://www.linkedin.com/in/joaquinganan95" target="_blank" rel="noreferrer">
            {t.linkedin}
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="https://github.com/joaquinganan" target="_blank" rel="noreferrer">
            {t.github}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <span>JG</span>
        <p>© 2026 Joaquín Gañán. {t.footer}</p>
        <a href="#intro">
          {t.backToTop}
          <ArrowUp aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}

const metricIcons = [AppWindow, Users, CalendarCheck, GraduationCap, Globe2, Workflow, Network];

function SectionIntro({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="section-intro">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
    </div>
  );
}
