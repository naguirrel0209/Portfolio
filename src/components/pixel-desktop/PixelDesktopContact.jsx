import { useTranslation } from 'react-i18next';
import cvPlaceholder from '../../assets/cv/CV_NormanAguirre.pdf';
import { useContactForm } from '../../hooks/useContactForm.js';

const contactDetails = [
  {
    labelKey: 'name',
    value: 'Norman Aguirre',
  },
  {
    labelKey: 'linkedin',
    value: 'linkedin.com/in/norman-aguirre-lepe-6679a5340',
    href: 'https://linkedin.com/in/norman-aguirre-lepe-6679a5340',
  },
  {
    labelKey: 'githubPrimary',
    value: 'github.com/Naguirrel',
    href: 'https://github.com/Naguirrel',
  },
  {
    labelKey: 'githubPersonal',
    value: 'github.com/naguirrel0209',
    href: 'https://github.com/naguirrel0209',
  },
  {
    labelKey: 'personalEmail',
    value: 'normanjraguirre@gmail.com',
    href: 'mailto:normanjraguirre@gmail.com',
  },
  {
    labelKey: 'institutionalEmail',
    value: 'agu24479@uvg.edu.gt',
    href: 'mailto:agu24479@uvg.edu.gt',
  },
];

const fieldClass =
  'w-full border-2 border-black bg-white px-2 py-2 text-sm text-black outline-none placeholder:text-[#606060] focus:bg-[#ffffcc]';

function PixelPanel({ children, title }) {
  return (
    <section className="border-2 border-black bg-[#f0f0f0]">
      <div className="border-b-2 border-black bg-[#d8d8d8] px-2 py-1">
        <h2 className="text-sm font-bold uppercase">{title}</h2>
      </div>
      <div className="p-3">{children}</div>
    </section>
  );
}

function PixelSystemMessage({ children, type }) {
  const toneClass =
    type === 'success'
      ? 'border-[#008000] bg-[#e8ffe8]'
      : 'border-[#800000] bg-[#ffe8e8]';

  return (
    <p className={`border-2 px-3 py-2 text-sm font-bold ${toneClass}`}>
      {children}
    </p>
  );
}

export default function PixelDesktopContact() {
  const { t } = useTranslation();
  const { errors, formData, handleChange, handleSubmit, isSubmitting, status } =
    useContactForm();

  return (
    <div className="grid gap-4">
      <PixelPanel title={t('common.pixelDesktop.contact.infoTitle')}>
        <dl className="grid gap-3">
          {contactDetails.map((item) => (
            <div
              key={item.labelKey}
              className="grid gap-1 border-b-2 border-[#808080] pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[11rem_1fr]"
            >
              <dt className="font-bold uppercase">{t(`contact.details.${item.labelKey}`)}</dt>
              <dd className="min-w-0 break-words">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="underline hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </PixelPanel>

      <PixelPanel title={t('contact.form.title')}>
        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-2">
            <span className="font-bold">{t('contact.form.name')}</span>
            <input
              className={fieldClass}
              name="name"
              type="text"
              placeholder={t('contact.form.namePlaceholder')}
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'pixel-contact-name-error' : undefined}
            />
            {errors.name ? (
              <span id="pixel-contact-name-error" className="text-sm font-bold text-[#800000]">
                {errors.name}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="font-bold">{t('contact.form.email')}</span>
            <input
              className={fieldClass}
              name="email"
              type="email"
              placeholder={t('contact.form.emailPlaceholder')}
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'pixel-contact-email-error' : undefined}
            />
            {errors.email ? (
              <span id="pixel-contact-email-error" className="text-sm font-bold text-[#800000]">
                {errors.email}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="font-bold">{t('contact.form.subject')}</span>
            <input
              className={fieldClass}
              name="subject"
              type="text"
              placeholder={t('contact.form.subjectPlaceholder')}
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'pixel-contact-subject-error' : undefined}
            />
            {errors.subject ? (
              <span id="pixel-contact-subject-error" className="text-sm font-bold text-[#800000]">
                {errors.subject}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="font-bold">{t('contact.form.message')}</span>
            <textarea
              className={`${fieldClass} min-h-36 resize-y`}
              name="message"
              placeholder={t('contact.form.messagePlaceholder')}
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'pixel-contact-message-error' : undefined}
            />
            {errors.message ? (
              <span id="pixel-contact-message-error" className="text-sm font-bold text-[#800000]">
                {errors.message}
              </span>
            ) : null}
          </label>

          <button
            type="submit"
            className="w-fit border-2 border-black bg-[#d8d8d8] px-3 py-2 font-bold hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white disabled:cursor-not-allowed disabled:text-[#606060]"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
          </button>

          {status.message ? (
            <PixelSystemMessage type={status.type}>{status.message}</PixelSystemMessage>
          ) : null}
        </form>
      </PixelPanel>

      <PixelPanel title={t('contact.cv.title')}>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <p>{t('contact.cv.description')}</p>
          <a
            href={cvPlaceholder}
            download="CV-Norman-Aguirre.pdf"
            className="w-fit border-2 border-black bg-[#d8d8d8] px-3 py-2 font-bold hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
          >
            {t('contact.cv.button')}
          </a>
        </div>
      </PixelPanel>
    </div>
  );
}
