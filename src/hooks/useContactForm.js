import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const initialFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForm(values, t) {
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

export function useContactForm() {
  const { i18n, t } = useTranslation();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const isSubmitting = status.type === 'loading';

  useEffect(() => {
    if (!status.message || status.type === 'loading') {
      return undefined;
    }

    const timer = window.setTimeout(
      () => setStatus({ type: 'idle', message: '' }),
      5200,
    );
    return () => window.clearTimeout(timer);
  }, [status.message, status.type]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      return;
    }

    setErrors(validateForm(formData, t));
  }, [i18n.resolvedLanguage]);

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

  return {
    errors,
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    status,
  };
}
