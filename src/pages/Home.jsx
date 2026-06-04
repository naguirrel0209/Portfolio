import { motion } from 'framer-motion';
import { ArrowRight, Database, GraduationCap, MapPin, Plane, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const introText =
  'Soy estudiante de Ciencias de la Computación apasionado por el desarrollo de aplicaciones web, sistemas backend y soluciones basadas en bases de datos. Disfruto transformar ideas en software funcional mientras continúo aprendiendo nuevas tecnologías, herramientas y buenas prácticas de desarrollo.';

const terminalLines = [
  'building web applications',
  'designing database systems',
  'learning every day',
];

const aboutCards = [
  { label: 'Location', value: 'Guatemala', icon: MapPin },
  { label: 'Education', value: 'Computer Science', icon: GraduationCap },
  { label: 'Focus', value: 'Frontend, Backend & Databases', icon: Database },
  { label: 'Goal', value: 'Study Abroad & Continuous Learning', icon: Plane },
];

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', segments: 7 },
      { name: 'JavaScript', segments: 8 },
      { name: 'HTML', segments: 9 },
      { name: 'CSS', segments: 8 },
      { name: 'Tailwind CSS', segments: 7 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', segments: 7 },
      { name: 'Express', segments: 7 },
      { name: 'Go', segments: 6 },
      { name: 'PHP', segments: 6 },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', segments: 8 },
      { name: 'MySQL', segments: 8 },
      { name: 'SQL Server', segments: 7 },
      { name: 'SQLite', segments: 7 },
      { name: 'Prisma', segments: 6 },
    ],
  },
  {
    category: 'Languages',
    skills: [
      { name: 'Java', segments: 10 },
      { name: 'Python', segments: 8 },
      { name: 'JavaScript', segments: 8 },
      { name: 'Go', segments: 6 },
      { name: 'PHP', segments: 6 },
      { name: 'C++', segments: 5 },
    ],
  },
  {
    category: 'Cloud & Tools',
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

function PhotoPlaceholder() {
  return (
    <motion.div
      className="group relative mx-auto flex aspect-[4/5] w-full max-w-sm items-center justify-center rounded-xl border border-border-cyber/80 bg-surface/55 p-5 shadow-[0_0_70px_rgba(0,220,229,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary-cyan/80 hover:shadow-[0_0_90px_rgba(0,220,229,0.22)]"
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="absolute inset-4 rounded-lg border border-primary-cyan/15 bg-surface-high/35" />
      <div className="relative flex h-full w-full items-center justify-center rounded-lg border border-dashed border-primary-cyan/45 bg-background/45">
        <p className="max-w-44 text-center font-mono text-xs font-medium uppercase text-primary-cyan-bright">
          PHOTO_PLACEHOLDER.png
        </p>
      </div>
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

export default function Home() {
  return (
    <div className="w-full space-y-24">
      <SectionShell className="grid min-h-[calc(100vh-12rem)] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
              Frontend & Backend Developer
            </p>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold leading-tight text-text sm:text-6xl lg:text-7xl">
                Norman Aguirre
              </h1>
              <p className="text-xl font-semibold text-primary-cyan sm:text-2xl">
                Computer Science Student
              </p>
            </div>
            <p className="max-w-2xl text-base leading-8 text-muted-text sm:text-lg">{introText}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-200 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_rgba(0,220,229,0.26)]"
            >
              Explore My Work
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md border border-border-cyber bg-surface-high/65 px-5 py-3 text-sm font-semibold text-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
            >
              Contact Me
            </Link>
          </div>

          <TerminalCard />
        </div>

        <PhotoPlaceholder />
      </SectionShell>

      <SectionShell className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">Profile</p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">About Me</h2>
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
            Skills Matrix
          </p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">Technical Skills</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <SkillsCard key={group.category} group={group} />
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
