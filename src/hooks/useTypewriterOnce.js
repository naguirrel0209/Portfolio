import { useEffect, useMemo, useState } from 'react';

export function useTypewriterOnce(lines, options = {}) {
  const { characterDelay = 32, lineDelay = 300 } = options;
  const stableLines = useMemo(() => lines, [lines]);
  const [displayedLines, setDisplayedLines] = useState(() => stableLines.map(() => ''));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let timeoutId;

    async function typeLines() {
      const nextLines = stableLines.map(() => '');

      for (let lineIndex = 0; lineIndex < stableLines.length; lineIndex += 1) {
        const line = stableLines[lineIndex];

        for (let characterIndex = 0; characterIndex <= line.length; characterIndex += 1) {
          if (isCancelled) {
            return;
          }

          nextLines[lineIndex] = line.slice(0, characterIndex);
          setDisplayedLines([...nextLines]);

          await new Promise((resolve) => {
            timeoutId = window.setTimeout(resolve, characterDelay);
          });
        }

        if (lineIndex < stableLines.length - 1) {
          await new Promise((resolve) => {
            timeoutId = window.setTimeout(resolve, lineDelay);
          });
        }
      }

      if (!isCancelled) {
        setIsComplete(true);
      }
    }

    typeLines();

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [characterDelay, lineDelay, stableLines]);

  return { displayedLines, isComplete };
}
