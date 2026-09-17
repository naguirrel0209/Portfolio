import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEra } from '../../context/EraContext.jsx';

const navItems = [
  { labelKey: 'common.nav.home', path: '/' },
  { labelKey: 'common.nav.projects', path: '/projects' },
  { labelKey: 'common.nav.contact', path: '/contact' },
];

export default function MainframeNav() {
  const { resetSelectedEra, selectedEra } = useEra();
  const { t } = useTranslation();

  return (
    <header className="border-b border-[#37ff73]/55 bg-black">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <NavLink to="/" className="w-fit uppercase text-[#37ff73] hover:bg-[#37ff73] hover:text-black">
            {t('common.brand')}
          </NavLink>
          <p className="uppercase text-[#37ff73]/75">ERA: {selectedEra}</p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm uppercase">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `w-fit hover:bg-[#37ff73] hover:text-black ${
                  isActive ? 'text-[#37ff73]' : 'text-[#37ff73]/75'
                }`
              }
            >
              {({ isActive }) => `${isActive ? '> ' : '  '}${t(item.labelKey)}`}
            </NavLink>
          ))}
          <button
            type="button"
            className="w-fit bg-transparent p-0 uppercase text-[#37ff73]/75 hover:bg-[#37ff73] hover:text-black"
            onClick={resetSelectedEra}
          >
            CHANGE ERA
          </button>
        </div>
      </nav>
    </header>
  );
}
