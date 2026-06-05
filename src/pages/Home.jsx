import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Database, GraduationCap, MapPin, Plane, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ui/ProjectCard.jsx';
import TimelineItem from '../components/ui/TimelineItem.jsx';
import normanProfile from '../assets/images/norman-profile.jpeg';
import { featuredProjects } from '../data/projects.js';
import { timelineEvents } from '../data/timeline.js';

const introText =
  'Soy estudiante de Ciencias de la Computación apasionado por el desarrollo de aplicaciones web, sistemas de servidor y soluciones basadas en bases de datos. Disfruto transformar ideas en software funcional mientras continúo aprendiendo nuevas tecnologías, herramientas y buenas prácticas de desarrollo.';

const terminalLines = [
  'Building Web Applications',
  'Designing Database Systems',
  'Learning Every Day',
];

const aboutCards = [
  { label: 'Location', value: 'Guatemala, Guatemala', icon: MapPin },
  { label: 'Education', value: 'Computer Science at UVG', icon: GraduationCap },
  { label: 'Focus', value: 'Interface, Server and Database', icon: Database },
  { label: 'Goal', value: 'Study Abroad and Learn Always', icon: Plane },
];

const skillGroups = [
  {
    category: 'Interfaz',
    skills: [
      { name: 'React', segments: 7 },
      { name: 'JavaScript', segments: 8 },
      { name: 'HTML', segments: 9 },
      { name: 'CSS', segments: 8 },
      { name: 'Tailwind CSS', segments: 7 },
    ],
  },
  {
    category: 'Servidor',
    skills: [
      { name: 'Node.js', segments: 7 },
      { name: 'Express', segments: 7 },
      { name: 'Go', segments: 6 },
      { name: 'PHP', segments: 6 },
    ],
  },
  {
    category: 'Bases de Datos',
    skills: [
      { name: 'PostgreSQL', segments: 8 },
      { name: 'MySQL', segments: 8 },
      { name: 'SQL Server', segments: 7 },
      { name: 'SQLite', segments: 7 },
      { name: 'Prisma', segments: 6 },
    ],
  },
  {
    category: 'Lenguajes',
    skills: [
      { name: 'Java', segments: 6 },
      { name: 'Python', segments: 10 },
      { name: 'JavaScript', segments: 8 },
      { name: 'Go', segments: 6 },
      { name: 'PHP', segments: 6 },
      { name: 'C++', segments: 5 },
    ],
  },
  {
    category: 'Nube y Herramientas',
    skills: [
      { name: 'AWS', segments: 5 },
      { name: 'Cloudflare R2', segments: 5 },
      { name: 'Docker', segments: 6 },
      { name: 'Git', segments: 8 },
      { name: 'GitHub', segments: 8 },
      { name: 'Linux', segments: 7 },
    ],
  },
];

const skillGroupDetails = {
  Interfaz:
    'Herramientas que utilizo para construir interfaces modernas, responsivas y enfocadas en la experiencia del usuario.',
  Servidor:
    'Tecnologías que me ayudan a estructurar lógica de negocio, rutas, servicios y fundamentos de aplicaciones de servidor.',
  'Bases de Datos':
    'Sistemas y herramientas que he usado para modelar información, consultar datos y construir persistencia para aplicaciones.',
  Lenguajes:
    'Lenguajes que forman la base de mi trabajo actual, desde fundamentos académicos hasta desarrollo web y lógica de servidor.',
  'Nube y Herramientas':
    'Herramientas de despliegue, control de versiones, contenedores y entorno técnico para trabajar proyectos de software.',
};

