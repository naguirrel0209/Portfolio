import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { featuredProjects } from '../../data/projects.js';
import { timelineEvents } from '../../data/timeline.js';

const homeLinks = [
  { key: 'about', path: '/about' },
  { key: 'projects', path: '/projects' },
  { key: 'contact', path: '/contact' },
  { key: 'settings', path: '/settings' },
];

export default function ClassicWebHome() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-5">
      <section className="grid gap-3 border-2 border-[#000080] bg-[#fffdf0] p-3">
        <p className="font-mono text-xs font-bold uppercase text-[#000080]">
          {t('home.hero.eyebrow')}
        </p>
        <h3 className="font-mono text-xl font-bold text-[#000080]">{t('common.brand')}</h3>
        <p>{t('home.hero.description')}</p>
      </section>

      <section className="border-2 border-[#000080] bg-[#fffdf0]">
        <h3 className="border-b-2 border-[#000080] bg-[#c0d8ff] px-3 py-2 font-mono text-xs font-bold uppercase text-[#000080]">
          {t('common.classicWeb.home.directoryTitle')}
        </h3>
        <ul className="grid gap-2 p-3 sm:grid-cols-2">
          {homeLinks.map((item) => (
            <li key={item.key}>
              <Link className="font-bold text-[#000080] underline" to={item.path}>
                {t(`common.classicWeb.nav.${item.key}`)}
              </Link>
              <p className="mt-1 text-sm">{t(`common.classicWeb.modules.${item.key}.description`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3 border-2 border-[#000080] bg-[#fffdf0] p-3">
        <h3 className="font-mono text-xs font-bold uppercase text-[#000080]">
          {t('home.timeline.title')}
        </h3>
        <ul className="grid gap-2">
          {timelineEvents.slice(0, 3).map((event) => (
            <li key={event.key} className="border border-[#000080] bg-white px-3 py-2">
              <span className="font-mono text-xs font-bold text-[#000080]">{event.year}</span>
              <p className="font-bold">{t(`timeline.events.${event.key}.title`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3 border-2 border-[#000080] bg-[#fffdf0] p-3">
        <h3 className="font-mono text-xs font-bold uppercase text-[#000080]">
          {t('home.featured.title')}
        </h3>
        <ul className="grid gap-2">
          {featuredProjects.slice(0, 3).map((project) => (
            <li key={project.slug}>
              <Link className="font-bold text-[#000080] underline" to={`/projects/${project.slug}`}>
                {t(`projects.items.${project.key}.name`)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
