import { useEffect, useState } from 'react';
import { eras, useEra } from '../../context/EraContext.jsx';

export default function EraSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setSelectedEra } = useEra();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + eras.length) % eras.length);
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % eras.length);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        setSelectedEra(eras[activeIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, setSelectedEra]);

  return (
    <div className="mt-8 grid gap-3 text-lg leading-none sm:text-xl">
      {eras.map((era, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={era.id}
            type="button"
            className="w-fit bg-transparent p-0 font-mono text-left text-[#37ff73] outline-none"
            onClick={() => setSelectedEra(era.id)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <span className="inline-block w-6">{isActive ? '>' : ' '}</span>
            <span>{era.label}</span>
          </button>
        );
      })}
    </div>
  );
}
