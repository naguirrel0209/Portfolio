import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Database, GraduationCap, MapPin, Plane, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import normanProfile from '../assets/images/norman-profile.jpeg';
import ProjectCard from '../components/ui/ProjectCard.jsx';
import TimelineItem from '../components/ui/TimelineItem.jsx';
import { featuredProjects } from '../data/projects.js';
import { timelineEvents } from '../data/timeline.js';

const techStackBadges = [
  'React',
  'JavaScript',
  'Node.js',
  'Go',
  'Java',
  'Python',
  'PostgreSQL',
  'MySQL',
  'AWS',
  'Cloudflare R2',
  'Docker',
  'GitHub',
];

const aboutCards = [
  { key: 'location', icon: MapPin },
  { key: 'education', icon: GraduationCap },
  { key: 'focus', icon: Database },
  { key: 'goal', icon: Plane },
];

const skillGroups = [
  {
    key: 'frontend',
    skills: [
      { name: 'React', key: 'react', segments: 7 },
      { name: 'JavaScript', key: 'javascript', segments: 8 },
      { name: 'HTML', key: 'html', segments: 9 },
      { name: 'CSS', key: 'css', segments: 8 },
      { name: 'Tailwind CSS', key: 'tailwind', segments: 7 },
    ],
  },
  {
    key: 'backend',
    skills: [
      { name: 'Node.js', key: 'node', segments: 7 },
      { name: 'Express', key: 'express', segments: 7 },
      { name: 'Go', key: 'go', segments: 6 },
      { name: 'PHP', key: 'php', segments: 6 },
    ],
  },
  {
    key: 'databases',
    skills: [
      { name: 'PostgreSQL', key: 'postgresql', segments: 8 },
      { name: 'MySQL', key: 'mysql', segments: 8 },
      { name: 'SQL Server', key: 'sqlServer', segments: 7 },
      { name: 'SQLite', key: 'sqlite', segments: 7 },
      { name: 'Prisma', key: 'prisma', segments: 6 },
    ],
  },
  {
    key: 'languages',
    skills: [
      { name: 'Java', key: 'java', segments: 6 },
      { name: 'Python', key: 'python', segments: 10 },
      { name: 'JavaScript', key: 'javascript', segments: 8 },
      { name: 'Go', key: 'go', segments: 6 },
      { name: 'PHP', key: 'php', segments: 6 },
      { name: 'C++', key: 'cpp', segments: 5 },
    ],
  },
  {
    key: 'cloudTools',
    skills: [
      { name: 'AWS', key: 'aws', segments: 5 },
      { name: 'Cloudflare R2', key: 'cloudflareR2', segments: 5 },
      { name: 'Docker', key: 'docker', segments: 6 },
      { name: 'Git', key: 'git', segments: 8 },
      { name: 'GitHub', key: 'github', segments: 8 },
      { name: 'Linux', key: 'linux', segments: 7 },
    ],
  },
];

const SKILLS_CAROUSEL_INTERVAL = 10000;

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function TerminalCard() {
  const { t, i18n } = useTranslation();
  const lines = useMemo(
    () => t('home.hero.terminal.lines', { returnObjects: true }),
    [t, i18n.resolvedLanguage],
  );
  const [completedLines, setCompletedLines] = useState([]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    setCompletedLines([]);
    setActiveLineIndex(0);
    setTypedText('');
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (!Array.isArray(lines) || lines.length === 0) {
      return undefined;
    }

    if (activeLineIndex >= lines.length) {
      const restartTimer = window.setTimeout(() => {
        setCompletedLines([]);
        setActiveLineIndex(0);
        setTypedText('');
      }, 1400);

      return () => window.clearTimeout(restartTimer);
    }

    const currentLine = lines[activeLineIndex];

    if (typedText.length < currentLine.length) {
      const typeTimer = window.setTimeout(() => {
        setTypedText(currentLine.slice(0, typedText.length + 1));
      }, 28);

      return () => window.clearTimeout(typeTimer);
    }

    const nextLineTimer = window.setTimeout(() => {
      setCompletedLines((current) => [...current, currentLine]);
      setTypedText('');
      setActiveLineIndex((current) => current + 1);
    }, 520);

    return () => window.clearTimeout(nextLineTimer);
  }, [activeLineIndex, lines, typedText]);

  return (
    <div className="overflow-hidden rounded-xl border border-border-cyber/70 bg-surface/65 shadow-[0_0_44px_var(--primary-glow-soft)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-border-cyber/60 bg-surface-high/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary-cyan/80" />
        <span className="ml-2 font-mono text-xs text-muted-text">
          {t('home.hero.terminal.title')}
        </span>
      </div>

      <div className="min-h-36 px-4 py-5 font-mono text-sm text-muted-text">
        {[...completedLines, typedText].filter(Boolean).map((line, index) => (
          <motion.p
            key={`${line}-${index}`}
            className="mb-3 flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <span className="text-primary-cyan-bright">&gt;</span>
            <span>{line}</span>
            {index === completedLines.length ? (
              <motion.span
                className="h-4 w-2 bg-primary-cyan-bright"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
              />
            ) : null}
          </motion.p>
        ))}
        {completedLines.length === 0 && !typedText ? (
          <motion.span
            className="inline-block h-4 w-2 bg-primary-cyan-bright"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : null}
      </div>
    </div>
  );
}

