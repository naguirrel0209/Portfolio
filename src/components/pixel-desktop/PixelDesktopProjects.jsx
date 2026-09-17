import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { projectFilters, projects } from '../../data/projects.js';

function getProjectSlug(pathname) {
  const match = pathname.match(/^\/projects\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getRepositories(project) {
  const repositories = [];

  if (project.github) {
    repositories.push({
      labelKey: 'projects.labels.repository',
      url: project.github,
    });
  }

  if (project.githubFrontend) {
    repositories.push({
      labelKey: 'projects.labels.repositoryFrontend',
      url: project.githubFrontend,
    });
  }

  if (project.githubBackend) {
    repositories.push({
      labelKey: 'projects.labels.repositoryBackend',
      url: project.githubBackend,
    });
  }

  return repositories;
}

function PixelPanel({ children, title }) {
  return (
    <section className="border-2 border-black bg-[#f0f0f0]">
      <div className="border-b-2 border-black bg-[#d8d8d8] px-2 py-1">
        <h2 className="text-sm font-bold uppercase">{title}</h2>
      </div>
      <div className="p-3">{children}</div>
    </section>
  );
}

function PixelDocumentSection({ children, title }) {
  return (
    <section className="border-t-2 border-[#808080] pt-4 first:border-t-0 first:pt-0">
      <h3 className="mb-2 text-sm font-bold uppercase">{title}</h3>
      {children}
    </section>
  );
}

function ProjectFilters({ activeFilter, onSelectFilter }) {
  const { t } = useTranslation();

  return (
    <fieldset className="border-2 border-[#808080] bg-[#e6e6e6] p-2">
      <legend className="px-1 text-xs font-bold uppercase">
        {t('common.pixelDesktop.projects.filterLabel')}
      </legend>
      <div className="flex flex-wrap gap-2">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            className="border-2 border-black bg-[#d8d8d8] px-2 py-1 text-left hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white aria-pressed:bg-[#000080] aria-pressed:text-white"
            onClick={() => onSelectFilter(filter)}
          >
            {activeFilter === filter ? '[x] ' : '[ ] '}
            {t(`projects.filters.${filter}`)}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function ProjectFolderItem({ project }) {
  const { t } = useTranslation();
  const projectName = t(`projects.items.${project.key}.name`);
  const mainTechnology = project.technologies[0];

  return (
    <article className="grid gap-3 border-b-2 border-[#808080] bg-[#f0f0f0] p-3 last:border-b-0 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center">
      <img
        src={project.image}
        alt={t('projects.labels.imageAlt', { name: projectName })}
        className="h-16 w-16 border-2 border-black object-cover"
      />
      <div className="min-w-0">
        <h3 className="break-words text-sm font-bold uppercase">{projectName}</h3>
        <dl className="mt-2 grid gap-1 text-xs sm:grid-cols-2">
          <div>
            <dt className="font-bold">{t('common.pixelDesktop.projects.category')}</dt>
            <dd>{t(`projects.filters.${project.category}`)}</dd>
          </div>
          <div>
            <dt className="font-bold">{t('common.pixelDesktop.projects.mainTechnology')}</dt>
            <dd>{t(`projects.technologies.${mainTechnology}`)}</dd>
          </div>
        </dl>
      </div>
      <Link
        to={`/projects/${project.slug}`}
        className="w-fit border-2 border-black bg-[#d8d8d8] px-3 py-2 text-sm hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
      >
        {t('projects.actions.viewDetails')}
      </Link>
    </article>
  );
}

function ProjectsList() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((project) => project.filters.includes(activeFilter)),
    [activeFilter],
  );

  return (
    <div className="grid gap-4">
      <ProjectFilters activeFilter={activeFilter} onSelectFilter={setActiveFilter} />
      <PixelPanel title={t('common.pixelDesktop.projects.folderTitle')}>
        <div className="border-2 border-[#808080] bg-white">
          {filteredProjects.map((project) => (
            <ProjectFolderItem key={project.slug} project={project} />
          ))}
        </div>
      </PixelPanel>
    </div>
  );
}

function ProjectDetail({ project }) {
  const { t } = useTranslation();
  const projectName = t(`projects.items.${project.key}.name`);
  const learned = t(`projects.items.${project.key}.learned`, { returnObjects: true });
  const repositories = getRepositories(project);

  return (
    <div className="grid gap-4">
      <Link
        to="/projects"
        className="w-fit border-2 border-black bg-[#d8d8d8] px-3 py-2 text-sm hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
      >
        {t('projects.actions.back')}
      </Link>

      <article className="border-2 border-black bg-[#f0f0f0]">
        <div className="border-b-2 border-black bg-[#d8d8d8] px-2 py-1">
          <h2 className="text-sm font-bold uppercase">{projectName}</h2>
        </div>

        <div className="grid gap-5 p-3 sm:p-4">
          <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
            <img
              src={project.image}
              alt={t('projects.labels.imageAlt', { name: projectName })}
              className="h-28 w-28 border-2 border-black object-cover"
            />
            <dl className="grid content-start gap-2 text-sm">
              <div>
                <dt className="font-bold uppercase">{t('common.pixelDesktop.projects.category')}</dt>
                <dd>{t(`projects.filters.${project.category}`)}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase">{t('projects.detail.technologies')}</dt>
                <dd>
                  {project.technologies
                    .map((technology) => t(`projects.technologies.${technology}`))
                    .join(' / ')}
                </dd>
              </div>
            </dl>
          </div>

          <PixelDocumentSection title={t('common.pixelDesktop.projects.description')}>
            <p>{t(`projects.items.${project.key}.description`)}</p>
          </PixelDocumentSection>

          <PixelDocumentSection title={t('projects.detail.overview')}>
            <p>{t(`projects.items.${project.key}.general`)}</p>
          </PixelDocumentSection>

          <PixelDocumentSection title={t('projects.detail.learned')}>
            <ul className="grid gap-1">
              {Array.isArray(learned)
                ? learned.map((item) => <li key={item}>{item}</li>)
                : null}
            </ul>
          </PixelDocumentSection>

          {project.productionUrl ? (
            <PixelDocumentSection title={t('common.pixelDesktop.projects.productionUrl')}>
              <a
                href={project.productionUrl}
                target="_blank"
                rel="noreferrer"
                className="break-all underline hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
              >
                {project.productionUrl}
              </a>
            </PixelDocumentSection>
          ) : null}

          <PixelDocumentSection title={t('common.pixelDesktop.projects.repositories')}>
            {repositories.length > 0 ? (
              <ul className="grid gap-2">
                {repositories.map((repository) => (
                  <li key={repository.url}>
                    <a
                      href={repository.url}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all underline hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
                    >
                      {t(repository.labelKey)}: {repository.url}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t('common.pixelDesktop.projects.noRepositories')}</p>
            )}
          </PixelDocumentSection>
        </div>
      </article>
    </div>
  );
}

function ProjectNotFound() {
  const { t } = useTranslation();

  return (
    <PixelPanel title={t('projects.detail.notFoundEyebrow')}>
      <div className="grid gap-3">
        <p className="font-bold">{t('projects.detail.notFoundTitle')}</p>
        <Link
          to="/projects"
          className="w-fit border-2 border-black bg-[#d8d8d8] px-3 py-2 text-sm hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
        >
          {t('projects.actions.back')}
        </Link>
      </div>
    </PixelPanel>
  );
}

export default function PixelDesktopProjects() {
  const location = useLocation();
  const projectSlug = getProjectSlug(location.pathname);
  const selectedProject = projectSlug
    ? projects.find((project) => project.slug === projectSlug)
    : null;

  if (projectSlug && !selectedProject) {
    return <ProjectNotFound />;
  }

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} />;
  }

  return <ProjectsList />;
}
