import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../../data/projects.js';
import MainframeSection from './MainframeSection.jsx';
import { mainframeAction } from './mainframeStyles.js';

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
      <MainframeSection
        label={t('common.mainframe.projectDetail.errorLabel')}
        title={t('projects.detail.notFoundTitle')}
      >
        <Link to="/projects" className={mainframeAction()}>
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
      <MainframeSection
        label={t('common.mainframe.projectDetail.sectionLabel')}
        title={projectName}
      >
        <div className="grid gap-3 text-[#37ff73]/80">
          <p>
            {t('common.mainframe.projectDetail.category')}:{' '}
            <span className="text-[#37ff73]">{t(`projects.filters.${project.category}`)}</span>
          </p>
          <p>
            {t('common.mainframe.projectDetail.description')}:{' '}
            <span className="text-[#37ff73]">
              {t(`projects.items.${project.key}.description`)}
            </span>
          </p>
          <p>
            {t('common.mainframe.projectDetail.overview')}:{' '}
            <span className="text-[#37ff73]">{t(`projects.items.${project.key}.general`)}</span>
          </p>
        </div>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.projectDetail.technologyLabel')}
        title={t('projects.detail.technologies')}
      >
        <ul className="grid gap-2">
          {project.technologies.map((technology, index) => (
            <li key={`${technology}-${index}`}>{'> '} {t(`projects.technologies.${technology}`)}</li>
          ))}
        </ul>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.projectDetail.outputLabel')}
        title={t('projects.detail.learned')}
      >
        <ul className="grid gap-2">
          {learnedItems.map((item, index) => (
            <li key={`${item}-${index}`}>{'> '} {item}</li>
          ))}
        </ul>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.projectDetail.linksLabel')}
        title={t('projects.detail.repository')}
      >
        <div className="grid gap-3">
          {project.productionUrl ? (
            <a
              href={project.productionUrl}
              target="_blank"
              rel="noreferrer"
              className={mainframeAction()}
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
              className={mainframeAction()}
            >
              {'> '}
              {repository.label}
            </a>
          ))}

          <Link to="/projects" className={mainframeAction()}>
            {'> '}
            {t('projects.actions.back')}
          </Link>
        </div>
      </MainframeSection>
    </article>
  );
}