function TechStackBadges() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-border-cyber/70 bg-surface/65 p-5 shadow-[0_0_56px_var(--primary-glow-soft)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,var(--primary-glow-soft),transparent_32%),linear-gradient(135deg,var(--surface-high),transparent_42%)] opacity-80" />
      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-primary-cyan-bright">
              {t('home.hero.stack.file')}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-text">
              {t('home.hero.stack.title')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-text">
              {t('home.hero.stack.subtitle')}
            </p>
          </div>
          <div className="mt-1 flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-primary-cyan" />
            <span className="h-2 w-2 rounded-full bg-primary-cyan/55" />
            <span className="h-2 w-2 rounded-full bg-primary-cyan/25" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {techStackBadges.map((technology, index) => (
            <motion.span
              key={technology}
              className="rounded-md border border-border-cyber/70 bg-background/45 px-3 py-2 font-mono text-xs font-medium text-muted-text transition duration-300 hover:-translate-y-0.5 hover:border-primary-cyan/80 hover:bg-surface-high/70 hover:text-primary-cyan-bright hover:shadow-[0_0_24px_var(--primary-glow-soft)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.18 + index * 0.035, ease: 'easeOut' }}
              whileHover={{ y: -2, scale: 1.03 }}
            >
              {technology}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProfilePhoto() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="group relative mx-auto flex aspect-[4/5] w-full max-w-[18rem] items-center justify-center sm:max-w-xs lg:max-w-[19rem] xl:max-w-[20rem]"
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
      whileHover={{ scale: 1.015 }}
    >
      <div className="absolute -inset-5 rounded-[2rem] bg-primary-cyan/15 blur-3xl transition duration-300 group-hover:bg-primary-cyan/25" />
      <div className="absolute inset-5 rounded-2xl border border-primary-cyan/20 bg-surface-high/35" />
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border-cyber/80 bg-surface/55 p-4 shadow-[0_0_80px_var(--primary-glow-soft)] backdrop-blur-xl transition duration-300 group-hover:border-primary-cyan/80 group-hover:shadow-[0_0_100px_var(--primary-glow)]">
        <img
          src={normanProfile}
          alt={t('home.hero.photoAlt')}
          className="h-full w-full rounded-xl border border-primary-cyan/35 object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-4 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_32%,var(--primary-glow-soft))] opacity-60" />
      </div>
    </motion.div>
  );
}

function HeroBackground() {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 -z-10 w-screen -translate-x-1/2 bg-[radial-gradient(circle_at_14%_18%,var(--primary-glow),transparent_34%),radial-gradient(circle_at_82%_20%,var(--primary-glow-soft),transparent_30%),linear-gradient(135deg,var(--surface)_0%,transparent_48%,var(--surface-high)_100%)] opacity-95" />
      <motion.div
        className="pointer-events-none absolute top-10 -z-10 h-72 w-72 rounded-full bg-primary-cyan/15 blur-3xl"
        style={{ right: 'max(-12rem, calc((100% - 100vw) / 2 + 2rem))' }}
        animate={{ y: [0, 18, 0], x: [0, -12, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-16 -z-10 h-52 w-52 rounded-full border border-primary-cyan/25"
        style={{ left: 'max(-12rem, calc((100% - 100vw) / 2 + 2rem))' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      />
      <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 -z-10 w-screen -translate-x-1/2 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.06]" />
    </>
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

function getSkillRangeLabel(segments, t) {
  if (segments <= 2) {
    return t('home.skills.ranges.exploring');
  }

  if (segments <= 5) {
    return t('home.skills.ranges.punctual');
  }

  if (segments <= 7) {
    return t('home.skills.ranges.frequent');
  }

  return t('home.skills.ranges.advanced');
}

function SkillSegments({ count, name }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={`${name}-${index}`}
          className={`h-2 flex-1 rounded-sm ${
            index < count
              ? 'bg-primary-cyan shadow-[0_0_10px_var(--primary-glow-strong)]'
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
  const { t } = useTranslation();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % groups.length);
    }, SKILLS_CAROUSEL_INTERVAL);

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
          key={activeGroup.key}
          className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="space-y-5">
            <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
              {t('home.skills.profile')}
            </p>
            <h3 className="text-3xl font-bold text-text">
              {t(`home.skills.groups.${activeGroup.key}.title`)}
            </h3>
            <p className="text-base leading-8 text-muted-text">
              {t(`home.skills.groups.${activeGroup.key}.description`)}
            </p>

            <div className="rounded-lg border border-border-cyber/70 bg-background/45 p-4">
              <p className="font-mono text-xs uppercase text-primary-cyan-bright">
                {t('home.skills.focusFile')}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {activeGroup.skills.map((skill) => (
                  <span
                    key={`${activeGroup.key}-clean-chip-${skill.name}`}
                    className="rounded-md border border-border-cyber/70 bg-surface-high/45 px-3 py-2 font-mono text-xs text-muted-text"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border-cyber/70 bg-background/45 p-5 shadow-[0_0_42px_var(--primary-glow-soft)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-mono text-xs font-semibold uppercase text-primary-cyan-bright">
                {t('home.skills.matrixFile')}
              </p>
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-primary-cyan" />
                <span className="h-2 w-2 rounded-full bg-primary-cyan/55" />
                <span className="h-2 w-2 rounded-full bg-primary-cyan/25" />
              </div>
            </div>

            <div className="space-y-5">
              {activeGroup.skills.map((skill) => (
                <div key={`${activeGroup.key}-clean-row-${skill.name}`} className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm font-semibold text-text">{skill.name}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-text">
                        {t(`home.skills.descriptions.${skill.key}`)}
                      </p>
                    </div>
                    <span className="max-w-36 text-right font-mono text-xs font-semibold leading-5 text-primary-cyan-bright">
                      {getSkillRangeLabel(skill.segments, t)}
                    </span>
                  </div>
                  <SkillSegments
                    count={skill.segments}
                    name={`${activeGroup.key}-clean-${skill.name}`}
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
            key={`clean-skill-dot-${group.key}`}
            type="button"
            className={`h-2.5 rounded-full transition-all duration-200 ${
              activeIndex === index
                ? 'w-8 bg-primary-cyan'
                : 'w-2.5 bg-surface-highest hover:bg-primary-cyan/60'
            }`}
            aria-label={t(`home.skills.groups.${group.key}.title`)}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </motion.article>
  );
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="w-full space-y-24">
      <SectionShell className="relative isolate min-h-[calc(100vh-10rem)] overflow-visible py-8 lg:py-10">
        <HeroBackground />
        <div className="relative grid min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
                {t('home.hero.eyebrow')}
              </p>
              <div className="space-y-3">
                <motion.h1
                  className="break-words text-5xl font-bold leading-tight text-text sm:text-6xl xl:text-7xl"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  {t('home.hero.name')}
                </motion.h1>
                <p className="text-xl font-semibold text-primary-cyan sm:text-2xl">
                  {t('home.hero.subtitle')}
                </p>
              </div>
              <p className="max-w-2xl text-base leading-8 text-muted-text sm:text-lg">
                {t('home.hero.description')}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-300 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_var(--primary-glow)]"
              >
                {t('home.hero.primaryButton')}
                <ArrowRight size={17} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border border-border-cyber bg-surface-high/65 px-5 py-3 text-sm font-semibold text-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
              >
                {t('home.hero.secondaryButton')}
              </Link>
            </div>

            <TerminalCard />
          </div>

          <div className="space-y-6">
            <TechStackBadges />
            <ProfilePhoto />
          </div>
        </div>

        <motion.div
          className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-xs uppercase text-muted-text lg:flex"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>{t('home.hero.scroll')}</span>
          <ChevronDown size={15} className="text-primary-cyan-bright" />
        </motion.div>
      </SectionShell>

      <SectionShell className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
            {t('home.about.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">{t('home.about.title')}</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl sm:p-8">
            <div className="space-y-5 text-base leading-8 text-muted-text">
              <p>{t('home.hero.description')}</p>
              <p>{t('home.about.paragraph2')}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCards.map(({ key, icon: Icon }) => (
              <article
                key={key}
                className="rounded-lg border border-border-cyber/70 bg-surface/60 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary-cyan/70 hover:bg-surface-high/70"
              >
                <Icon size={20} className="mb-5 text-primary-cyan-bright" />
                <p className="font-mono text-xs uppercase text-muted-text">
                  {t(`home.about.cards.${key}.label`)}
                </p>
                <p className="mt-2 text-lg font-semibold text-text">
                  {t(`home.about.cards.${key}.value`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
            {t('home.skills.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">{t('home.skills.title')}</h2>
        </div>

        <SkillsCarousel groups={skillGroups} />
      </SectionShell>

      <SectionShell className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
            {t('home.featured.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">
            {t('home.featured.title')}
          </h2>
          <p className="text-base leading-8 text-muted-text">
            {t('home.featured.subtitle')}
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
            className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-300 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_var(--primary-glow)]"
          >
            {t('home.featured.allButton')}
            <ArrowRight size={17} />
          </Link>
        </div>
      </SectionShell>

      <SectionShell className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
            {t('home.timeline.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-text sm:text-4xl">{t('home.timeline.title')}</h2>
          <p className="text-base leading-8 text-muted-text">
            {t('home.timeline.subtitle')}
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
