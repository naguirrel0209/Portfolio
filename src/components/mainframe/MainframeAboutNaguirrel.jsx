import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects.js';
import MainframeSection from './MainframeSection.jsx';
import MainframeTypedText from './MainframeTypedText.jsx';
import { mainframeAction } from './mainframeStyles.js';

const skillGroups = [
  {
    key: 'frontend',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    key: 'backend',
    skills: ['Node.js', 'Express', 'Go', 'PHP'],
  },
  {
    key: 'databases',
    skills: ['PostgreSQL', 'MySQL', 'SQL Server', 'SQLite', 'Prisma'],
  },
  {
    key: 'languages',
    skills: ['Java', 'Python', 'JavaScript', 'Go', 'PHP', 'C++'],
  },
  {
    key: 'cloudTools',
    skills: ['AWS', 'Cloudflare R2', 'Docker', 'Git', 'GitHub', 'Linux'],
  },
];

export default function MainframeAboutNaguirrel() {
  const { t } = useTranslation();
  const selectedProjects = featuredProjects.slice(0, 3);

  return (
    <div>
      <MainframeSection
        label={t('common.mainframe.aboutNaguirrel.sections.identity.label')}
        title={t('common.mainframe.aboutNaguirrel.sections.identity.title')}
      >
        <MainframeTypedText
          as="p"
          className="max-w-4xl text-[#37ff73]/80"
          lines={t('common.mainframe.aboutNaguirrel.identityDescription')}
        />
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.aboutNaguirrel.sections.profile.label')}
        title={t('common.mainframe.aboutNaguirrel.sections.profile.title')}
      >
        <div className="grid gap-4">
          <p className="uppercase text-[#37ff73]">{t('home.about.cards.focus.value')}</p>
          <p className="max-w-4xl text-[#37ff73]/80">{t('home.hero.description')}</p>
        </div>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.aboutNaguirrel.sections.skills.label')}
        title={t('common.mainframe.aboutNaguirrel.sections.skills.title')}
      >
        <div className="grid gap-7">
          {skillGroups.map((group) => (
            <div key={group.key} className="border-t border-[#37ff73]/25 pt-5 first:border-t-0 first:pt-0">
              <h3 className="uppercase text-[#37ff73]">
                {t(`home.skills.groups.${group.key}.title`)}
              </h3>
              <p className="mt-2 max-w-4xl text-[#37ff73]/70">
                {t(`home.skills.groups.${group.key}.description`)}
              </p>
              <p className="mt-3 text-[#37ff73]/80">{group.skills.join(' / ')}</p>
            </div>
          ))}
        </div>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.aboutNaguirrel.sections.technologies.label')}
        title={t('common.mainframe.aboutNaguirrel.sections.technologies.title')}
      >
        <ul className="grid gap-2">
          {skillGroups.flatMap((group) =>
            group.skills.map((skill, index) => ({
              groupKey: group.key,
              index,
              skill,
            })),
          ).map(({ groupKey, index, skill }) => (
            <li key={`${groupKey}-${skill}-${index}`}>{'> '} {skill}</li>
          ))}
        </ul>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.aboutNaguirrel.sections.projects.label')}
        title={t('common.mainframe.aboutNaguirrel.sections.projects.title')}
      >
        <div className="grid gap-6">
          {selectedProjects.map((project) => (
            <article key={project.slug} className="border-t border-[#37ff73]/25 pt-5">
              <p className="uppercase text-[#37ff73]/70">
                {t(`projects.filters.${project.category}`)}
              </p>
              <h3 className="uppercase text-[#37ff73]">
                {t(`projects.items.${project.key}.name`)}
              </h3>
              <p className="mt-2 max-w-4xl text-[#37ff73]/80">
                {t(`projects.items.${project.key}.description`)}
              </p>
              <Link to={`/projects/${project.slug}`} className={mainframeAction('mt-3')}>
                {'> '}
                {t('projects.actions.viewDetails')}
              </Link>
            </article>
          ))}

          <Link to="/projects" className={mainframeAction()}>
            {'> '}
            {t('projects.actions.viewAll')}
          </Link>
        </div>
      </MainframeSection>
    </div>
  );
}
