import { motion } from 'framer-motion';
import { ArrowLeft, Code2, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects.js';

function DetailSection({ title, children }) {
  return (
    <motion.section
      className="rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h2 className="text-2xl font-bold text-text">{title}</h2>
      <div className="mt-5 text-base leading-8 text-muted-text">{children}</div>
    </motion.section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="w-full rounded-lg border border-border-cyber/70 bg-surface/60 p-8 text-center backdrop-blur-xl">
        <p className="font-mono text-sm uppercase text-primary-cyan-bright">
          {t('projects.detail.notFoundEyebrow')}
        </p>
        <h1 className="mt-4 text-3xl font-bold text-text">
          {t('projects.detail.notFoundTitle')}
        </h1>
        <Link
          to="/projects"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-200 hover:bg-primary-cyan-bright"
        >
          <ArrowLeft size={17} />
          {t('projects.actions.back')}
        </Link>
      </section>
    );
  }

  const projectName = t(`projects.items.${project.key}.name`);
  const repositories = [
    project.github ? { label: t('projects.labels.repository'), href: project.github } : null,
    project.githubFrontend
      ? { label: t('projects.labels.repositoryFrontend'), href: project.githubFrontend }
      : null,
    project.githubBackend
      ? { label: t('projects.labels.repositoryBackend'), href: project.githubBackend }
      : null,
  ].filter(Boolean);
  const learnedItems = t(`projects.items.${project.key}.learned`, { returnObjects: true });

  return (
    <article className="w-full space-y-10">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <nav className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-text">
          <Link to="/" className="transition duration-200 hover:text-primary-cyan-bright">
            {t('projects.detail.breadcrumbHome')}
          </Link>
          <span>/</span>
          <Link to="/projects" className="transition duration-200 hover:text-primary-cyan-bright">
            {t('projects.detail.breadcrumbProjects')}
          </Link>
          <span>/</span>
          <span className="text-primary-cyan-bright">{projectName}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
              {t(`projects.filters.${project.category}`)}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-text sm:text-5xl">
              {projectName}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-text">
              {t(`projects.items.${project.key}.description`)}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={`${project.slug}-hero-${technology}`}
                  className="rounded-md border border-border-cyber/70 bg-background/50 px-2.5 py-1 font-mono text-xs text-muted-text"
                >
                  {t(`projects.technologies.${technology}`)}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {project.productionUrl ? (
                <a
                  href={project.productionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-300 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_var(--primary-glow)]"
                >
                  <ExternalLink size={17} />
                  {t('projects.actions.viewProduction')}
                </a>
              ) : null}

              {repositories.map((repository, index) => (
                <a
                  key={repository.label}
                  href={repository.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold transition duration-200 ${
                    index === 0 && !project.productionUrl
                      ? 'border-primary-cyan bg-primary-cyan text-background hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_var(--primary-glow)]'
                      : 'border-border-cyber bg-surface-high/65 text-text hover:border-primary-cyan hover:text-primary-cyan-bright'
                  }`}
                >
                  <Code2 size={17} />
                  {repository.label}
                </a>
              ))}

              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border-cyber bg-surface-high/65 px-5 py-3 text-sm font-semibold text-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
              >
                <ArrowLeft size={17} />
                {t('projects.actions.back')}
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-border-cyber/80 bg-surface/55 p-5 shadow-[0_0_70px_var(--primary-glow-soft)] backdrop-blur-xl">
            <img
              src={project.image}
              alt={t('projects.labels.imageAlt', { name: projectName })}
              className="aspect-video w-full rounded-lg border border-primary-cyan/30 object-cover"
            />
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DetailSection title={t('projects.detail.overview')}>
          <p>{t(`projects.items.${project.key}.general`)}</p>
        </DetailSection>

        <DetailSection title={t('projects.detail.technologies')}>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={`${project.slug}-detail-${technology}`}
                className="rounded-md border border-border-cyber/70 bg-background/50 px-3 py-1.5 font-mono text-xs text-muted-text"
              >
                {t(`projects.technologies.${technology}`)}
              </span>
            ))}
          </div>
        </DetailSection>

        <DetailSection title={t('projects.detail.learned')}>
          <ul className="space-y-3">
            {learnedItems.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-cyan shadow-[0_0_12px_var(--primary-glow-strong)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection title={t('projects.detail.repository')}>
          <p>
            {repositories.length > 1
              ? t('projects.detail.repositoryMultiple')
              : t('projects.detail.repositorySingle')}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {repositories.map((repository) => (
              <a
                key={`detail-${repository.label}`}
                href={repository.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border-cyber bg-surface-high/70 px-4 py-3 text-sm font-semibold text-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
              >
                <Code2 size={17} />
                {repository.label}
              </a>
            ))}
          </div>
        </DetailSection>
      </div>
    </article>
  );
}
