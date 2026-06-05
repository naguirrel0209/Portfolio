import { motion } from 'framer-motion';

export default function TimelineItem({ event, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      className="relative grid gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6"
      initial={{ opacity: 0, x: isEven ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div
        className={`rounded-lg border border-border-cyber/70 bg-surface/60 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary-cyan/75 hover:bg-surface-high/65 md:row-start-1 ${
          isEven ? 'md:col-start-1 md:text-right' : 'md:col-start-3 md:text-left'
        }`}
      >
        <p className="font-mono text-sm font-semibold text-primary-cyan-bright">{event.year}</p>
        <h3 className="mt-3 text-xl font-semibold text-text">{event.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-text">{event.description}</p>
      </div>

      <div className="absolute left-0 top-6 z-10 h-3 w-3 rounded-full bg-primary-cyan shadow-[0_0_18px_var(--primary-glow-strong)] md:relative md:left-auto md:top-8 md:col-start-2 md:row-start-1" />
      <div className={`hidden md:row-start-1 md:block ${isEven ? 'md:col-start-3' : 'md:col-start-1'}`} />
    </motion.article>
  );
}
