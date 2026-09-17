import { useTranslation } from 'react-i18next';
import cvPlaceholder from '../../assets/cv/CV_NormanAguirre.pdf';
import { useContactForm } from '../../hooks/useContactForm.js';

const contactDetails = [
  { labelKey: 'name', valueKey: 'common.brand' },
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
  'w-full border-2 border-[#000080] bg-white px-2 py-2 text-[#202020] outline-none focus:bg-[#ffffcc]';

export default function ClassicWebContact() {
  const { t } = useTranslation();
  const { errors, formData, handleChange, handleSubmit, isSubmitting, status } =
    useContactForm();

  return (
    <div className="grid gap-5">
      <section className="border-2 border-[#000080] bg-[#fffdf0]">
        <h3 className="border-b-2 border-[#000080] bg-[#c0d8ff] px-3 py-2 font-mono text-xs font-bold uppercase text-[#000080]">
          {t('common.classicWeb.contact.infoTitle')}
        </h3>
        <dl className="grid gap-0">
          {contactDetails.map((item) => {
            const value = item.valueKey ? t(item.valueKey) : item.value;

            return (
              <div
                key={item.labelKey}
                className="grid border-b border-[#000080] last:border-b-0 sm:grid-cols-[11rem_1fr]"
              >
                <dt className="bg-[#e8eef8] px-3 py-2 font-mono text-xs font-bold uppercase text-[#000080]">
                  {t(`contact.details.${item.labelKey}`)}
                </dt>
                <dd className="break-words px-3 py-2">
                  {item.href ? (
                    <a
                      className="font-bold text-[#000080] underline"
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section className="border-2 border-[#000080] bg-[#fffdf0]">
        <h3 className="border-b-2 border-[#000080] bg-[#c0d8ff] px-3 py-2 font-mono text-xs font-bold uppercase text-[#000080]">
          {t('contact.cv.title')}
        </h3>
        <div className="grid gap-3 p-3">
          <p>{t('contact.cv.description')}</p>
          <a
            className="w-fit border-2 border-[#000080] bg-[#ffffcc] px-3 py-2 font-bold text-[#000080] underline hover:bg-white focus:bg-white"
            href={cvPlaceholder}
            download="CV-Norman-Aguirre.pdf"
          >
            {t('contact.cv.button')}
          </a>
        </div>
      </section>

      <form
        className="grid gap-4 border-2 border-[#000080] bg-[#fffdf0] p-3"
        noValidate
        onSubmit={handleSubmit}
      >
        <h3 className="font-mono text-xs font-bold uppercase text-[#000080]">
          {t('contact.form.title')}
        </h3>

        <label className="grid gap-1">
          <span className="font-bold">{t('contact.form.name')}</span>
          <input
            className={fieldClass}
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('contact.form.namePlaceholder')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'classic-contact-name-error' : undefined}
          />
          {errors.name ? (
            <span id="classic-contact-name-error" className="font-bold text-[#800000]">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1">
          <span className="font-bold">{t('contact.form.email')}</span>
          <input
            className={fieldClass}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('contact.form.emailPlaceholder')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'classic-contact-email-error' : undefined}
          />
          {errors.email ? (
            <span id="classic-contact-email-error" className="font-bold text-[#800000]">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1">
          <span className="font-bold">{t('contact.form.subject')}</span>
          <input
            className={fieldClass}
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t('contact.form.subjectPlaceholder')}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'classic-contact-subject-error' : undefined}
          />
          {errors.subject ? (
            <span id="classic-contact-subject-error" className="font-bold text-[#800000]">
              {errors.subject}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1">
          <span className="font-bold">{t('contact.form.message')}</span>
          <textarea
            className={`${fieldClass} min-h-32 resize-y`}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('contact.form.messagePlaceholder')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'classic-contact-message-error' : undefined}
          />
          {errors.message ? (
            <span id="classic-contact-message-error" className="font-bold text-[#800000]">
              {errors.message}
            </span>
          ) : null}
        </label>

        <button
          type="submit"
          className="w-fit border-2 border-[#000080] bg-[#ffffcc] px-4 py-2 font-bold text-[#000080] underline hover:bg-white focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
        </button>

        {status.message ? (
          <p
            className={[
              'border-2 px-3 py-2 font-bold',
              status.type === 'success'
                ? 'border-[#006400] bg-[#e8ffe8] text-[#006400]'
                : 'border-[#800000] bg-[#ffe8e8] text-[#800000]',
            ].join(' ')}
            role="status"
          >
            {status.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
