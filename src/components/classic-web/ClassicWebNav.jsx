import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'projects', path: '/projects' },
  { key: 'contact', path: '/contact' },
  { key: 'settings', path: '/settings' },
];

const navClassName = ({ isActive }) =>
  [
    'border border-[#000080] px-3 py-1 font-bold underline',
    isActive ? 'bg-[#000080] text-white' : 'bg-[#ffffcc] text-[#000080] hover:bg-white',
  ].join(' ');

export default function ClassicWebNav() {
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t('common.classicWeb.navLabel')}
      className="flex flex-wrap gap-2 border-y-2 border-[#000080] bg-[#c0d8ff] px-3 py-2 text-sm"
    >
      {navItems.map((item) => (
        <NavLink key={item.path} to={item.path} className={navClassName}>
          {t(`common.classicWeb.nav.${item.key}`)}
        </NavLink>
      ))}
    </nav>
  );
}
