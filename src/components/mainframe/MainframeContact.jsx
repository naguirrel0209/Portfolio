import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cvPlaceholder from '../../assets/cv/CV_NormanAguirre.pdf';
import MainframeSection from './MainframeSection.jsx';
import { mainframeAction } from './mainframeStyles.js';

const contactDetails = [
  { labelKey: 'name', value: 'Norman Aguirre' },
  {
    labelKey: 'linkedin',
    value: 'linkedin.com/in/norman-aguirre-lepe-6679a5340',
    href: 'https://linkedin.com/in/norman-aguirre-lepe-6679a5340',
  },
  { labelKey: 'githubPrimary', value: 'github.com/Naguirrel', href: 'https://github.com/Naguirrel' },
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

const initialFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldClass =
  'w-full border border-[#37ff73]/55 bg-black px-3 py-2 font-mono text-[#37ff73] outline-none placeholder:text-[#37ff73]/45 focus:border-[#37ff73]';

function validateForm(values, t) {
  const nextErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = t('contact.form.errors.name');
  }

  if (!values.email.trim()) {
    nextErrors.email = t('contact.form.errors.email');
  } else if (!emailRegex.test(values.email.trim())) {
    nextErrors.email = t('contact.form.errors.emailInvalid');
  }

  if (!values.subject.trim()) {
    nextErrors.subject = t('contact.form.errors.subject');
  }

  if (!values.message.trim()) {
    nextErrors.message = t('contact.form.errors.message');
  }

  return nextErrors;
}

export default function MainframeContact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const { i18n, t } = useTranslation();
  const isSubmitting = status.type === 'loading';

  useEffect(() => {
    if (!status.message || status.type === 'loading') {
      return undefined;
    }

    const timer = window.setTimeout(() => setStatus({ type: 'idle', message: '' }), 5200);
    return () => window.clearTimeout(timer);
  }, [status.message, status.type]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      return;
    }

    setErrors(validateForm(formData, t));
  }, [i18n.resolvedLanguage, t]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(formData, t);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ type: 'idle', message: '' });
      return;
    }

    setErrors({});
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors(data.errors ?? {});
        throw new Error(data.message ?? t('contact.form.error'));
      }

      setFormData(initialFormData);
      setStatus({ type: 'success', message: t('contact.form.success') });
    } catch {
      setStatus({ type: 'error', message: t('contact.form.error') });
    }
  };

  return (
    <div>
      <MainframeSection
        label={t('common.mainframe.contact.sections.contact')}
        title={t('contact.title')}
      >
        <p className="mainframe-secondary mb-6 max-w-4xl text-[#37ff73]/80">
          {t('contact.subtitle')}
        </p>
        <dl className="grid gap-3">
          {contactDetails.map((item) => (
            <div key={item.labelKey} className="grid gap-1 sm:grid-cols-[14rem_1fr]">
              <dt className="uppercase text-[#37ff73]/70">{t(`contact.details.${item.labelKey}`)}</dt>
              <dd className="break-words">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className={mainframeAction()}
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
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.contact.sections.message')}
        title={t('contact.form.title')}
      >
        <form className="grid max-w-3xl gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="uppercase text-[#37ff73]/70">{t('contact.form.name')}</span>
            <input
              className={fieldClass}
              name="name"
              type="text"
              placeholder={t('contact.form.namePlaceholder')}
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <span className="text-red-300">{errors.name}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="uppercase text-[#37ff73]/70">{t('contact.form.email')}</span>
            <input
              className={fieldClass}
              name="email"
              type="email"
              placeholder={t('contact.form.emailPlaceholder')}
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <span className="text-red-300">{errors.email}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="uppercase text-[#37ff73]/70">{t('contact.form.subject')}</span>
            <input
              className={fieldClass}
              name="subject"
              type="text"
              placeholder={t('contact.form.subjectPlaceholder')}
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={Boolean(errors.subject)}
            />
            {errors.subject ? <span className="text-red-300">{errors.subject}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="uppercase text-[#37ff73]/70">{t('contact.form.message')}</span>
            <textarea
              className={`${fieldClass} min-h-36 resize-y`}
              name="message"
              placeholder={t('contact.form.messagePlaceholder')}
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message ? <span className="text-red-300">{errors.message}</span> : null}
          </label>

          <button
            type="submit"
            className={mainframeAction('border border-[#37ff73]/55 px-3 py-2 disabled:opacity-60')}
            disabled={isSubmitting}
          >
            {'> '}
            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
          </button>

          {status.message ? (
            <p className={status.type === 'success' ? 'text-[#37ff73]' : 'text-red-300'}>
              {status.message}
            </p>
          ) : null}
        </form>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.contact.sections.cv')}
        title={t('contact.cv.title')}
      >
        <p className="mainframe-secondary mb-4 max-w-4xl text-[#37ff73]/80">
          {t('contact.cv.description')}
        </p>
        <a
          href={cvPlaceholder}
          download="CV-Norman-Aguirre.pdf"
          className={mainframeAction()}
        >
          {'> '}
          {t('contact.cv.button')}
        </a>
      </MainframeSection>

      <MainframeSection
        label={t('common.mainframe.contact.sections.next')}
        title={t('contact.cta.title')}
      >
        <p className="mainframe-secondary mb-4 max-w-4xl text-[#37ff73]/80">
          {t('contact.cta.description')}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 uppercase">
          <Link to="/projects" className={mainframeAction()}>
            {'> '}
            {t('contact.cta.projects')}
          </Link>
          <a href="mailto:normanjraguirre@gmail.com" className={mainframeAction()}>
            {'> '}
            {t('contact.cta.contact')}
          </a>
        </div>
      </MainframeSection>
    </div>
  );
}
