import MainframeTypedText from './MainframeTypedText.jsx';

export default function MainframeSection({ label, title, children }) {
  return (
    <section className="border-t border-[#37ff73]/55 py-10 first:border-t-0 first:pt-0">
      {label ? (
        <MainframeTypedText
          as="p"
          className="mb-3 text-xs uppercase tracking-normal text-[#37ff73]/75"
          lines={`[${label}]`}
        />
      ) : null}
      {title ? (
        <MainframeTypedText
          as="h2"
          className="mb-6 text-xl font-normal uppercase leading-tight text-[#37ff73] sm:text-2xl"
          lines={title}
        />
      ) : null}
      {children}
    </section>
  );
}
