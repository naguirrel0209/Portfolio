export default function MainframeSection({ label, title, children }) {
  return (
    <section className="border-t border-[#37ff73]/55 py-8 first:border-t-0 first:pt-0">
      {label ? (
        <p className="mb-3 text-xs uppercase tracking-normal text-[#37ff73]/75">
          [{label}]
        </p>
      ) : null}
      {title ? (
        <h2 className="mb-5 text-xl font-normal uppercase leading-tight text-[#37ff73] sm:text-2xl">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
