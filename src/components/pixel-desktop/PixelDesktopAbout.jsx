import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { featuredProjects } from '../../data/projects.js';
import { timelineEvents } from '../../data/timeline.js';

const profileItems = ['location', 'education', 'goal'];
const skillGroups = ['frontend', 'backend', 'databases', 'languages', 'cloudTools'];
const interestGroups = ['frontend', 'backend', 'databases', 'cloudTools'];

function PixelDocumentSection({ children, title }) {
  return (
    <section className="border-t-2 border-[#808080] pt-4">
      <h2 className="mb-2 text-sm font-bold uppercase">{title}</h2>
      {children}
    </section>
  );
}

function PixelDocumentShell({ children, title }) {
  return (
    <article className="border-2 border-black bg-[#f0f0f0]">
      <div className="border-b-2 border-black bg-[#d8d8d8] px-2 py-1">
        <h2 className="text-sm font-bold uppercase">{title}</h2>
      </div>
      <div className="grid gap-5 p-3 sm:p-4">{children}</div>
    </article>
  );
}

function PixelActionButton({ children, onClick }) {
  return (
    <button
      type="button"
      className="border-2 border-black bg-[#d8d8d8] px-3 py-2 text-left hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function AboutSelector({ onOpenNaguirrel, onOpenNorman }) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4">
      <div className="border-2 border-black bg-[#f0f0f0]">
        <div className="border-b-2 border-black bg-[#d8d8d8] px-2 py-1">
          <h2 className="text-sm font-bold uppercase">{t('common.pixelDesktop.about.selectorTitle')}</h2>
        </div>
        <div className="p-3">
          <p>{t('common.pixelDesktop.about.selectorDescription')}</p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <PixelActionButton onClick={onOpenNorman}>
          {t('common.pixelDesktop.about.modules.norman.label')}
        </PixelActionButton>
        <PixelActionButton onClick={onOpenNaguirrel}>
          {t('common.pixelDesktop.about.modules.naguirrel.label')}
        </PixelActionButton>
      </div>
    </div>
  );
}

function AboutNorman({ onBack }) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-5">
      <PixelActionButton onClick={onBack}>{t('common.pixelDesktop.about.back')}</PixelActionButton>

      <PixelDocumentShell title={t('common.pixelDesktop.about.modules.norman.label')}>
        <PixelDocumentSection title={t('common.pixelDesktop.about.norman.profile')}>
          <p>{t('home.hero.description')}</p>
          <dl className="mt-3 grid gap-2">
            {profileItems.map((item) => (
              <div key={item}>
                <dt className="font-bold">{t(`home.about.cards.${item}.label`)}</dt>
                <dd>{t(`home.about.cards.${item}.value`)}</dd>
              </div>
            ))}
          </dl>
        </PixelDocumentSection>

        <PixelDocumentSection title={t('common.pixelDesktop.about.norman.story')}>
          <p>{t('home.about.paragraph2')}</p>
        </PixelDocumentSection>

        <PixelDocumentSection title={t('common.pixelDesktop.about.norman.education')}>
          <p className="font-bold">{t('home.about.cards.education.value')}</p>
          <p className="mt-2">{t('timeline.events.programmingStart.description')}</p>
          <p className="mt-2">{t('timeline.events.university.description')}</p>
        </PixelDocumentSection>

        <PixelDocumentSection title={t('common.pixelDesktop.about.norman.path')}>
          <ol className="grid gap-3">
            {timelineEvents.map((event) => (
              <li key={event.year}>
                <p className="font-bold">{event.year}</p>
                <p>{t(`timeline.events.${event.key}.title`)}</p>
                <p className="mt-1">{t(`timeline.events.${event.key}.description`)}</p>
              </li>
            ))}
          </ol>
        </PixelDocumentSection>

        <PixelDocumentSection title={t('common.pixelDesktop.about.norman.goals')}>
          <p className="font-bold">{t('home.about.cards.goal.value')}</p>
          <p className="mt-2">{t('home.about.paragraph2')}</p>
        </PixelDocumentSection>

        <PixelDocumentSection title={t('common.pixelDesktop.about.norman.future')}>
          <p>{t('common.pixelDesktop.about.norman.futureDescription')}</p>
        </PixelDocumentSection>
      </PixelDocumentShell>
    </div>
  );
}

function AboutNaguirrel({ onBack }) {
  const { t } = useTranslation();
  const selectedProjects = featuredProjects.slice(0, 3);
  const technologies = Array.from(
    new Set(featuredProjects.flatMap((project) => project.technologies)),
  );

  return (
    <div className="grid gap-5">
      <PixelActionButton onClick={onBack}>{t('common.pixelDesktop.about.back')}</PixelActionButton>

      <PixelDocumentShell title={t('common.pixelDesktop.about.modules.naguirrel.label')}>
        <PixelDocumentSection title={t('common.pixelDesktop.about.naguirrel.identity')}>
          <p>{t('common.pixelDesktop.about.naguirrel.identityDescription')}</p>
        </PixelDocumentSection>

        <PixelDocumentSection title={t('common.pixelDesktop.about.naguirrel.skills')}>
          <p className="font-bold">{t('home.about.cards.focus.value')}</p>
          <div className="mt-3 grid gap-3">
            {skillGroups.map((group) => (
              <div key={group}>
                <p className="font-bold">{t(`home.skills.groups.${group}.title`)}</p>
                <p>{t(`home.skills.groups.${group}.description`)}</p>
              </div>
            ))}
          </div>
        </PixelDocumentSection>

        <PixelDocumentSection title={t('common.pixelDesktop.about.naguirrel.technologies')}>
          <ul className="grid gap-1">
            {technologies.map((technology) => (
              <li key={technology}>{t(`projects.technologies.${technology}`)}</li>
            ))}
          </ul>
        </PixelDocumentSection>

        <PixelDocumentSection title={t('common.pixelDesktop.about.naguirrel.interests')}>
          <ul className="grid gap-3">
            {interestGroups.map((group) => (
              <li key={group}>
                <p className="font-bold">{t(`home.skills.groups.${group}.title`)}</p>
                <p>{t(`home.skills.groups.${group}.description`)}</p>
              </li>
            ))}
          </ul>
        </PixelDocumentSection>

        <PixelDocumentSection title={t('common.pixelDesktop.about.naguirrel.projects')}>
          <div className="grid gap-4">
            {selectedProjects.map((project) => (
              <article key={project.slug}>
                <p className="font-bold">{t(`projects.items.${project.key}.name`)}</p>
                <p>{t(`projects.items.${project.key}.description`)}</p>
              </article>
            ))}
            <Link
              to="/projects"
              className="w-fit border-2 border-black bg-[#d8d8d8] px-3 py-2 hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
            >
              {t('projects.actions.viewAll')}
            </Link>
          </div>
        </PixelDocumentSection>
      </PixelDocumentShell>
    </div>
  );
}

export default function PixelDesktopAbout({ selectedView, setSelectedView }) {
  if (selectedView === 'norman') {
    return <AboutNorman onBack={() => setSelectedView('selector')} />;
  }

  if (selectedView === 'naguirrel') {
    return <AboutNaguirrel onBack={() => setSelectedView('selector')} />;
  }

  return (
    <AboutSelector
      onOpenNaguirrel={() => setSelectedView('naguirrel')}
      onOpenNorman={() => setSelectedView('norman')}
    />
  );
}
