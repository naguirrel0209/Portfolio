import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { timelineEvents } from '../../data/timeline.js';
import MainframeProjectList from './MainframeProjectList.jsx';
import MainframeSection from './MainframeSection.jsx';

const skillGroups = [
  {
    key: 'frontend',
    skills: ['react', 'javascript', 'html', 'css', 'tailwind'],
  },
  {
    key: 'backend',
    skills: ['node', 'express', 'go', 'php'],
  },
  {
    key: 'databases',
    skills: ['postgresql', 'mysql', 'sqlServer', 'sqlite', 'prisma'],
  },
  {
    key: 'languages',
    skills: ['java', 'python', 'javascript', 'go', 'php', 'cpp'],
  },
  {
    key: 'cloudTools',
    skills: ['aws', 'cloudflareR2', 'docker', 'git', 'github', 'linux'],
  },
];

const aboutCards = ['location', 'education', 'focus', 'goal'];

function getSkillName(skillKey) {
  const names = {
    react: 'React',
    javascript: 'JavaScript',
    html: 'HTML',
    css: 'CSS',
    tailwind: 'Tailwind CSS',
    node: 'Node.js',
    express: 'Express',
    go: 'Go',
    php: 'PHP',
    postgresql: 'PostgreSQL',
    mysql: 'MySQL',
    sqlServer: 'SQL Server',
    sqlite: 'SQLite',
    prisma: 'Prisma',
    java: 'Java',
    python: 'Python',
    cpp: 'C++',
    aws: 'AWS',
    cloudflareR2: 'Cloudflare R2',
    docker: 'Docker',
    git: 'Git',
    github: 'GitHub',
    linux: 'Linux',
  };

  return names[skillKey] ?? skillKey;
}

export default function MainframeHome() {
  const { t } = useTranslation();

  return (
    <div>
      <MainframeSection label="system profile" title={t('home.hero.name')}>
        <div className="grid gap-4">
          <p className="uppercase text-[#37ff73]/75">{t('home.hero.eyebrow')}</p>
          <p className="text-lg uppercase text-[#37ff73]">{t('home.hero.subtitle')}</p>
          <p className="max-w-4xl text-[#37ff73]/80">{t('home.hero.description')}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 uppercase">
            <Link to="/projects" className="hover:bg-[#37ff73] hover:text-black">
              {'> '}
              {t('home.hero.primaryButton')}
            </Link>
            <Link to="/contact" className="hover:bg-[#37ff73] hover:text-black">
              {'> '}
              {t('home.hero.secondaryButton')}
            </Link>
          </div>
        </div>
      </MainframeSection>

      <MainframeSection label="about" title={t('home.about.title')}>
        <div className="grid gap-5">
          <p className="max-w-4xl text-[#37ff73]/80">{t('home.about.paragraph2')}</p>
          <dl className="grid gap-3 sm:grid-cols-2">
            {aboutCards.map((card) => (
              <div key={card}>
                <dt className="uppercase text-[#37ff73]/70">
                  {t(`home.about.cards.${card}.label`)}
                </dt>
                <dd className="text-[#37ff73]">{t(`home.about.cards.${card}.value`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </MainframeSection>

      <MainframeSection label="skills" title={t('home.skills.title')}>
        <div className="grid gap-7">
          {skillGroups.map((group) => (
            <div key={group.key}>
              <h3 className="uppercase text-[#37ff73]">
                {t(`home.skills.groups.${group.key}.title`)}
              </h3>
              <p className="mt-2 max-w-4xl text-[#37ff73]/75">
                {t(`home.skills.groups.${group.key}.description`)}
              </p>
              <ul className="mt-3 grid gap-2">
                {group.skills.map((skill) => (
                  <li key={`${group.key}-${skill}`}>
                    {'> '}
                    {getSkillName(skill)} :: {t(`home.skills.descriptions.${skill}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MainframeSection>

      <MainframeProjectList limit={5} />

      <MainframeSection label="timeline" title={t('home.timeline.title')}>
        <p className="mb-6 max-w-4xl text-[#37ff73]/80">{t('home.timeline.subtitle')}</p>
        <ol className="grid gap-5">
          {timelineEvents.map((event) => (
            <li key={event.year} className="border-t border-[#37ff73]/25 pt-4">
              <p className="text-[#37ff73]/75">{event.year}</p>
              <h3 className="uppercase text-[#37ff73]">
                {t(`timeline.events.${event.key}.title`)}
              </h3>
              <p className="mt-2 max-w-4xl text-[#37ff73]/80">
                {t(`timeline.events.${event.key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </MainframeSection>
    </div>
  );
}
