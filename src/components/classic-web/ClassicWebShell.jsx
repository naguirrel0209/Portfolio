import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eras, useEra } from '../../context/EraContext.jsx';
import { usePixelDesktopSettings } from '../../hooks/usePixelDesktopSettings.js';
import ClassicWebAbout from './ClassicWebAbout.jsx';
import ClassicWebContact from './ClassicWebContact.jsx';
import ClassicWebFooter from './ClassicWebFooter.jsx';
import ClassicWebHeader from './ClassicWebHeader.jsx';
import ClassicWebHome from './ClassicWebHome.jsx';
import ClassicWebProjects from './ClassicWebProjects.jsx';
import ClassicWebWindow from './ClassicWebWindow.jsx';

const languages = ['es', 'en'];

function getRouteKey(pathname) {
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/settings')) return 'settings';
  return 'home';
}

function ClassicWebSettings({ settings }) {
  const { i18n, t } = useTranslation();
  const { selectedEra, setSelectedEra } = useEra();
  const navigate = useNavigate();

  const handleEraChange = (eraId) => {
    setSelectedEra(eraId);

    if (eraId !== 'classic-web') {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="grid gap-5">
      <section className="grid gap-2">
        <h3 className="font-bold text-[#000080]">{t('common.classicWeb.settings.changeEra')}</h3>
        <p>{t('common.classicWeb.settings.changeEraDescription')}</p>
        <div className="flex flex-wrap gap-2">
          {eras.map((era) => (
            <button
              key={era.id}
              type="button"
              className="border-2 border-[#000080] bg-[#ffffcc] px-3 py-1 text-left font-bold text-[#000080] hover:bg-white focus:bg-white"
              aria-pressed={selectedEra === era.id}
              onClick={() => handleEraChange(era.id)}
            >
              {selectedEra === era.id ? '[x] ' : '[ ] '}
              {era.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-2">
        <h3 className="font-bold text-[#000080]">
          {t('common.classicWeb.settings.changeLanguage')}
        </h3>
        <p>{t('common.classicWeb.settings.changeLanguageDescription')}</p>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              className="border-2 border-[#000080] bg-[#ffffcc] px-3 py-1 text-left font-bold text-[#000080] hover:bg-white focus:bg-white"
              aria-pressed={i18n.resolvedLanguage === language}
              onClick={() => i18n.changeLanguage(language)}
            >
              {i18n.resolvedLanguage === language ? '[x] ' : '[ ] '}
              {t(`common.language.${language}`)}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-2">
        <h3 className="font-bold text-[#000080]">{t('common.classicWeb.settings.cinemaMode')}</h3>
        <p>{t('common.classicWeb.settings.cinemaModeDescription')}</p>
        <button
          type="button"
          className="w-fit border-2 border-[#000080] bg-[#ffffcc] px-3 py-1 text-left font-bold text-[#000080] hover:bg-white focus:bg-white"
          aria-pressed={settings.cinemaMode}
          onClick={settings.toggleCinemaMode}
        >
          {settings.cinemaMode ? '[x] ' : '[ ] '}
          {settings.cinemaMode
            ? t('common.classicWeb.settings.on')
            : t('common.classicWeb.settings.off')}
        </button>
      </section>

      <section className="grid gap-2">
        <h3 className="font-bold text-[#000080]">{t('common.classicWeb.settings.textSize')}</h3>
        <p>{t('common.classicWeb.settings.textSizeDescription')}</p>
        <div className="flex flex-wrap gap-2">
          {settings.textSizes.map((size) => (
            <button
              key={size}
              type="button"
              className="border-2 border-[#000080] bg-[#ffffcc] px-3 py-1 text-left font-bold text-[#000080] hover:bg-white focus:bg-white"
              aria-pressed={settings.textSize === size}
              onClick={() => settings.setTextSize(size)}
            >
              {settings.textSize === size ? '[x] ' : '[ ] '}
              {t(`common.classicWeb.settings.textSizes.${size}`)}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function ClassicWebContent({ routeKey, settings }) {
  const { t } = useTranslation();

  if (routeKey === 'settings') {
    return <ClassicWebSettings settings={settings} />;
  }

  if (routeKey === 'about') {
    return <ClassicWebAbout />;
  }

  if (routeKey === 'projects') {
    return <ClassicWebProjects />;
  }

  if (routeKey === 'contact') {
    return <ClassicWebContact />;
  }

  if (routeKey === 'home') {
    return <ClassicWebHome />;
  }

  return (
    <div className="grid gap-4">
      <p>{t(`common.classicWeb.modules.${routeKey}.description`)}</p>
      <div className="border border-dashed border-[#000080] bg-white px-3 py-2 font-mono text-xs text-[#000080]">
        {t('common.classicWeb.modules.placeholder')}
      </div>
    </div>
  );
}

export default function ClassicWebShell() {
  const { t } = useTranslation();
  const location = useLocation();
  const routeKey = getRouteKey(location.pathname);
  const settings = usePixelDesktopSettings();

  return (
    <div
      className={[
        'classic-web-root min-h-screen overflow-x-hidden px-3 py-4 font-sans text-[#202020] sm:px-5 sm:py-6',
        settings.cinemaMode ? 'bg-[#5f7190]' : 'bg-[#9bb7d7]',
      ].join(' ')}
      data-classic-cinema={settings.cinemaMode}
      data-classic-text-size={settings.textSize}
    >
      <div className="mx-auto grid w-full max-w-5xl gap-4">
        <ClassicWebHeader />

        <main className="grid gap-4 md:grid-cols-[11rem_1fr]">
          <aside className="h-fit border-2 border-[#000080] bg-[#e8eef8] p-3 text-xs shadow-[4px_4px_0_#808080]">
            <p className="font-mono font-bold uppercase text-[#000080]">
              {t('common.classicWeb.sidebar.title')}
            </p>
            <p className="mt-2 leading-5">{t('common.classicWeb.sidebar.description')}</p>
          </aside>

          <ClassicWebWindow title={t(`common.classicWeb.modules.${routeKey}.title`)}>
            <ClassicWebContent routeKey={routeKey} settings={settings} />
            <Outlet />
          </ClassicWebWindow>
        </main>

        <ClassicWebFooter />
      </div>
    </div>
  );
}
