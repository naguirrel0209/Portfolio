import { motion } from 'framer-motion';
import { ArrowRight, Code2, Download, ExternalLink, FileText, Mail, Network, Send, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cvPlaceholder from '../assets/cv/CV_NormanAguirre.pdf';

const contactDetails = [
  { label: 'Nombre', value: 'Norman Aguirre' },
  { label: 'LinkedIn', value: 'linkedin.com/in/norman-aguirre-lepe-6679a5340' },
  { label: 'GitHub Principal', value: 'github.com/Naguirrel' },
  { label: 'GitHub Personal', value: 'github.com/naguirrel0209' },
  { label: 'Correo Personal', value: 'normanjraguirre@gmail.com', href: 'mailto:normanjraguirre@gmail.com' },
  { label: 'Correo Institucional', value: 'agu24479@uvg.edu.gt', href: 'mailto:agu24479@uvg.edu.gt' },
];

const contactLinks = [
  {
    label: 'GitHub Principal',
    href: 'https://github.com/Naguirrel',
    description: 'Repositorio principal de proyectos y prácticas de desarrollo.',
    icon: Code2,
  },
  {
    label: 'GitHub Personal',
    href: 'https://github.com/naguirrel0209',
    description: 'Espacio personal para experimentación y aprendizaje continuo.',
    icon: Code2,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/norman-aguirre-lepe-6679a5340',
    description: 'Perfil profesional, formación académica y conexiones.',
    icon: Network,
  },
  {
    label: 'Correo Personal',
    href: 'mailto:normanjraguirre@gmail.com',
    description: 'Canal directo para oportunidades, colaboración y proyectos.',
    icon: Mail,
  },
];

const fieldClass =
  'w-full rounded-md border border-border-cyber/70 bg-background/45 px-4 py-3 text-sm text-text outline-none transition duration-300 placeholder:text-muted-text/60 focus:border-primary-cyan focus:shadow-[0_0_24px_var(--primary-glow-soft)]';

const initialFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(values) {
  const nextErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = 'Ingresa tu nombre.';
  }

  if (!values.email.trim()) {
    nextErrors.email = 'Ingresa tu correo.';
  } else if (!emailRegex.test(values.email.trim())) {
    nextErrors.email = 'Ingresa un correo válido.';
  }

  if (!values.subject.trim()) {
    nextErrors.subject = 'Ingresa un asunto.';
  }

  if (!values.message.trim()) {
    nextErrors.message = 'Escribe tu mensaje.';
  }

  return nextErrors;
}

