import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PixelDesktopIcon from './PixelDesktopIcon.jsx';
import PixelDesktopTaskbar from './PixelDesktopTaskbar.jsx';
import PixelDesktopWindow from './PixelDesktopWindow.jsx';

function getRouteKey(pathname) {
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/settings')) return 'settings';
  return 'home';
}

export default function PixelDesktopShell() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
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

  const activeItem = items.find((item) => item.key === routeKey) ?? {
    label: t('common.pixelDesktop.window.defaultTitle'),
  };

  const openWindow = () => {
    setIsWindowOpen(true);
    setIsMinimized(false);
    setIsStartOpen(false);
  };

  const closeWindow = () => {
    setIsWindowOpen(false);
    setIsMinimized(false);
  };

  const restoreWindow = () => {
    setIsWindowOpen(true);
    setIsMinimized(false);
  };

  const maximizeWindow = () => {
    setIsWindowOpen(true);
    setIsMinimized(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#5577aa] pb-12 font-sans text-black">
      <div className="grid w-fit grid-cols-1 gap-5 p-5">
        {items.map((item) => (
          <PixelDesktopIcon
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            onOpen={openWindow}
          />
        ))}
      </div>

      {isWindowOpen ? (
        <PixelDesktopWindow
          title={activeItem.label}
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
          <div className="grid gap-4 text-sm">
            <p className="font-bold">{t('common.pixelDesktop.window.status')}</p>
            <p>{t(`common.pixelDesktop.modules.${routeKey}.description`)}</p>
            <div className="flex flex-wrap gap-2">
              {items
                .filter((item) => item.key !== routeKey)
                .map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="border-2 border-black bg-[#d8d8d8] px-2 py-1 hover:bg-[#000080] hover:text-white"
                    onClick={openWindow}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
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
        onOpenItem={openWindow}
        onRestoreWindow={restoreWindow}
        onToggleStart={() => setIsStartOpen((current) => !current)}
        showWindowButton={isWindowOpen}
        startLabel={t('common.pixelDesktop.taskbar.start')}
      />
    </div>
  );
}
