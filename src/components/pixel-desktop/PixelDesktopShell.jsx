import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEra } from '../../context/EraContext.jsx';
import { usePixelDesktopSettings } from '../../hooks/usePixelDesktopSettings.js';
import PixelDesktopAbout from './PixelDesktopAbout.jsx';
import PixelDesktopContact from './PixelDesktopContact.jsx';
import PixelDesktopIcon from './PixelDesktopIcon.jsx';
import PixelDesktopProjects from './PixelDesktopProjects.jsx';
import PixelDesktopTaskbar from './PixelDesktopTaskbar.jsx';
import PixelDesktopWindow from './PixelDesktopWindow.jsx';

function getRouteKey(pathname) {
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/settings')) return 'settings';
  return 'home';
}

function PixelDesktopSettingsPanel({
  cinemaMode,
  eras,
  i18n,
  onSelectEra,
  selectedEra,
  setTextSize,
  t,
  textSize,
  textSizes,
  toggleCinemaMode,
}) {
  const languages = [
    { id: 'es', label: t('common.language.es') },
    { id: 'en', label: t('common.language.en') },
  ];

  return (
    <div className="grid gap-5 border-t-2 border-[#808080] pt-4">
      <section className="grid gap-2">
        <h2 className="text-sm font-bold">{t('common.pixelDesktop.settings.changeEra')}</h2>
        <p>{t('common.pixelDesktop.settings.changeEraDescription')}</p>
        <div className="flex flex-wrap gap-2">
          {eras.map((era) => (
            <button
              key={era.id}
              type="button"
              className="border-2 border-black bg-[#d8d8d8] px-2 py-1 text-left hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
              onClick={() => onSelectEra(era.id)}
            >
              {selectedEra === era.id ? '[x] ' : '[ ] '}
              {era.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-2">
        <h2 className="text-sm font-bold">{t('common.pixelDesktop.settings.changeLanguage')}</h2>
        <p>{t('common.pixelDesktop.settings.changeLanguageDescription')}</p>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language.id}
              type="button"
              className="border-2 border-black bg-[#d8d8d8] px-2 py-1 text-left hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
              onClick={() => i18n.changeLanguage(language.id)}
            >
              {i18n.resolvedLanguage === language.id ? '[x] ' : '[ ] '}
              {language.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-2">
        <h2 className="text-sm font-bold">{t('common.pixelDesktop.settings.cinemaMode')}</h2>
        <p>{t('common.pixelDesktop.settings.cinemaModeDescription')}</p>
        <button
          type="button"
          className="w-fit border-2 border-black bg-[#d8d8d8] px-2 py-1 text-left hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
          onClick={toggleCinemaMode}
        >
          {cinemaMode ? '[x] ' : '[ ] '}
          {cinemaMode
            ? t('common.pixelDesktop.settings.on')
            : t('common.pixelDesktop.settings.off')}
        </button>
      </section>

      <section className="grid gap-2">
        <h2 className="text-sm font-bold">{t('common.pixelDesktop.settings.textSize')}</h2>
        <p>{t('common.pixelDesktop.settings.textSizeDescription')}</p>
        <div className="flex flex-wrap gap-2">
          {textSizes.map((size) => (
            <button
              key={size}
              type="button"
              className="border-2 border-black bg-[#d8d8d8] px-2 py-1 text-left hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
              onClick={() => setTextSize(size)}
            >
              {textSize === size ? '[x] ' : '[ ] '}
              {t(`common.pixelDesktop.settings.textSizes.${size}`)}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function PixelDesktopShell() {
  const { t, i18n } = useTranslation();
  const { eras, selectedEra, setSelectedEra } = useEra();
  const pixelSettings = usePixelDesktopSettings();
  const location = useLocation();
  const navigate = useNavigate();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [aboutView, setAboutView] = useState('selector');
  const routeKey = getRouteKey(location.pathname);

  const items = useMemo(
    () => [
      { icon: 'i', key: 'about', label: t('common.pixelDesktop.shortcuts.about'), to: '/about' },
      { icon: 'P', key: 'projects', label: t('common.pixelDesktop.shortcuts.projects'), to: '/projects' },
      { icon: '@', key: 'contact', label: t('common.pixelDesktop.shortcuts.contact'), to: '/contact' },
      { icon: '*', key: 'settings', label: t('common.pixelDesktop.shortcuts.settings'), to: '/settings' },
    ],
    [i18n.resolvedLanguage, t],
  );

  const activeItem =
    routeKey === 'about'
      ? { label: t('common.pixelDesktop.about.windowTitle') }
      : routeKey === 'projects'
        ? { label: t('common.pixelDesktop.projects.windowTitle') }
        : routeKey === 'contact'
          ? { label: t('common.pixelDesktop.contact.windowTitle') }
      : items.find((item) => item.key === routeKey) ?? {
          label: t('common.pixelDesktop.window.defaultTitle'),
        };

  useEffect(() => {
    if (routeKey === 'about') {
      setAboutView('selector');
    }
  }, [location.pathname, routeKey]);

  const openWindow = (itemKey) => {
    if (itemKey === 'about') {
      setAboutView('selector');
    }

    setIsWindowOpen(true);
    setIsMaximized(false);
    setIsMinimized(false);
    setIsStartOpen(false);
  };

  const closeWindow = () => {
    setIsWindowOpen(false);
    setIsMaximized(false);
    setIsMinimized(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || isStartOpen || !isWindowOpen || isMinimized) {
        return;
      }

      closeWindow();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMinimized, isStartOpen, isWindowOpen]);

  const restoreWindow = () => {
    setIsWindowOpen(true);
    setIsMinimized(false);
  };

  const maximizeWindow = () => {
    setIsWindowOpen(true);
    setIsMinimized(false);
    setIsMaximized((current) => !current);
  };

  const closeStartMenu = useCallback(() => {
    setIsStartOpen(false);
  }, []);

  const handleSelectEra = (eraId) => {
    if (eraId !== selectedEra && location.pathname === '/settings') {
      navigate('/', { replace: true });
    }

    setSelectedEra(eraId);
    setIsWindowOpen(true);
    setIsMaximized(false);
    setIsMinimized(false);
    setIsStartOpen(false);
  };

  return (
    <div
      className={`pixel-desktop-root relative min-h-screen overflow-x-hidden pb-12 font-sans text-black ${
        pixelSettings.cinemaMode ? 'bg-[#1c2942]' : 'bg-[#5577aa]'
      }`}
      data-pixel-cinema={pixelSettings.cinemaMode ? 'true' : 'false'}
      data-pixel-text-size={pixelSettings.textSize}
    >
      <div
        className={`grid w-fit grid-cols-1 gap-5 p-5 transition-opacity ${
          pixelSettings.cinemaMode && isWindowOpen && !isMinimized ? 'opacity-30' : 'opacity-100'
        }`}
      >
        {items.map((item) => (
          <PixelDesktopIcon
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            onOpen={() => openWindow(item.key)}
          />
        ))}
      </div>

      {isWindowOpen ? (
        <PixelDesktopWindow
          title={activeItem.label}
          isMaximized={isMaximized}
          isMinimized={isMinimized}
          labels={{
            close: t('common.pixelDesktop.window.close'),
            maximize: t('common.pixelDesktop.window.maximize'),
            minimize: t('common.pixelDesktop.window.minimize'),
          }}
          onClose={closeWindow}
          onMaximize={maximizeWindow}
          onMinimize={() => setIsMinimized(true)}
        >
          <div className="pixel-desktop-content grid gap-4 text-sm">
            {routeKey === 'about' ? (
              <PixelDesktopAbout selectedView={aboutView} setSelectedView={setAboutView} />
            ) : routeKey === 'projects' ? (
              <PixelDesktopProjects />
            ) : routeKey === 'contact' ? (
              <PixelDesktopContact />
            ) : (
              <>
                <p className="font-bold">{t('common.pixelDesktop.window.status')}</p>
                <p>{t(`common.pixelDesktop.modules.${routeKey}.description`)}</p>
                {routeKey === 'settings' ? (
                  <PixelDesktopSettingsPanel
                    eras={eras}
                    cinemaMode={pixelSettings.cinemaMode}
                    i18n={i18n}
                    onSelectEra={handleSelectEra}
                    selectedEra={selectedEra}
                    setTextSize={pixelSettings.setTextSize}
                    t={t}
                    textSize={pixelSettings.textSize}
                    textSizes={pixelSettings.textSizes}
                    toggleCinemaMode={pixelSettings.toggleCinemaMode}
                  />
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {items
                    .filter((item) => item.key !== routeKey)
                    .map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="border-2 border-black bg-[#d8d8d8] px-2 py-1 hover:bg-[#000080] hover:text-white"
                        onClick={() => openWindow(item.key)}
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
              </>
            )}
            <Outlet />
          </div>
        </PixelDesktopWindow>
      ) : null}

      <PixelDesktopTaskbar
        activeTitle={activeItem.label}
        clockLabel={t('common.pixelDesktop.taskbar.ready')}
        isStartOpen={isStartOpen}
        items={items}
        menuTitle={t('common.pixelDesktop.startMenu.title')}
        onCloseStart={closeStartMenu}
        onOpenItem={openWindow}
        onRestoreWindow={restoreWindow}
        onToggleStart={() => setIsStartOpen((current) => !current)}
        showWindowButton={isWindowOpen}
        startLabel={t('common.pixelDesktop.taskbar.start')}
      />
    </div>
  );
}
