import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useTypewriterOnce(lines, options = {}) {
  const { characterDelay = 32, lineDelay = 300, resetKey = '' } = options;
  const currentLines = Array.isArray(lines) ? lines : [lines];
  const linesSignature = `${resetKey}::${currentLines.join('\u0000')}`;
  const linesRef = useRef(currentLines);
  const shouldReduceMotionRef = useRef(prefersReducedMotion());
  const [displayedLines, setDisplayedLines] = useState(() =>
    shouldReduceMotionRef.current ? currentLines : currentLines.map(() => ''),
  );
  const [isComplete, setIsComplete] = useState(shouldReduceMotionRef.current);

  useEffect(() => {
    linesRef.current = currentLines;

    if (shouldReduceMotionRef.current) {
      setDisplayedLines(linesRef.current);
      setIsComplete(true);
      return undefined;
    }

    let isCancelled = false;
    let timeoutId;
    setDisplayedLines(linesRef.current.map(() => ''));
    setIsComplete(false);

    async function typeLines() {
      const nextLines = linesRef.current.map(() => '');

      for (let lineIndex = 0; lineIndex < linesRef.current.length; lineIndex += 1) {
        const line = linesRef.current[lineIndex];

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

        if (lineIndex < linesRef.current.length - 1) {
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
  }, [characterDelay, lineDelay, linesSignature]);

  return { displayedLines, isComplete };
}
