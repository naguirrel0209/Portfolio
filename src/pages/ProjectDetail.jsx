import { motion } from 'framer-motion';
import { ArrowLeft, Code2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects.js';

function DetailSection({ title, children }) {
  return (
    <motion.section
      className="rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <h2 className="text-2xl font-bold text-text">{title}</h2>
      <div className="mt-5 text-base leading-8 text-muted-text">{children}</div>
    </motion.section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="w-full rounded-lg border border-border-cyber/70 bg-surface/60 p-8 text-center backdrop-blur-xl">
        <p className="font-mono text-sm uppercase text-primary-cyan-bright">
          Proyecto no encontrado
        </p>
        <h1 className="mt-4 text-3xl font-bold text-text">No encontramos este proyecto</h1>
        <Link
          to="/projects"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-200 hover:bg-primary-cyan-bright"
        >
          <ArrowLeft size={17} />
          Volver a Proyectos
        </Link>
      </section>
    );
  }

  return (
    <article className="w-full space-y-10">
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <nav className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-text">
          <Link to="/" className="transition duration-200 hover:text-primary-cyan-bright">
            Inicio
          </Link>
          <span>/</span>
          <Link to="/projects" className="transition duration-200 hover:text-primary-cyan-bright">
            Proyectos
          </Link>
          <span>/</span>
          <span className="text-primary-cyan-bright">{project.nombre}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="font-mono text-sm font-medium uppercase text-primary-cyan-bright">
              {project.categoria}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-text sm:text-5xl">
              {project.nombre}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-text">{project.descripcion}</p>

            <div className="flex flex-wrap gap-2">
              {project.tecnologias.map((technology) => (
                <span
                  key={`${project.slug}-hero-${technology}`}
                  className="rounded-md border border-border-cyber/70 bg-background/50 px-2.5 py-1 font-mono text-xs text-muted-text"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-cyan bg-primary-cyan px-5 py-3 text-sm font-semibold text-background transition duration-200 hover:bg-primary-cyan-bright hover:shadow-[0_0_30px_rgba(0,220,229,0.26)]"
              >
                <Code2 size={17} />
                GitHub
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border-cyber bg-surface-high/65 px-5 py-3 text-sm font-semibold text-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
              >
                <ArrowLeft size={17} />
                Volver a Proyectos
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-border-cyber/80 bg-surface/55 p-5 shadow-[0_0_70px_rgba(0,220,229,0.14)] backdrop-blur-xl">
            <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-primary-cyan/45 bg-background/45">
              <p className="px-5 text-center font-mono text-xs font-medium uppercase text-primary-cyan-bright">
                {project.imagen}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DetailSection title="Descripción General">
          <p>{project.descripcionGeneral}</p>
        </DetailSection>

        <DetailSection title="Tecnologías Utilizadas">
          <div className="flex flex-wrap gap-2">
            {project.tecnologias.map((technology) => (
              <span
                key={`${project.slug}-detail-${technology}`}
                className="rounded-md border border-border-cyber/70 bg-background/50 px-3 py-1.5 font-mono text-xs text-muted-text"
              >
                {technology}
              </span>
            ))}
          </div>
        </DetailSection>

        <DetailSection title="Lo que Aprendí">
          <ul className="space-y-3">
            {project.aprendizajes.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-cyan shadow-[0_0_12px_rgba(0,220,229,0.7)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection title="Repositorio">
          <p>
            El repositorio del proyecto se encuentra disponible en GitHub como referencia para
            revisar su estructura, tecnologías utilizadas y evolución técnica.
          </p>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-border-cyber bg-surface-high/70 px-4 py-3 text-sm font-semibold text-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright"
          >
            <Code2 size={17} />
            Abrir Repositorio
          </a>
        </DetailSection>
      </div>
    </article>
  );
}
