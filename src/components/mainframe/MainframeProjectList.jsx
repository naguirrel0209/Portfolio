import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { projectFilters, projects } from '../../data/projects.js';
import MainframeSection from './MainframeSection.jsx';
import { mainframeAction } from './mainframeStyles.js';

function getRepositories(project) {
  return [
    project.github ? project.github : null,
    project.githubFrontend ? project.githubFrontend : null,
    project.githubBackend ? project.githubBackend : null,
  ].filter(Boolean);
}

export default function MainframeProjectList({ limit }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const { t } = useTranslation();

  const filteredProjects = useMemo(() => {
    const result =
      activeFilter === 'all'
        ? projects
        : projects.filter((project) => project.filters.includes(activeFilter));

    return typeof limit === 'number' ? result.slice(0, limit) : result;
  }, [activeFilter, limit]);

  return (
    <MainframeSection label={t('common.mainframe.projects.sectionLabel')} title={t('projects.page.title')}>
      <p className="mainframe-secondary mb-6 max-w-4xl text-[#37ff73]/80">
        {t('projects.page.subtitle')}
      </p>

      <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 uppercase">
        {projectFilters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              className={mainframeAction(`border-0 text-left ${
                isActive ? 'text-[#37ff73]' : 'text-[#37ff73]/70'
              }`)}
              onClick={() => setActiveFilter(filter)}
            >
              {isActive ? '> ' : '  '}
              {t(`projects.filters.${filter}`)}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8">
        {filteredProjects.map((project) => {
          const projectName = t(`projects.items.${project.key}.name`);
          const repositories = getRepositories(project);

          return (
            <article key={project.slug} className="border-t border-[#37ff73]/35 pt-5">
              <p className="uppercase text-[#37ff73]/75">
                {t('common.mainframe.projects.id', {
                  id: String(project.id).padStart(2, '0'),
                })}{' '}
                / {t(`projects.filters.${project.category}`)}
              </p>
              <h3 className="mt-2 text-lg uppercase text-[#37ff73]">{projectName}</h3>
              <p className="mainframe-secondary mt-3 max-w-4xl text-[#37ff73]/80">
                {t(`projects.items.${project.key}.description`)}
              </p>
              <p className="mt-3 uppercase text-[#37ff73]/75">
                {t('common.mainframe.projects.tech')}:{' '}
                {project.technologies
                  .map((technology) => t(`projects.technologies.${technology}`))
                  .join(' / ')}
              </p>
              <p className="mt-1 uppercase text-[#37ff73]/75">
                {t('common.mainframe.projects.links')}:{' '}
                {project.productionUrl ? `${t('common.mainframe.projects.production')} / ` : ''}
                {repositories.length > 0
                  ? t(
                      repositories.length === 1
                        ? 'common.mainframe.projects.repository'
                        : 'common.mainframe.projects.repositories',
                      { count: repositories.length },
                    )
                  : t('common.mainframe.projects.noRepository')}
              </p>
              <Link
                to={`/projects/${project.slug}`}
                className={mainframeAction('mt-4')}
              >
                {'> '}
                {t('projects.actions.viewDetails')}
              </Link>
            </article>
          );
        })}
      </div>
    </MainframeSection>
  );
}
