import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ui/ProjectCard.jsx';
import { projectFilters, projects } from '../data/projects.js';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { t } = useTranslation();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }

    return projects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section className="w-full space-y-10">
      <motion.div
        className="max-w-3xl space-y-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
          {t('projects.page.eyebrow')}
        </p>
        <h1 className="text-4xl font-bold text-text sm:text-5xl">
          {t('projects.page.title')}
        </h1>
        <p className="text-base leading-8 text-muted-text">
          {t('projects.page.subtitle')}
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
      >
        {projectFilters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              className={`rounded-md border px-4 py-2 font-mono text-xs font-semibold transition duration-200 ${
                isActive
                  ? 'border-primary-cyan bg-primary-cyan text-background shadow-[0_0_24px_var(--primary-glow-soft)]'
                  : 'border-border-cyber bg-surface/60 text-muted-text hover:border-primary-cyan hover:text-primary-cyan-bright'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {t(`projects.filters.${filter}`)}
            </button>
          );
        })}
      </motion.div>

      <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              actionKey="viewDetails"
              showCategory
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
