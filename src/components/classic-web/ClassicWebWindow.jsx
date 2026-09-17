export default function ClassicWebWindow({ children, title }) {
  return (
    <section className="border-2 border-[#000080] bg-[#fffbe6] shadow-[4px_4px_0_#808080]">
      <div className="border-b-2 border-[#000080] bg-[#c0d8ff] px-3 py-2">
        <h2 className="font-mono text-sm font-bold uppercase text-[#000080]">{title}</h2>
      </div>
      <div className="classic-web-readable p-4 text-sm leading-6 text-[#202020] sm:p-5">
        {children}
      </div>
    </section>
  );
}