const skillDescriptions = {
  React: 'Componentes reutilizables, estado, rutas y construcción de interfaces dinámicas.',
  JavaScript: 'Interactividad web, manejo de datos en cliente y lógica para aplicaciones modernas.',
  HTML: 'Estructura semántica, accesibilidad base y organización del contenido.',
  CSS: 'Estilos responsivos, layouts, efectos visuales y adaptación a diferentes pantallas.',
  'Tailwind CSS': 'Sistema utilitario para crear interfaces consistentes y rápidas de iterar.',
  'Node.js': 'Fundamentos de servidor, ejecución de JavaScript y estructura de APIs.',
  Express: 'Rutas, middlewares y organización de endpoints para aplicaciones de servidor.',
  Go: 'Servicios backend, manejo de rutas y construcción de lógica de servidor.',
  PHP: 'Desarrollo web del lado del servidor y fundamentos de aplicaciones dinámicas.',
  PostgreSQL: 'Modelado relacional, consultas SQL y gestión de datos estructurados.',
  MySQL: 'Consultas, relaciones y administración de información en proyectos académicos.',
  'SQL Server': 'Bases de datos relacionales, consultas y comprensión de sistemas empresariales.',
  SQLite: 'Persistencia ligera para prototipos, proyectos locales y aplicaciones de pila completa.',
  Prisma: 'Modelado de datos, acceso tipado y organización de consultas desde la aplicación.',
  Java: 'Programación orientada a objetos, modelado de clases y proyectos académicos.',
  Python: 'Fundamentos de programación, automatización, lógica y aprendizaje constante.',
  'C++': 'Estructuras, lógica de bajo nivel y comprensión de fundamentos computacionales.',
  AWS: 'Conceptos de nube, despliegue y servicios base para aplicaciones modernas.',
  'Cloudflare R2': 'Almacenamiento compatible con objetos y recursos para proyectos web.',
  Docker: 'Contenedores, entornos reproducibles y preparación de servicios.',
  Git: 'Control de versiones, historial de cambios y trabajo ordenado en proyectos.',
  GitHub: 'Repositorios, colaboración, documentación y publicación de código.',
  Linux: 'Uso de terminal, comandos base y entorno de desarrollo para servidores.',
};

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const timers = terminalLines.map((line, index) =>
      window.setTimeout(() => {
        setVisibleLines((current) => [...current, line]);
      }, 500 + index * 700),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-border-cyber/70 bg-surface/65 shadow-[0_0_40px_rgba(0,220,229,0.08)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-border-cyber/60 bg-surface-high/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary-cyan/80" />
        <span className="ml-2 font-mono text-xs text-muted-text">norman.dev</span>
      </div>

      <div className="min-h-36 px-4 py-5 font-mono text-sm text-muted-text">
        {visibleLines.map((line) => (
          <motion.p
            key={line}
            className="mb-3 flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <span className="text-primary-cyan-bright">&gt;</span>
            <span>{line}</span>
          </motion.p>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse bg-primary-cyan-bright" />
      </div>
    </div>
  );
}

function ProfilePhoto() {
  return (
    <motion.div
      className="group relative mx-auto flex aspect-[4/5] w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-border-cyber/80 bg-surface/55 p-5 shadow-[0_0_70px_rgba(0,220,229,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary-cyan/80 hover:shadow-[0_0_90px_rgba(0,220,229,0.22)]"
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="absolute inset-4 rounded-lg border border-primary-cyan/15 bg-surface-high/35" />
      <img
        src={normanProfile}
        alt="Foto principal de Norman Aguirre"
        className="relative h-full w-full rounded-lg border border-primary-cyan/35 object-cover object-center"
      />
      <div className="absolute -inset-px rounded-xl opacity-0 ring-1 ring-primary-cyan/40 transition duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}

function SectionShell({ children, className = '' }) {
  return (
    <motion.section
      className={className}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

function SegmentedBar({ count }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          className={`h-2 flex-1 rounded-sm ${
            index < count ? 'bg-primary-cyan shadow-[0_0_10px_rgba(0,220,229,0.45)]' : 'bg-surface-highest'
          }`}
        />
      ))}
    </div>
  );
}

function SkillsCard({ group }) {
  return (
    <article className="rounded-lg border border-border-cyber/70 bg-surface/60 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary-cyan/70 hover:bg-surface-high/65">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-text">{group.category}</h3>
        <Sparkles size={18} className="text-primary-cyan-bright" />
      </div>

      <div className="space-y-4">
        {group.skills.map((skill) => (
          <div key={`${group.category}-${skill.name}`} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-muted-text">{skill.name}</span>
            </div>
            <SegmentedBar count={skill.segments} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={`${group.category}-chip-${skill.name}`}
            className="rounded-md border border-border-cyber/70 bg-background/50 px-2.5 py-1 font-mono text-xs text-muted-text"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </article>
  );
}

function LanguageShowcase({ group }) {
  return (
    <motion.article
      className="grid gap-6 rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl transition duration-300 hover:border-primary-cyan/70 hover:bg-surface-high/60 lg:grid-cols-[0.8fr_1.2fr] lg:p-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="space-y-5">
        <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
          Perfil técnico
        </p>
        <h3 className="text-3xl font-bold text-text">Lenguajes de Programación</h3>
        <p className="text-base leading-8 text-muted-text">
          Estos lenguajes forman la base de mi trabajo actual. Los porcentajes son una referencia
          visual de familiaridad práctica, tomando como punto de partida proyectos académicos,
          desarrollo web, lógica de servidor y aprendizaje personal.
        </p>

        <div className="rounded-lg border border-border-cyber/70 bg-background/45 p-4">
          <p className="font-mono text-xs uppercase text-primary-cyan-bright">
            enfoque_actual.json
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {group.skills.map((skill) => (
              <span
                key={`lenguaje-chip-${skill.name}`}
                className="rounded-md border border-border-cyber/70 bg-surface-high/45 px-3 py-2 font-mono text-xs text-muted-text"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border-cyber/70 bg-background/45 p-5 shadow-[0_0_42px_rgba(0,220,229,0.08)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="font-mono text-xs font-semibold uppercase text-primary-cyan-bright">
            lenguajes_matrix.json
          </p>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-primary-cyan" />
            <span className="h-2 w-2 rounded-full bg-primary-cyan/55" />
            <span className="h-2 w-2 rounded-full bg-primary-cyan/25" />
          </div>
        </div>

        <div className="space-y-5">
          {group.skills.map((skill) => {
            const percentage = skill.segments * 10;

            return (
              <div key={`lenguaje-row-${skill.name}`} className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm font-semibold text-text">{skill.name}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-text">
                      {languageDescriptions[skill.name]}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-semibold text-primary-cyan-bright">
                    {percentage}%
                  </span>
                </div>
                <div className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <span
                      key={`${skill.name}-${index}`}
                      className={`h-2 flex-1 rounded-sm ${
                        index < skill.segments
                          ? 'bg-primary-cyan shadow-[0_0_10px_rgba(0,220,229,0.45)]'
                          : 'bg-surface-highest'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}

function getSkillRangeLabel(segments) {
  if (segments <= 2) {
    return '0-25% · En exploración';
  }

  if (segments <= 5) {
    return '25-50% · Lo he utilizado en proyectos puntuales';
  }

  if (segments <= 7) {
    return '50-75% · Lo he utilizado bastante';
  }

  return '75-100% · Uso avanzado';
}

function SkillSegments({ count, name }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={`${name}-${index}`}
          className={`h-2 flex-1 rounded-sm ${
            index < count
              ? 'bg-primary-cyan shadow-[0_0_10px_rgba(0,220,229,0.45)]'
              : 'bg-surface-highest'
          }`}
        />
      ))}
    </div>
  );
}

function SkillsCarousel({ groups }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = groups[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % groups.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [groups.length]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? groups.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % groups.length);
  };

  return (
    <motion.article
      className="overflow-hidden rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl transition duration-300 hover:border-primary-cyan/70 hover:bg-surface-high/60 lg:p-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-background/45 text-primary-cyan-bright">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="font-mono text-xs font-medium uppercase text-primary-cyan-bright">
              Carrusel técnico
            </p>
            <p className="text-sm text-muted-text">
              Cambia automáticamente para mostrar cada área de habilidades.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border border-border-cyber bg-surface-high/65 px-3 py-2 font-mono text-xs text-muted-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
            onClick={goToPrevious}
          >
            Anterior
          </button>
          <button
            type="button"
            className="rounded-md border border-border-cyber bg-surface-high/65 px-3 py-2 font-mono text-xs text-muted-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
            onClick={goToNext}
          >
            Siguiente
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup.category}
          className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="space-y-5">
            <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
              Perfil técnico
            </p>
            <h3 className="text-3xl font-bold text-text">{activeGroup.category}</h3>
            <p className="text-base leading-8 text-muted-text">
              {skillGroupDetails[activeGroup.category]}
            </p>

            <div className="rounded-lg border border-border-cyber/70 bg-background/45 p-4">
              <p className="font-mono text-xs uppercase text-primary-cyan-bright">
                enfoque_actual.json
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {activeGroup.skills.map((skill) => (
                  <span
                    key={`${activeGroup.category}-chip-${skill.name}`}
                    className="rounded-md border border-border-cyber/70 bg-surface-high/45 px-3 py-2 font-mono text-xs text-muted-text"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border-cyber/70 bg-background/45 p-5 shadow-[0_0_42px_rgba(0,220,229,0.08)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-mono text-xs font-semibold uppercase text-primary-cyan-bright">
                habilidades_matrix.json
              </p>
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-primary-cyan" />
                <span className="h-2 w-2 rounded-full bg-primary-cyan/55" />
                <span className="h-2 w-2 rounded-full bg-primary-cyan/25" />
              </div>
            </div>

            <div className="space-y-5">
              {activeGroup.skills.map((skill) => (
                <div key={`${activeGroup.category}-row-${skill.name}`} className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm font-semibold text-text">{skill.name}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-text">
                        {skillDescriptions[skill.name]}
                      </p>
                    </div>
                    <span className="max-w-36 text-right font-mono text-xs font-semibold leading-5 text-primary-cyan-bright">
                      {getSkillRangeLabel(skill.segments)}
                    </span>
                  </div>
                  <SkillSegments count={skill.segments} name={`${activeGroup.category}-${skill.name}`} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-center gap-2">
        {groups.map((group, index) => (
          <button
            key={`skill-dot-${group.category}`}
            type="button"
            className={`h-2.5 rounded-full transition-all duration-200 ${
              activeIndex === index
                ? 'w-8 bg-primary-cyan'
                : 'w-2.5 bg-surface-highest hover:bg-primary-cyan/60'
            }`}
            aria-label={`Mostrar ${group.category}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </motion.article>
  );
}

function CleanSkillsCarousel({ groups }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = groups[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % groups.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [groups.length]);

  return (
    <motion.article
      className="overflow-hidden rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl transition duration-300 hover:border-primary-cyan/70 hover:bg-surface-high/60 lg:p-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup.category}
          className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="space-y-5">
            <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
              Perfil técnico
            </p>
            <h3 className="text-3xl font-bold text-text">{activeGroup.category}</h3>
            <p className="text-base leading-8 text-muted-text">
              {skillGroupDetails[activeGroup.category]}
            </p>

            <div className="rounded-lg border border-border-cyber/70 bg-background/45 p-4">
              <p className="font-mono text-xs uppercase text-primary-cyan-bright">
                enfoque_actual.json
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {activeGroup.skills.map((skill) => (
                  <span
                    key={`${activeGroup.category}-clean-chip-${skill.name}`}
                    className="rounded-md border border-border-cyber/70 bg-surface-high/45 px-3 py-2 font-mono text-xs text-muted-text"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border-cyber/70 bg-background/45 p-5 shadow-[0_0_42px_rgba(0,220,229,0.08)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-mono text-xs font-semibold uppercase text-primary-cyan-bright">
                habilidades_matrix.json
              </p>
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-primary-cyan" />
                <span className="h-2 w-2 rounded-full bg-primary-cyan/55" />
                <span className="h-2 w-2 rounded-full bg-primary-cyan/25" />
              </div>
            </div>

            <div className="space-y-5">
              {activeGroup.skills.map((skill) => (
                <div key={`${activeGroup.category}-clean-row-${skill.name}`} className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm font-semibold text-text">{skill.name}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-text">
                        {skillDescriptions[skill.name]}
                      </p>
                    </div>
                    <span className="max-w-36 text-right font-mono text-xs font-semibold leading-5 text-primary-cyan-bright">
                      {getSkillRangeLabel(skill.segments)}
                    </span>
                  </div>
                  <SkillSegments
                    count={skill.segments}
                    name={`${activeGroup.category}-clean-${skill.name}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-center gap-2">
        {groups.map((group, index) => (
          <button
            key={`clean-skill-dot-${group.category}`}
            type="button"
            className={`h-2.5 rounded-full transition-all duration-200 ${
              activeIndex === index
                ? 'w-8 bg-primary-cyan'
                : 'w-2.5 bg-surface-highest hover:bg-primary-cyan/60'
            }`}
            aria-label={`Mostrar ${group.category}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </motion.article>
  );
}

export default function Home() {
  return (
    <div className="w-full space-y-24">
      <SectionShell className="grid min-h-[calc(100vh-12rem)] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
              Junior Full Stack Developer
            </p>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold leading-tight text-text sm:text-6xl lg:text-7xl">
                Norman Aguirre
              </h1>
              <p className="text-xl font-semibold text-primary-cyan sm:text-2xl">
                Estudiante de Ingeniería en Ciencias de la Computación
              </p>
            </div>
            <p className="max-w-2xl text-base leading-8 text-muted-text sm:text-lg">{introText}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-200 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_rgba(0,220,229,0.26)]"
            >
              Explorar Proyectos
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md border border-border-cyber bg-surface-high/65 px-5 py-3 text-sm font-semibold text-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
            >
              Escríbeme
            </Link>
          </div>

          <TerminalCard />
        </div>

        <ProfilePhoto />
      </SectionShell>

      <SectionShell className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">Perfil</p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">Sobre Mí</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl sm:p-8">
            <div className="space-y-5 text-base leading-8 text-muted-text">
              <p>{introText}</p>
              <p>
                Mi objetivo es seguir creciendo como desarrollador, ampliar mis conocimientos en
                ingeniería de software y continuar mi formación académica en el extranjero. Creo en
                el aprendizaje constante, la curiosidad tecnológica y la mejora continua como
                pilares fundamentales para construir soluciones que generen un impacto real.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCards.map(({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="rounded-lg border border-border-cyber/70 bg-surface/60 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary-cyan/70 hover:bg-surface-high/70"
              >
                <Icon size={20} className="mb-5 text-primary-cyan-bright" />
                <p className="font-mono text-xs uppercase text-muted-text">{label}</p>
                <p className="mt-2 text-lg font-semibold text-text">{value}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
            Matriz de Habilidades
          </p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">Habilidades Técnicas</h2>
        </div>

        <CleanSkillsCarousel groups={skillGroups} />
      </SectionShell>

      <SectionShell className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
            Proyectos propios
          </p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">Proyectos Destacados</h2>
          <p className="text-base leading-8 text-muted-text">
            Una selección de proyectos que reflejan mi experiencia en desarrollo web, bases de
            datos y construcción de software.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-200 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_rgba(0,220,229,0.26)]"
          >
            Ver Todos los Proyectos
            <ArrowRight size={17} />
          </Link>
        </div>
      </SectionShell>

      <SectionShell className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
            Trayectoria
          </p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">Mi Trayectoria</h2>
          <p className="text-base leading-8 text-muted-text">
            Algunos de los momentos más importantes de mi formación académica y crecimiento
            profesional.
          </p>
        </div>

        <div className="relative space-y-6 pl-7 md:space-y-8 md:pl-0">
          <div className="absolute left-1.5 top-0 h-full w-px bg-border-cyber md:left-1/2" />
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.year} event={event} index={index} />
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
