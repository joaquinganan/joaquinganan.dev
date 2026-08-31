"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Download,
  GitBranch,
  GraduationCap,
  ContactRound,
  Mail,
  MapPin,
  Network,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Language = "en" | "es";

const pillarIcons = [ShieldCheck, Network, Code2] as const;

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
    availability: "Open to remote opportunities",
    location: "Santo Domingo · UTC-4",
    eyebrow: "Quality across complex systems",
    headline: "I turn release risk into confident decisions.",
    intro:
      "Senior QA Engineer with 6+ years of experience leading quality across enterprise programs, web and mobile products, REST APIs, and interconnected backend systems.",
    contact: "Let’s talk",
    resume: "Download résumé",
    explore: "Explore my work",
    language: "Cambiar a español",
    portrait: "Portrait of Joaquín Gañán",
    signalLabel: "Release signal",
    signalValue: "Ready to ship",
    impactKicker: "Selected impact",
    metrics: [
      ["20+", "integrated applications led per program"],
      ["100+", "cross-functional stakeholders coordinated"],
      ["36+", "release validations supported per year"],
      ["5", "QA Project Managers mentored"],
    ],
    expertiseKicker: "How I create confidence",
    expertiseTitle: "Quality, from the first question to production.",
    expertiseIntro:
      "I connect business risk, technical evidence, and delivery context so teams know what to test, what to fix, and when a release is truly ready.",
    pillars: [
      {
        number: "01",
        title: "Test strategy & leadership",
        text: "Full STLC ownership across planning, estimation, risk assessment, execution, defect triage, UAT/IST, and release sign-off.",
        tags: ["STLC", "Risk-based QA", "UAT", "Mentoring"],
      },
      {
        number: "02",
        title: "API, backend & integration",
        text: "REST API validation with Postman, SQL data checks, and end-to-end coverage across legacy and modern interconnected applications.",
        tags: ["Postman", "REST", "SQL", "E2E"],
      },
      {
        number: "03",
        title: "Automation that supports delivery",
        text: "Pragmatic Playwright regression coverage and CI/CD quality practices that complement—not replace—thoughtful exploratory testing.",
        tags: ["Playwright", "JavaScript", "CI/CD", "GitHub Actions"],
      },
    ],
    experienceKicker: "Experience",
    experienceTitle: "Enterprise-scale QA with hands-on depth.",
    experienceIntro:
      "My work spans day-to-day test execution, technical validation, quality governance, and cross-functional leadership.",
    experience: [
      {
        dates: "2024 — 2026",
        title: "Software Testing Analyst",
        company: "Thryv Dominicana",
        summary:
          "Quality ownership for integrated web applications serving thousands of users across bi-weekly sprint releases.",
        bullets: [
          "Designed and executed functional, regression, smoke, exploratory, API, backend, and accessibility tests.",
          "Maintained Playwright suites and partnered with engineering and product teams on release readiness.",
        ],
      },
      {
        dates: "Aug 2019 — 2024",
        title: "QA Program Lead / QA Project Manager",
        company: "Newtech SRL · Verizon contractor",
        summary:
          "Led QA for business-critical telecommunications programs spanning 20+ integrated applications.",
        bullets: [
          "Directed teams of 6–10 QA analysts and coordinated UAT, IST, and production validation with 100+ stakeholders.",
          "Mentored 5 QA Project Managers, triaged 200+ defects, and supported 36+ releases per year.",
        ],
      },
      {
        dates: "Sep 2021 — Sep 2023",
        title: "Software QA Analyst",
        company: "Applaudo Studios",
        summary:
          "Manual QA across distributed Agile teams delivering web and mobile applications.",
        bullets: [
          "Created test scenarios and execution plans aligned to user stories and acceptance criteria.",
          "Performed functional, regression, exploratory, mobile, and release validation while supporting automated suites.",
        ],
      },
    ],
    earlier:
      "Earlier: Supervisor & Quality Analyst at Visionary Solutions FTZ · 2017 — 2019",
    workKicker: "Selected work",
    workTitle: "Evidence over buzzwords.",
    workIntro:
      "Public code and concise case snapshots show how I think about coverage, risk, and maintainable quality.",
    repository: "View repository",
    featured: "Featured project",
    confidential: "Anonymized case snapshot",
    projects: [
      {
        title: "M4PP Playwright Automation Suite",
        text: "An end-to-end and API test suite for critical user journeys, authentication, interactive canvas behavior, access control, and backend integrations—organized for scalable, CI-ready execution.",
        tags: ["Playwright", "JavaScript", "POM", "API", "E2E"],
      },
      {
        title: "Integrated Release Assurance",
        text: "A risk-led QA operating model for a Verizon program: mapped dependencies across 20+ applications, coordinated 100+ stakeholders, and turned test evidence into go/no-go recommendations.",
        tags: ["Enterprise QA", "Integration", "UAT", "Release governance"],
      },
    ],
    toolboxKicker: "Toolbox",
    toolboxTitle: "Hands-on where the evidence lives.",
    toolGroups: [
      {
        title: "Testing expertise",
        items: [
          "Manual",
          "Functional",
          "Regression",
          "Exploratory",
          "Integration",
          "E2E",
          "UAT",
          "Mobile",
          "Cross-browser",
        ],
      },
      {
        title: "API, backend & data",
        items: ["Postman", "REST APIs", "JSON", "SQL", "Chrome DevTools", "curl", "Linux CLI"],
      },
      {
        title: "Automation & delivery",
        items: [
          "Playwright",
          "JavaScript",
          "Git",
          "GitHub Actions",
          "Jenkins",
          "Jira",
          "Xray",
          "Zephyr",
        ],
      },
    ],
    credentialsTitle: "Credentials & education",
    credentials: [
      "Scrum Foundation Professional Certificate",
      "CCNA 1",
      "Playwright JS/TS Automation Testing",
      "Postman & API Testing",
      "DevOps & CI/CD",
    ],
    degree: "B.S. Computer Systems Engineering",
    university: "Universidad APEC (UNAPEC) · Santo Domingo, DR",
    languages: "Spanish — Native · English — Full professional proficiency",
    contactKicker: "Let’s work together",
    contactTitle: "Need someone who can find the risk—and explain what it means?",
    contactText:
      "I’m open to remote Senior and Mid-level QA opportunities across the US, LATAM, and Europe.",
    email: "Email me",
    linkedin: "LinkedIn",
    github: "GitHub",
    footer: "Designed around evidence, clarity, and quality.",
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
    availability: "Disponible para oportunidades remotas",
    location: "Santo Domingo · UTC-4",
    eyebrow: "Calidad en sistemas complejos",
    headline: "Convierto el riesgo de cada release en decisiones seguras.",
    intro:
      "Ingeniero QA Senior con más de 6 años liderando la calidad en programas empresariales, productos web y móviles, APIs REST y sistemas backend interconectados.",
    contact: "Hablemos",
    resume: "Descargar CV",
    explore: "Explorar mi trabajo",
    language: "Switch to English",
    portrait: "Retrato de Joaquín Gañán",
    signalLabel: "Señal de release",
    signalValue: "Listo para producción",
    impactKicker: "Impacto destacado",
    metrics: [
      ["20+", "aplicaciones integradas lideradas por programa"],
      ["100+", "stakeholders multifuncionales coordinados"],
      ["36+", "validaciones de releases apoyadas al año"],
      ["5", "QA Project Managers mentoreados"],
    ],
    expertiseKicker: "Cómo genero confianza",
    expertiseTitle: "Calidad, desde la primera pregunta hasta producción.",
    expertiseIntro:
      "Conecto el riesgo de negocio, la evidencia técnica y el contexto de entrega para que los equipos sepan qué probar, qué corregir y cuándo un release está realmente listo.",
    pillars: [
      {
        number: "01",
        title: "Estrategia y liderazgo de pruebas",
        text: "Responsabilidad completa del STLC: planificación, estimación, evaluación de riesgos, ejecución, triaje de defectos, UAT/IST y aprobación del release.",
        tags: ["STLC", "QA por riesgo", "UAT", "Mentoría"],
      },
      {
        number: "02",
        title: "API, backend e integración",
        text: "Validación de APIs REST con Postman, comprobaciones de datos con SQL y cobertura end-to-end entre aplicaciones modernas y legacy interconectadas.",
        tags: ["Postman", "REST", "SQL", "E2E"],
      },
      {
        number: "03",
        title: "Automatización al servicio de la entrega",
        text: "Cobertura de regresión pragmática con Playwright y prácticas de calidad en CI/CD que complementan—no sustituyen—las pruebas exploratorias.",
        tags: ["Playwright", "JavaScript", "CI/CD", "GitHub Actions"],
      },
    ],
    experienceKicker: "Experiencia",
    experienceTitle: "QA a escala empresarial con profundidad práctica.",
    experienceIntro:
      "Mi trabajo abarca ejecución diaria de pruebas, validación técnica, gobernanza de calidad y liderazgo multifuncional.",
    experience: [
      {
        dates: "2024 — 2026",
        title: "Software Testing Analyst",
        company: "Thryv Dominicana",
        summary:
          "Responsabilidad de calidad para aplicaciones web integradas que sirven a miles de usuarios en releases quincenales.",
        bullets: [
          "Diseñé y ejecuté pruebas funcionales, regresión, smoke, exploratorias, API, backend y accesibilidad.",
          "Mantuve suites de Playwright y colaboré con ingeniería y producto en la preparación de releases.",
        ],
      },
      {
        dates: "Ago 2019 — 2024",
        title: "QA Program Lead / QA Project Manager",
        company: "Newtech SRL · Contratista de Verizon",
        summary:
          "Lideré QA para programas críticos de telecomunicaciones con más de 20 aplicaciones integradas.",
        bullets: [
          "Dirigí equipos de 6–10 analistas QA y coordiné UAT, IST y validación en producción con más de 100 stakeholders.",
          "Mentoreé 5 QA Project Managers, gestioné más de 200 defectos y apoyé más de 36 releases al año.",
        ],
      },
      {
        dates: "Sep 2021 — Sep 2023",
        title: "Software QA Analyst",
        company: "Applaudo Studios",
        summary:
          "QA manual en equipos Agile distribuidos para aplicaciones web y móviles.",
        bullets: [
          "Creé escenarios y planes de ejecución alineados con historias de usuario y criterios de aceptación.",
          "Realicé validaciones funcionales, de regresión, exploratorias, móviles y de release, apoyando suites automatizadas.",
        ],
      },
    ],
    earlier:
      "Experiencia anterior: Supervisor & Quality Analyst en Visionary Solutions FTZ · 2017 — 2019",
    workKicker: "Trabajo seleccionado",
    workTitle: "Evidencia antes que palabras de moda.",
    workIntro:
      "Código público y casos resumidos muestran cómo abordo la cobertura, el riesgo y la calidad sostenible.",
    repository: "Ver repositorio",
    featured: "Proyecto destacado",
    confidential: "Caso anonimizado",
    projects: [
      {
        title: "Suite de automatización Playwright para M4PP",
        text: "Suite end-to-end y de API para recorridos críticos, autenticación, canvas interactivo, control de acceso e integraciones backend, organizada para una ejecución escalable y compatible con CI.",
        tags: ["Playwright", "JavaScript", "POM", "API", "E2E"],
      },
      {
        title: "Aseguramiento de releases integrados",
        text: "Modelo QA basado en riesgos para un programa de Verizon: mapeo de dependencias entre más de 20 aplicaciones, coordinación de más de 100 stakeholders y recomendaciones go/no-go basadas en evidencia.",
        tags: ["QA empresarial", "Integración", "UAT", "Gobernanza"],
      },
    ],
    toolboxKicker: "Herramientas",
    toolboxTitle: "Experiencia práctica donde vive la evidencia.",
    toolGroups: [
      {
        title: "Especialidad en pruebas",
        items: [
          "Manual",
          "Funcional",
          "Regresión",
          "Exploratorias",
          "Integración",
          "E2E",
          "UAT",
          "Móvil",
          "Cross-browser",
        ],
      },
      {
        title: "API, backend y datos",
        items: ["Postman", "APIs REST", "JSON", "SQL", "Chrome DevTools", "curl", "Linux CLI"],
      },
      {
        title: "Automatización y entrega",
        items: [
          "Playwright",
          "JavaScript",
          "Git",
          "GitHub Actions",
          "Jenkins",
          "Jira",
          "Xray",
          "Zephyr",
        ],
      },
    ],
    credentialsTitle: "Certificaciones y educación",
    credentials: [
      "Scrum Foundation Professional Certificate",
      "CCNA 1",
      "Playwright JS/TS Automation Testing",
      "Postman & API Testing",
      "DevOps & CI/CD",
    ],
    degree: "Ingeniería de Sistemas de Computación",
    university: "Universidad APEC (UNAPEC) · Santo Domingo, RD",
    languages: "Español — Nativo · Inglés — Dominio profesional completo",
    contactKicker: "Trabajemos juntos",
    contactTitle: "¿Necesitas a alguien que encuentre el riesgo y explique lo que significa?",
    contactText:
      "Estoy disponible para oportunidades remotas de QA Senior y Mid-level en Estados Unidos, LATAM y Europa.",
    email: "Escríbeme",
    linkedin: "LinkedIn",
    github: "GitHub",
    footer: "Diseñado alrededor de evidencia, claridad y calidad.",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main id="content" className="site-shell">
      <a className="skip-link" href="#intro">
        {t.skip}
      </a>

      <header className="site-header">
        <a className="brand" href="#intro" aria-label="Joaquín Gañán — home">
          <span className="brand-mark">JG</span>
          <span className="brand-copy">
            <strong>Joaquín Gañán</strong>
            <span>{t.role}</span>
          </span>
        </a>

        <nav className="site-nav" aria-label={t.navLabel}>
          {t.nav.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <Button
            type="button"
            variant="ghost"
            className="language-button"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            aria-label={t.language}
          >
            <span aria-hidden="true">{language === "en" ? "ES" : "EN"}</span>
            <span className="language-name">{language === "en" ? "Español" : "English"}</span>
          </Button>
          <Button asChild className="header-resume">
            <a href="/joaquin-ganan-resume.pdf" download>
              <Download aria-hidden="true" />
              {t.resume}
            </a>
          </Button>
        </div>
      </header>

      <section id="intro" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="availability-row">
            <span className="availability">
              <span className="status-dot" aria-hidden="true" />
              {t.availability}
            </span>
            <span className="location">
              <MapPin aria-hidden="true" />
              {t.location}
            </span>
          </div>

          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="hero-title">{t.headline}</h1>
          <p className="hero-intro">{t.intro}</p>

          <div className="hero-actions">
            <Button asChild size="lg" className="primary-cta">
              <a href="mailto:joaquinganan95@gmail.com">
                {t.contact}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="secondary-cta">
              <a href="#impact">
                {t.explore}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="portrait-stage">
          <div className="portrait-frame">
            <img src="/joaquin-ganan-profile.jpeg" alt={t.portrait} />
            <div className="portrait-tag" aria-hidden="true">
              <span>QA</span>
              <span>01</span>
            </div>
          </div>
          <div className="signal-card" aria-hidden="true">
            <span className="signal-label">{t.signalLabel}</span>
            <span className="signal-line">
              <i />
              {t.signalValue}
            </span>
          </div>
        </div>
      </section>

      <section id="impact" className="impact" aria-labelledby="impact-title">
        <SectionKicker number="01" title={t.impactKicker} dark />
        <div className="metric-grid">
          {t.metrics.map(([value, label]) => (
            <article className="metric" key={value}>
              <strong>{value}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="expertise" className="content-section expertise-section">
        <SectionHeading
          number="02"
          kicker={t.expertiseKicker}
          title={t.expertiseTitle}
          intro={t.expertiseIntro}
        />
        <div className="pillar-grid">
          {t.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <article className="pillar-card" key={pillar.number}>
                <div className="pillar-top">
                  <span>{pillar.number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
                <div className="tag-list" aria-label={pillar.title}>
                  {pillar.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="content-section experience-section">
        <SectionHeading
          number="03"
          kicker={t.experienceKicker}
          title={t.experienceTitle}
          intro={t.experienceIntro}
        />
        <div className="timeline">
          {t.experience.map((job, index) => (
            <article className="job" key={job.company}>
              <div className="job-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="job-meta">
                <span>{job.dates}</span>
                <strong>{job.company}</strong>
              </div>
              <div className="job-detail">
                <h3>{job.title}</h3>
                <p>{job.summary}</p>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>
                      <CheckCircle2 aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="earlier-role">{t.earlier}</p>
      </section>

      <section id="work" className="work-section">
        <div className="content-section work-inner">
          <SectionHeading
            number="04"
            kicker={t.workKicker}
            title={t.workTitle}
            intro={t.workIntro}
            dark
          />
          <div className="project-grid">
            <article className="project-card project-featured">
              <div className="project-label">
                <GitBranch aria-hidden="true" />
                {t.featured}
              </div>
              <h3>{t.projects[0].title}</h3>
              <p>{t.projects[0].text}</p>
              <div className="tag-list project-tags">
                {t.projects[0].tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a
                className="project-link"
                href="https://github.com/joaquinganan/m4pp-sqe"
                target="_blank"
                rel="noreferrer"
              >
                {t.repository}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </article>

            <article className="project-card">
              <div className="project-label">
                <BriefcaseBusiness aria-hidden="true" />
                {t.confidential}
              </div>
              <h3>{t.projects[1].title}</h3>
              <p>{t.projects[1].text}</p>
              <div className="tag-list project-tags">
                {t.projects[1].tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="case-signal" aria-hidden="true">
                <span />
                <span />
                <span />
                <strong>GO</strong>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section toolbox-section">
        <SectionHeading
          number="05"
          kicker={t.toolboxKicker}
          title={t.toolboxTitle}
        />
        <div className="tool-grid">
          {t.toolGroups.map((group) => (
            <article className="tool-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="tool-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="credentials-grid">
          <article className="credentials">
            <div className="credential-icon">
              <ShieldCheck aria-hidden="true" />
            </div>
            <div>
              <h3>{t.credentialsTitle}</h3>
              <ul>
                {t.credentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
            </div>
          </article>
          <article className="education">
            <GraduationCap aria-hidden="true" />
            <div>
              <h3>{t.degree}</h3>
              <p>{t.university}</p>
              <span>{t.languages}</span>
            </div>
          </article>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <p className="contact-kicker">{t.contactKicker}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <div className="contact-links">
            <Button asChild size="lg" className="contact-primary">
              <a href="mailto:joaquinganan95@gmail.com">
                <Mail aria-hidden="true" />
                {t.email}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="contact-secondary">
              <a
                href="https://www.linkedin.com/in/joaquinganan95"
                target="_blank"
                rel="noreferrer"
              >
                <ContactRound aria-hidden="true" />
                {t.linkedin}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="contact-secondary">
              <a href="https://github.com/joaquinganan" target="_blank" rel="noreferrer">
                <GitBranch aria-hidden="true" />
                {t.github}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span className="brand-mark">JG</span>
        <p>© 2026 Joaquín Gañán. {t.footer}</p>
        <a href="#intro">
          Back to top <ArrowUpRight aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}

function SectionKicker({
  number,
  title,
  dark = false,
}: {
  number: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className={`section-kicker${dark ? " section-kicker-dark" : ""}`}>
      <span>{number}</span>
      <h2>{title}</h2>
    </div>
  );
}

function SectionHeading({
  number,
  kicker,
  title,
  intro,
  dark = false,
}: {
  number: string;
  kicker: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className={`section-heading${dark ? " section-heading-dark" : ""}`}>
      <SectionKicker number={number} title={kicker} dark={dark} />
      <div className="section-heading-copy">
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
    </div>
  );
}
