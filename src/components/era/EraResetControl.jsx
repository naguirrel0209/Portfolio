import { useEra } from '../../context/EraContext.jsx';

export default function EraResetControl() {
  const { resetSelectedEra } = useEra();

  return (
    <button
      type="button"
      className="fixed bottom-4 left-4 z-50 border border-[#37ff73]/60 bg-black px-3 py-2 font-mono text-xs uppercase tracking-normal text-[#37ff73] transition-colors hover:bg-[#37ff73] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#37ff73]"
      onClick={resetSelectedEra}
    >
      CHANGE ERA
    </button>
  );
}
