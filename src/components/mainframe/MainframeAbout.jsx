import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainframeSection from './MainframeSection.jsx';
import MainframeTypedText from './MainframeTypedText.jsx';
import { mainframeAction } from './mainframeStyles.js';

export default function MainframeAbout() {
  const { t } = useTranslation();
  const aboutModules = [
    {
      label: t('common.mainframe.about.modules.norman.label'),
      path: '/about/norman',
      description: t('common.mainframe.about.modules.norman.description'),
    },
    {
      label: t('common.mainframe.about.modules.naguirrel.label'),
      path: '/about/naguirrel',
      description: t('common.mainframe.about.modules.naguirrel.description'),
    },
  ];

  return (
    <MainframeSection
      label={t('common.mainframe.about.label')}
      title={t('common.mainframe.about.title')}
    >
      <div className="grid gap-8">
        <MainframeTypedText
          as="p"
          className="max-w-3xl text-[#37ff73]/80"
          lines={t('common.mainframe.about.description')}
        />

        <ul className="grid gap-5">
          {aboutModules.map((module) => (
            <li key={module.path} className="border-t border-[#37ff73]/25 pt-5">
              <Link to={module.path} className={mainframeAction()}>
                {'> '}
                {module.label}
              </Link>
              <p className="mainframe-secondary mt-2 max-w-3xl text-[#37ff73]/70">
                {module.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </MainframeSection>
  );
}
