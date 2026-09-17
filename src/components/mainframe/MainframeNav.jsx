import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEra } from '../../context/EraContext.jsx';
import { mainframeAction } from './mainframeStyles.js';
import MainframeSettingsMenu from './MainframeSettingsMenu.jsx';
import { useMainframeSettings } from './MainframeSettingsContext.jsx';

const navItems = [
  { labelKey: 'common.nav.home', path: '/' },
  { labelKey: 'common.mainframe.nav.about', path: '/about', end: true },
  { labelKey: 'common.mainframe.nav.aboutNorman', path: '/about/norman', nested: true },
  { labelKey: 'common.mainframe.nav.aboutNaguirrel', path: '/about/naguirrel', nested: true },
  { labelKey: 'common.nav.projects', path: '/projects' },
  { labelKey: 'common.nav.contact', path: '/contact' },
];

export default function MainframeNav() {
  const { selectedEra } = useEra();
  const { cinemaMode } = useMainframeSettings();
  const { t } = useTranslation();

  return (
    <header className="border-b border-[#37ff73]/55 bg-black">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <NavLink to="/" className={mainframeAction()}>
            {t('common.brand')}
          </NavLink>
          {!cinemaMode ? (
            <p className="mainframe-secondary uppercase text-[#37ff73]/75">
              {t('common.mainframe.nav.era', { era: selectedEra })}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm uppercase">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                mainframeAction(
                  `${item.nested ? 'ml-0 sm:ml-4' : ''} ${
                    isActive ? 'text-[#37ff73]' : 'text-[#37ff73]/75'
                  }`
                )
              }
            >
              {({ isActive }) => `${isActive ? '> ' : '  '}${t(item.labelKey)}`}
            </NavLink>
          ))}
          <MainframeSettingsMenu />
        </div>
      </nav>
    </header>
  );
}
