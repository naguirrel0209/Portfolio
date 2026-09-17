import EraSelector from './EraSelector.jsx';
import { useTypewriterOnce } from '../../hooks/useTypewriterOnce.js';

const bootLines = [
  'INITIALIZING PORTFOLIO SYSTEM...',
  'WELCOME TO NORMAN AGUIRRE PORTFOLIO',
  'SELECT AN ERA TO CONTINUE:',
];

export default function BootScreen() {
  const { displayedLines, isComplete } = useTypewriterOnce(bootLines, {
    characterDelay: 30,
    lineDelay: 360,
  });

  return (
    <main className="fixed inset-0 z-[100] flex min-h-screen items-center bg-black px-5 py-8 font-mono text-[#37ff73] sm:px-8 lg:px-14">
      <section className="w-full max-w-4xl">
        <div className="grid gap-4 text-base leading-7 sm:text-xl sm:leading-8">
          {displayedLines.map((line, index) => (
            <p key={bootLines[index]} className="min-h-[1.75rem] whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>

        {isComplete ? <EraSelector /> : null}
      </section>
    </main>
  );
}
