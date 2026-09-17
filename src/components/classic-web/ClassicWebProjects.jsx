import { useMemo, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projectFilters, projects } from '../../data/projects.js';

function getRepositories(project, t) {
  return [
    project.github ? { label: t('projects.labels.repository'), href: project.github } : null,
    project.githubFrontend
      ? { label: t('projects.labels.repositoryFrontend'), href: project.githubFrontend }
      : null,
    project.githubBackend
      ? { label: t('projects.labels.repositoryBackend'), href: project.githubBackend }
      : null,
  ].filter(Boolean);
}

function ClassicProjectMeta({ label, value }) {
  return (
    <div className="grid gap-1 border border-[#000080] bg-white px-3 py-2 sm:grid-cols-[9rem_1fr]">
      <dt className="font-mono text-xs font-bold uppercase text-[#000080]">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ClassicProjectDetail({ project }) {
  const { t } = useTranslation();
  const projectName = t(`projects.items.${project.key}.name`);
  const repositories = getRepositories(project, t);
  const learnedItems = t(`projects.items.${project.key}.learned`, { returnObjects: true });

  return (
    <article className="grid gap-4">
      <Link className="w-fit font-bold text-[#000080] underline" to="/projects">
        {t('projects.actions.back')}
      </Link>

      <section className="grid gap-4 border-2 border-[#000080] bg-[#fffdf0] p-3">
        <div className="grid gap-4 lg:grid-cols-[12rem_1fr]">
          <img
            src={project.image}
            alt={t('projects.labels.imageAlt', { name: projectName })}
            className="aspect-video w-full max-w-48 border-2 border-[#000080] object-cover"
          />
          <div className="grid gap-3">
            <h3 className="font-mono text-xl font-bold uppercase text-[#000080]">
              {projectName}
            </h3>
            <p>{t(`projects.items.${project.key}.description`)}</p>
            <dl className="grid gap-2">
              <ClassicProjectMeta
                label={t('common.classicWeb.projects.category')}
                value={t(`projects.filters.${project.category}`)}
              />
              <ClassicProjectMeta
                label={t('projects.detail.technologies')}
                value={project.technologies
                  .map((technology) => t(`projects.technologies.${technology}`))
                  .join(', ')}
              />
            </dl>
          </div>
        </div>
      </section>

      <section className="border-2 border-[#000080] bg-[#fffdf0]">
        <h3 className="border-b-2 border-[#000080] bg-[#c0d8ff] px-3 py-2 font-mono text-xs font-bold uppercase text-[#000080]">
          {t('projects.detail.overview')}
        </h3>
        <p className="p-3">{t(`projects.items.${project.key}.general`)}</p>
      </section>

      <section className="border-2 border-[#000080] bg-[#fffdf0]">
        <h3 className="border-b-2 border-[#000080] bg-[#c0d8ff] px-3 py-2 font-mono text-xs font-bold uppercase text-[#000080]">
          {t('projects.detail.learned')}
        </h3>
        <ul className="grid gap-2 p-3">
          {learnedItems.map((item) => (
            <li key={item} className="border border-[#000080] bg-white px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-2 border-[#000080] bg-[#fffdf0]">
        <h3 className="border-b-2 border-[#000080] bg-[#c0d8ff] px-3 py-2 font-mono text-xs font-bold uppercase text-[#000080]">
          {t('common.classicWeb.projects.links')}
        </h3>
        <div className="grid gap-3 p-3">
          {project.productionUrl ? (
            <a
              className="font-bold text-[#000080] underline"
              href={project.productionUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('projects.actions.viewProduction')}
            </a>
          ) : (
            <p>{t('common.classicWeb.projects.noProductionUrl')}</p>
          )}

          {repositories.length > 0 ? (
            <ul className="grid gap-2">
              {repositories.map((repository) => (
                <li key={repository.href}>
                  <a
                    className="font-bold text-[#000080] underline"
                    href={repository.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {repository.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>{t('common.classicWeb.projects.noRepositories')}</p>
          )}
        </div>
      </section>
    </article>
  );
}

function ClassicProjectList() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }

    return projects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="grid gap-4">
      <p>{t('projects.page.subtitle')}</p>

      <nav aria-label={t('common.classicWeb.projects.filterLabel')} className="flex flex-wrap gap-2">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="border-2 border-[#000080] bg-[#ffffcc] px-3 py-1 font-bold text-[#000080] underline hover:bg-white focus:bg-white"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {activeFilter === filter ? '[x] ' : '[ ] '}
            {t(`projects.filters.${filter}`)}
          </button>
        ))}
      </nav>

      <div className="overflow-x-auto border-2 border-[#000080] bg-[#fffdf0]">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="border-b-2 border-[#000080] bg-[#c0d8ff] px-3 py-2 text-left font-mono text-xs font-bold uppercase text-[#000080]">
            {t('common.classicWeb.projects.catalogTitle')}
          </caption>
          <thead>
            <tr className="bg-[#e8eef8]">
              <th className="border border-[#000080] px-2 py-2">{t('common.classicWeb.projects.image')}</th>
              <th className="border border-[#000080] px-2 py-2">{t('common.classicWeb.projects.name')}</th>
              <th className="border border-[#000080] px-2 py-2">{t('common.classicWeb.projects.category')}</th>
              <th className="border border-[#000080] px-2 py-2">{t('projects.detail.technologies')}</th>
              <th className="border border-[#000080] px-2 py-2">{t('projects.actions.viewDetails')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => {
              const projectName = t(`projects.items.${project.key}.name`);

              return (
                <tr key={project.slug} className="bg-white align-top">
                  <td className="border border-[#000080] px-2 py-2">
                    <img
                      src={project.image}
                      alt={t('projects.labels.imageAlt', { name: projectName })}
                      className="h-14 w-20 border border-[#000080] object-cover"
                    />
                  </td>
                  <td className="border border-[#000080] px-2 py-2 font-bold text-[#000080]">
                    {projectName}
                  </td>
                  <td className="border border-[#000080] px-2 py-2">
                    {t(`projects.filters.${project.category}`)}
                  </td>
                  <td className="border border-[#000080] px-2 py-2">
                    {project.technologies
                      .map((technology) => t(`projects.technologies.${technology}`))
                      .join(', ')}
                  </td>
                  <td className="border border-[#000080] px-2 py-2">
                    <Link className="font-bold text-[#000080] underline" to={`/projects/${project.slug}`}>
                      {t('projects.actions.viewDetails')}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ClassicWebProjects() {
  const detailMatch = useMatch('/projects/:slug');
  const { t } = useTranslation();
  const slug = detailMatch?.params.slug;

  if (slug) {
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
      return (
        <div className="grid gap-4 border-2 border-[#000080] bg-[#fffdf0] p-3">
          <p className="font-bold text-[#000080]">{t('projects.detail.notFoundTitle')}</p>
          <Link className="font-bold text-[#000080] underline" to="/projects">
            {t('projects.actions.back')}
          </Link>
        </div>
      );
    }

    return <ClassicProjectDetail project={project} />;
  }

  return <ClassicProjectList />;
}
