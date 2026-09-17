import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MainframeSection from './MainframeSection.jsx';
import MainframeTypedText from './MainframeTypedText.jsx';
import { mainframeAction } from './mainframeStyles.js';

export default function MainframeHome() {
  const { t } = useTranslation();
  const modules = [
    {
      label: t('common.mainframe.home.modules.about.label'),
      path: '/about',
      description: t('common.mainframe.home.modules.about.description'),
    },
    {
      label: t('common.mainframe.home.modules.projects.label'),
      path: '/projects',
      description: t('common.mainframe.home.modules.projects.description'),
    },
    {
      label: t('common.mainframe.home.modules.contact.label'),
      path: '/contact',
      description: t('common.mainframe.home.modules.contact.description'),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-12rem)] py-8">
      <MainframeSection
        label={t('common.mainframe.home.entryLabel')}
        title={t('common.mainframe.home.title')}
      >
        <div className="grid gap-8">
          <div className="grid gap-4">
            <MainframeTypedText
              as="p"
              className="uppercase text-[#37ff73]/75"
              lines={t('common.mainframe.home.sessionReady')}
            />
            <h1 className="text-3xl uppercase leading-tight text-[#37ff73] sm:text-5xl">
              {t('home.hero.name')}
            </h1>
            <p className="text-lg uppercase text-[#37ff73]">{t('home.hero.eyebrow')}</p>
            <p className="max-w-3xl text-[#37ff73]/80">
              {t('home.hero.description')}
            </p>
          </div>

          <div>
            <p className="mb-4 uppercase text-[#37ff73]/75">
              {t('common.mainframe.home.availableModules')}
            </p>
            <ul className="grid gap-4">
              {modules.map((module) => (
                <li key={module.path} className="grid gap-1 sm:grid-cols-[10rem_1fr]">
                  <Link
                    to={module.path}
                    className={mainframeAction()}
                  >
                    {'> '}
                    {module.label}
                  </Link>
                  <span className="mainframe-secondary text-[#37ff73]/70">
                    {module.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MainframeSection>
    </div>
  );
}
