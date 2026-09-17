import { useTranslation } from 'react-i18next';
import { timelineEvents } from '../../data/timeline.js';
import MainframeSection from './MainframeSection.jsx';
import MainframeTypedText from './MainframeTypedText.jsx';

const profileItems = ['location', 'education', 'goal'];

export default function MainframeAboutNorman() {
  const { t } = useTranslation();

  return (
    <div>
      <MainframeSection
        label={t('common.mainframe.aboutNorman.sections.profile.label')}
        title={t('common.mainframe.aboutNorman.sections.profile.title')}
      >
        <div className="grid gap-5">
          <MainframeTypedText
            as="p"
            className="max-w-4xl text-[#37ff73]/80"
            lines={t('home.hero.description')}
          />
          <dl className="grid gap-4">
            {profileItems.map((item) => (
              <div key={item} className="border-t border-[#37ff73]/25 pt-4">
                <dt className="uppercase text-[#37ff73]/70">
                  {t(`home.about.cards.${item}.label`)}
                </dt>
                <dd className="text-[#37ff73]">{t(`home.about.cards.${item}.value`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.aboutNorman.sections.story.label')}
        title={t('common.mainframe.aboutNorman.sections.story.title')}
      >
        <MainframeTypedText
          as="p"
          className="max-w-4xl text-[#37ff73]/80"
          lines={t('home.about.paragraph2')}
        />
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.aboutNorman.sections.academic.label')}
        title={t('common.mainframe.aboutNorman.sections.academic.title')}
      >
        <div className="grid gap-4">
          <p className="uppercase text-[#37ff73]">{t('home.about.cards.education.value')}</p>
          <p className="max-w-4xl text-[#37ff73]/80">
            {t('timeline.events.programmingStart.description')}
          </p>
          <p className="max-w-4xl text-[#37ff73]/80">
            {t('timeline.events.university.description')}
          </p>
        </div>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.aboutNorman.sections.experiences.label')}
        title={t('common.mainframe.aboutNorman.sections.experiences.title')}
      >
        <div className="grid gap-4">
          <p className="max-w-4xl text-[#37ff73]/80">
            {t('timeline.events.hackathons.description')}
          </p>
          <p className="max-w-4xl text-[#37ff73]/80">
            {t('timeline.events.leadership.description')}
          </p>
        </div>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.aboutNorman.sections.goals.label')}
        title={t('common.mainframe.aboutNorman.sections.goals.title')}
      >
        <div className="grid gap-3">
          <p className="uppercase text-[#37ff73]">{t('home.about.cards.goal.value')}</p>
          <p className="max-w-4xl text-[#37ff73]/80">{t('home.about.paragraph2')}</p>
        </div>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.aboutNorman.sections.timeline.label')}
        title={t('common.mainframe.aboutNorman.sections.timeline.title')}
      >
        <ol className="grid gap-6">
          {timelineEvents.map((event) => (
            <li key={event.year} className="border-t border-[#37ff73]/25 pt-5">
              <p className="text-[#37ff73]/70">{event.year}</p>
              <h3 className="mt-1 uppercase text-[#37ff73]">
                {t(`timeline.events.${event.key}.title`)}
              </h3>
              <p className="mt-2 max-w-4xl text-[#37ff73]/80">
                {t(`timeline.events.${event.key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </MainframeSection>
    </div>
  );
}
