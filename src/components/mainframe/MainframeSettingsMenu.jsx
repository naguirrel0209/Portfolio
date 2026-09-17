import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { eras, useEra } from '../../context/EraContext.jsx';
import { mainframeAction } from './mainframeStyles.js';
import { useMainframeSettings } from './MainframeSettingsContext.jsx';

const languages = ['es', 'en'];

export default function MainframeSettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [panel, setPanel] = useState('root');
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedEra, setSelectedEra } = useEra();
  const { cinemaMode, setCinemaMode, setTextSize, textSize, textSizes } = useMainframeSettings();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const items = useMemo(() => {
    if (panel === 'era') {
      return eras.map((era) => ({
        key: era.id,
        label: era.label,
        selected: selectedEra === era.id,
        action: () => {
          setSelectedEra(era.id);
          if (era.id !== 'mainframe') {
            navigate('/');
          }
          setIsOpen(false);
          setPanel('root');
        },
      }));
    }

    if (panel === 'language') {
      return languages.map((language) => ({
        key: language,
        label: t(`common.language.${language}`),
        selected: i18n.resolvedLanguage === language,
        action: () => {
          i18n.changeLanguage(language);
          setPanel('root');
          setActiveIndex(0);
        },
      }));
    }

    if (panel === 'textSize') {
      return textSizes.map((size) => ({
        key: size,
        label: t(`common.mainframeSettings.textSizes.${size}`),
        selected: textSize === size,
        action: () => {
          setTextSize(size);
          setPanel('root');
          setActiveIndex(0);
        },
      }));
    }

    return [
      {
        key: 'changeEra',
        label: t('common.mainframeSettings.changeEra'),
        action: () => {
          setPanel('era');
          setActiveIndex(0);
        },
      },
      {
        key: 'changeLanguage',
        label: t('common.mainframeSettings.changeLanguage'),
        action: () => {
          setPanel('language');
          setActiveIndex(0);
        },
      },
      {
        key: 'cinemaMode',
        label: `${t('common.mainframeSettings.cinemaMode')}: ${
          cinemaMode ? t('common.mainframeSettings.on') : t('common.mainframeSettings.off')
        }`,
        action: () => setCinemaMode(!cinemaMode),
      },
      {
        key: 'textSize',
        label: `${t('common.mainframeSettings.textSize')}: ${t(
          `common.mainframeSettings.textSizes.${textSize}`,
        )}`,
        action: () => {
          setPanel('textSize');
          setActiveIndex(0);
        },
      },
    ];
  }, [
    cinemaMode,
    i18n,
    navigate,
    panel,
    selectedEra,
    setCinemaMode,
    setSelectedEra,
    setTextSize,
    t,
    textSize,
    textSizes,
  ]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (panel === 'root') {
          setIsOpen(false);
        } else {
          setPanel('root');
          setActiveIndex(0);
        }
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + items.length) % items.length);
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % items.length);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        items[activeIndex]?.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, isOpen, items, panel]);

  const openMenu = () => {
    setIsOpen((current) => !current);
    setPanel('root');
    setActiveIndex(0);
  };

  return (
    <div className="w-full">
      <button type="button" className={mainframeAction('border-0 text-[#37ff73]/75')} onClick={openMenu}>
        {isOpen ? '> ' : '  '}
        {t('common.mainframeSettings.title')}
      </button>

      {isOpen ? (
        <div className="mt-4 grid gap-3 border-t border-[#37ff73]/25 pt-4">
          {panel !== 'root' ? (
            <button
              type="button"
              className={mainframeAction('border-0 text-[#37ff73]/70')}
              onClick={() => {
                setPanel('root');
                setActiveIndex(0);
              }}
            >
              {'< '}
              {t('common.mainframeSettings.back')}
            </button>
          ) : null}

          <p className="uppercase text-[#37ff73]/70">
            {t(`common.mainframeSettings.panels.${panel}`)}
          </p>

          <div className="grid gap-2">
            {items.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.key}
                  type="button"
                  className={mainframeAction(
                    `border-0 text-left ${isActive ? 'text-[#37ff73]' : 'text-[#37ff73]/75'}`,
                  )}
                  onClick={item.action}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {isActive || item.selected ? '> ' : '  '}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
