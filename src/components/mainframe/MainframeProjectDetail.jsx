import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../../data/projects.js';
import MainframeSection from './MainframeSection.jsx';

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

export default function MainframeProjectDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <MainframeSection label="error" title={t('projects.detail.notFoundTitle')}>
        <Link to="/projects" className="uppercase hover:bg-[#37ff73] hover:text-black">
          {'> '}
          {t('projects.actions.back')}
        </Link>
      </MainframeSection>
    );
  }

  const projectName = t(`projects.items.${project.key}.name`);
  const learnedItems = t(`projects.items.${project.key}.learned`, { returnObjects: true });
  const repositories = getRepositories(project, t);

  return (
    <article>
      <MainframeSection label="project detail" title={projectName}>
        <div className="grid gap-3 text-[#37ff73]/80">
          <p>
            CATEGORY: <span className="text-[#37ff73]">{t(`projects.filters.${project.category}`)}</span>
          </p>
          <p>
            DESCRIPTION:{' '}
            <span className="text-[#37ff73]">
              {t(`projects.items.${project.key}.description`)}
            </span>
          </p>
          <p>
            OVERVIEW:{' '}
            <span className="text-[#37ff73]">{t(`projects.items.${project.key}.general`)}</span>
          </p>
        </div>
      </MainframeSection>

      <MainframeSection label="technology" title={t('projects.detail.technologies')}>
        <ul className="grid gap-2">
          {project.technologies.map((technology) => (
            <li key={technology}>{'> '} {t(`projects.technologies.${technology}`)}</li>
          ))}
        </ul>
      </MainframeSection>

      <MainframeSection label="output" title={t('projects.detail.learned')}>
        <ul className="grid gap-2">
          {learnedItems.map((item) => (
            <li key={item}>{'> '} {item}</li>
          ))}
        </ul>
      </MainframeSection>

      <MainframeSection label="links" title={t('projects.detail.repository')}>
        <div className="grid gap-3">
          {project.productionUrl ? (
            <a
              href={project.productionUrl}
              target="_blank"
              rel="noreferrer"
              className="w-fit uppercase hover:bg-[#37ff73] hover:text-black"
            >
              {'> '}
              {t('projects.actions.viewProduction')}
            </a>
          ) : null}

          {repositories.map((repository) => (
            <a
              key={repository.href}
              href={repository.href}
              target="_blank"
              rel="noreferrer"
              className="w-fit uppercase hover:bg-[#37ff73] hover:text-black"
            >
              {'> '}
              {repository.label}
            </a>
          ))}

          <Link to="/projects" className="w-fit uppercase hover:bg-[#37ff73] hover:text-black">
            {'> '}
            {t('projects.actions.back')}
          </Link>
        </div>
      </MainframeSection>
    </article>
  );
}
