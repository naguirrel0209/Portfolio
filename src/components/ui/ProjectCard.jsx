import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({
  project,
  index,
  actionLabel = 'Ver Proyecto',
  showCategory = false,
}) {
  const useProductionLink = actionLabel === 'Ver Proyecto' && project.productionUrl;
  const buttonClass =
    'mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border-cyber bg-surface-high/70 px-4 py-3 text-sm font-semibold text-text transition duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright';

  return (
    <motion.article
      className="group flex h-full flex-col rounded-lg border border-border-cyber/70 bg-surface/60 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary-cyan/80 hover:bg-surface-high/65 hover:shadow-[0_0_42px_var(--primary-glow-soft)]"
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.42, delay: index * 0.05, ease: 'easeOut' }}
    >
      <div className="mb-6 overflow-hidden rounded-lg border border-border-cyber/70 bg-background/45">
        <img
          src={project.imagen}
          alt={`Imagen de ${project.nombre}`}
          className="aspect-video w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100"
          loading="lazy"
        />
      </div>

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase text-primary-cyan-bright">
            {showCategory ? project.categoria : `Proyecto 0${index + 1}`}
          </p>
          <h3 className="mt-3 text-xl font-semibold leading-snug text-text">{project.nombre}</h3>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border-cyber/70 bg-background/45 text-primary-cyan-bright transition duration-300 group-hover:border-primary-cyan group-hover:shadow-[0_0_22px_var(--primary-glow-soft)]">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <p className="flex-1 text-sm leading-7 text-muted-text">{project.descripcion}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tecnologias.map((technology) => (
          <span
            key={`${project.slug}-${technology}`}
            className="rounded-md border border-border-cyber/70 bg-background/50 px-2.5 py-1 font-mono text-xs text-muted-text"
          >
            {technology}
          </span>
        ))}
      </div>

      {useProductionLink ? (
        <a href={project.productionUrl} target="_blank" rel="noreferrer" className={buttonClass}>
          {actionLabel}
          <ArrowUpRight size={16} />
        </a>
      ) : (
        <Link to={`/projects/${project.slug}`} className={buttonClass}>
          {actionLabel}
          <ArrowUpRight size={16} />
        </Link>
      )}
    </motion.article>
  );
}
