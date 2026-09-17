import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { featuredProjects } from '../../data/projects.js';
import { timelineEvents } from '../../data/timeline.js';

const skillGroups = ['frontend', 'backend', 'databases', 'languages', 'cloudTools'];
const interestGroups = ['frontend', 'backend', 'databases', 'cloudTools'];

function ClassicAboutSection({ children, title }) {
  return (
    <section className="border-2 border-[#000080] bg-[#fffdf0]">
      <h3 className="border-b-2 border-[#000080] bg-[#c0d8ff] px-3 py-2 font-mono text-xs font-bold uppercase text-[#000080]">
        {title}
      </h3>
      <div className="grid gap-3 p-3">{children}</div>
    </section>
  );
}

function ClassicInfoTable({ rows }) {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border border-[#000080]">
            <th className="w-32 border border-[#000080] bg-[#e8eef8] px-2 py-2 align-top font-bold text-[#000080]">
              {row.label}
            </th>
            <td className="border border-[#000080] px-2 py-2">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AboutSelector({ onSelect }) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4">
      <p>{t('common.classicWeb.about.selectorDescription')}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {['norman', 'naguirrel'].map((profile) => (
          <button
            key={profile}
            type="button"
            className="border-2 border-[#000080] bg-[#ffffcc] px-4 py-4 text-left shadow-[3px_3px_0_#808080] hover:bg-white focus:bg-white"
            onClick={() => onSelect(profile)}
          >
            <span className="block font-mono text-sm font-bold uppercase text-[#000080] underline">
              {t(`common.classicWeb.about.modules.${profile}.title`)}
            </span>
            <span className="mt-2 block text-sm leading-6">
              {t(`common.classicWeb.about.modules.${profile}.description`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BackToSelectorButton({ onBack }) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="w-fit border border-[#000080] bg-[#ffffcc] px-3 py-1 font-bold text-[#000080] underline hover:bg-white focus:bg-white"
      onClick={onBack}
    >
      {t('common.classicWeb.about.backToSelector')}
    </button>
  );
}

function AboutNorman({ onBack }) {
  const { t } = useTranslation();

  const profileRows = [
    {
      label: t('home.about.cards.location.label'),
      value: t('home.about.cards.location.value'),
    },
    {
      label: t('home.about.cards.education.label'),
      value: t('home.about.cards.education.value'),
    },
    {
      label: t('home.about.cards.focus.label'),
      value: t('home.about.cards.focus.value'),
    },
    {
      label: t('home.about.cards.goal.label'),
      value: t('home.about.cards.goal.value'),
    },
  ];

  return (
    <article className="grid gap-4">
      <BackToSelectorButton onBack={onBack} />
      <ClassicAboutSection title={t('common.classicWeb.about.norman.profile')}>
        <p>{t('home.hero.description')}</p>
        <ClassicInfoTable rows={profileRows} />
      </ClassicAboutSection>

      <ClassicAboutSection title={t('common.classicWeb.about.norman.story')}>
        <p>{t('home.about.paragraph2')}</p>
      </ClassicAboutSection>

      <ClassicAboutSection title={t('common.classicWeb.about.norman.education')}>
        <p>{t('timeline.events.university.description')}</p>
      </ClassicAboutSection>

      <ClassicAboutSection title={t('common.classicWeb.about.norman.journey')}>
        <ol className="grid gap-3">
          {timelineEvents.map((event) => (
            <li key={event.key} className="border border-[#000080] bg-white px-3 py-2">
              <p className="font-mono text-xs font-bold text-[#000080]">{event.year}</p>
              <h4 className="font-bold">{t(`timeline.events.${event.key}.title`)}</h4>
              <p>{t(`timeline.events.${event.key}.description`)}</p>
            </li>
          ))}
        </ol>
      </ClassicAboutSection>

      <ClassicAboutSection title={t('common.classicWeb.about.norman.goals')}>
        <p>{t('home.about.cards.goal.value')}</p>
        <p>{t('common.classicWeb.about.norman.futureDescription')}</p>
      </ClassicAboutSection>
    </article>
  );
}

function AboutNaguirrel({ onBack }) {
  const { t } = useTranslation();
  const technologies = useMemo(
    () => [...new Set(featuredProjects.flatMap((project) => project.technologies))],
    [],
  );

  return (
    <article className="grid gap-4">
      <BackToSelectorButton onBack={onBack} />

      <ClassicAboutSection title={t('common.classicWeb.about.naguirrel.identity')}>
        <p>{t('common.classicWeb.about.naguirrel.identityDescription')}</p>
      </ClassicAboutSection>

      <ClassicAboutSection title={t('common.classicWeb.about.naguirrel.skills')}>
        <ul className="grid gap-2">
          {skillGroups.map((group) => (
            <li key={group} className="border border-[#000080] bg-white px-3 py-2">
              <strong className="text-[#000080]">
                {t(`home.skills.groups.${group}.title`)}
              </strong>
              <p>{t(`home.skills.groups.${group}.description`)}</p>
            </li>
          ))}
        </ul>
      </ClassicAboutSection>

      <ClassicAboutSection title={t('common.classicWeb.about.naguirrel.technologies')}>
        <ul className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <li
              key={technology}
              className="border border-[#000080] bg-[#ffffcc] px-2 py-1 font-mono text-xs text-[#000080]"
            >
              {t(`projects.technologies.${technology}`)}
            </li>
          ))}
        </ul>
      </ClassicAboutSection>

      <ClassicAboutSection title={t('common.classicWeb.about.naguirrel.interests')}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {interestGroups.map((group) => (
            <li key={group} className="border border-[#000080] bg-white px-3 py-2">
              {t(`home.skills.groups.${group}.title`)}
            </li>
          ))}
        </ul>
      </ClassicAboutSection>

      <ClassicAboutSection title={t('common.classicWeb.about.naguirrel.featuredProjects')}>
        <ul className="grid gap-3">
          {featuredProjects.slice(0, 3).map((project) => (
            <li key={project.slug} className="border border-[#000080] bg-white px-3 py-2">
              <h4 className="font-bold text-[#000080]">
                {t(`projects.items.${project.key}.name`)}
              </h4>
              <p>{t(`projects.items.${project.key}.description`)}</p>
            </li>
          ))}
        </ul>
        <Link className="font-bold text-[#000080] underline" to="/projects">
          {t('projects.actions.viewAll')}
        </Link>
      </ClassicAboutSection>
    </article>
  );
}

export default function ClassicWebAbout() {
  const [selectedProfile, setSelectedProfile] = useState(null);

  if (selectedProfile === 'norman') {
    return <AboutNorman onBack={() => setSelectedProfile(null)} />;
  }

  if (selectedProfile === 'naguirrel') {
    return <AboutNaguirrel onBack={() => setSelectedProfile(null)} />;
  }

  return <AboutSelector onSelect={setSelectedProfile} />;
}