export default function Contact() {
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

    const nextErrors = validateForm(formData);

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
        throw new Error(data.message ?? 'No fue posible enviar el mensaje.');
      }

      setFormData(initialFormData);
      setStatus({ type: 'success', message: 'Mensaje enviado correctamente. En breve me pondré en contacto contigo.' });
    } catch {
      setStatus({ type: 'error', message: '❌ No fue posible enviar el mensaje.' });
    }
  };

  return (
    <div className="w-full space-y-16">
      <motion.section
        className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
              Contacto
            </p>
            <h1 className="text-5xl font-bold leading-tight text-text sm:text-6xl">Hablemos</h1>
            <p className="max-w-3xl text-base leading-8 text-muted-text sm:text-lg">
              Estoy abierto a nuevas oportunidades, colaboraciones, proyectos interesantes y
              conversaciones relacionadas con tecnología, desarrollo de software y aprendizaje
              continuo.
            </p>
          </div>

          <div className="rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-background/45 text-primary-cyan-bright">
                <User size={18} />
              </span>
              <h2 className="text-2xl font-bold text-text">Información Personal</h2>
            </div>

            <dl className="grid gap-4">
              {contactDetails.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 border-b border-border-cyber/50 pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[11rem_1fr]"
                >
                  <dt className="font-mono text-xs uppercase text-primary-cyan-bright">
                    {item.label}
                  </dt>
                  <dd className="break-words text-sm leading-6 text-muted-text">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="transition duration-200 hover:text-primary-cyan-bright"
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
          </div>
        </div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
        >
          <div className="space-y-4">
            <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
              Enlaces
            </p>
            <h2 className="text-3xl font-bold text-text sm:text-4xl">Conecta Conmigo</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {contactLinks.map(({ label, href, description, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="group rounded-lg border border-border-cyber/70 bg-surface/60 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary-cyan/80 hover:bg-surface-high/65 hover:shadow-[0_0_42px_var(--primary-glow-soft)]"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-background/45 text-primary-cyan-bright">
                    <Icon size={18} />
                  </span>
                  <ExternalLink size={17} className="text-muted-text transition group-hover:text-primary-cyan-bright" />
                </div>
                <h3 className="text-lg font-semibold text-text">{label}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-text">{description}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.form
        className="mx-auto max-w-3xl rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl sm:p-8"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-background/45 text-primary-cyan-bright">
            <Send size={18} />
          </span>
          <h2 className="text-2xl font-bold text-text">Mensaje</h2>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase text-muted-text">Nombre</span>
            <input
              className={fieldClass}
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? (
              <span className="font-mono text-xs text-red-300">{errors.name}</span>
            ) : null}
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase text-muted-text">Correo</span>
            <input
              className={fieldClass}
              name="email"
              type="email"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? (
              <span className="font-mono text-xs text-red-300">{errors.email}</span>
            ) : null}
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase text-muted-text">Asunto</span>
            <input
              className={fieldClass}
              name="subject"
              type="text"
              placeholder="Motivo del mensaje"
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={Boolean(errors.subject)}
            />
            {errors.subject ? (
              <span className="font-mono text-xs text-red-300">{errors.subject}</span>
            ) : null}
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase text-muted-text">Mensaje</span>
            <textarea
              className={`${fieldClass} min-h-36 resize-y`}
              name="message"
              placeholder="Cuéntame sobre tu proyecto, idea u oportunidad."
              value={formData.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message ? (
              <span className="font-mono text-xs text-red-300">{errors.message}</span>
            ) : null}
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-300 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_var(--primary-glow)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          <ArrowRight size={17} />
        </button>

        {status.message ? (
          <motion.p
            className={`mt-4 rounded-md border bg-background/45 px-4 py-3 text-sm leading-6 ${
              status.type === 'success'
                ? 'border-primary-cyan/50 text-primary-cyan-bright'
                : 'border-red-300/50 text-red-200'
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {status.message}
          </motion.p>
        ) : null}
      </motion.form>

      <motion.section
        className="grid gap-6 rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl sm:p-8 md:grid-cols-[1fr_auto] md:items-center"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/70 bg-background/45 text-primary-cyan-bright">
              <FileText size={18} />
            </span>
            <h2 className="text-3xl font-bold text-text">Currículum</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-muted-text">
            Archivo preparado para reemplazarse por la versión final del currículum en PDF.
          </p>
        </div>

        <a
          href={cvPlaceholder}
          download="CV-Norman-Aguirre.pdf"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-300 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_var(--primary-glow)]"
        >
          <Download size={17} />
          Descargar CV
        </a>
      </motion.section>

      <motion.section
        className="rounded-lg border border-border-cyber/70 bg-surface/60 p-8 text-center backdrop-blur-xl sm:p-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-text sm:text-4xl">¿Trabajamos juntos?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-text">
          Siempre estoy interesado en aprender, colaborar y participar en proyectos que me permitan
          seguir creciendo como desarrollador.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-300 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_var(--primary-glow)]"
          >
            Ver Proyectos
            <ArrowRight size={17} />
          </Link>
          <a
            href="mailto:normanjraguirre@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border-cyber bg-surface-high/65 px-5 py-3 text-sm font-semibold text-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
          >
            Contactarme
            <Mail size={17} />
          </a>
        </div>
      </motion.section>
    </div>
  );
}
