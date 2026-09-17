import { useTranslation } from 'react-i18next';
import { useTypewriterOnce } from '../../hooks/useTypewriterOnce.js';

export default function MainframeTypedText({
  as: Component = 'p',
  className = '',
  lines,
  lineClassName = '',
}) {
  const { i18n } = useTranslation();
  const normalizedLines = Array.isArray(lines) ? lines : [lines];
  const { displayedLines } = useTypewriterOnce(normalizedLines, {
    characterDelay: 18,
    lineDelay: 180,
    resetKey: i18n.resolvedLanguage,
  });

  if (normalizedLines.length === 1) {
    return <Component className={className}>{displayedLines[0]}</Component>;
  }

  return (
    <Component className={className}>
      {displayedLines.map((line, index) => (
        <span key={`${normalizedLines[index]}-${index}`} className={`block ${lineClassName}`}>
          {line}
        </span>
      ))}
    </Component>
  );
}
