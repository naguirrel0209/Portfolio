import { useTranslation } from 'react-i18next';

export default function ClassicWebFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-2 border-[#000080] bg-[#e8eef8] px-4 py-3 text-center text-xs text-[#202020] shadow-[4px_4px_0_#808080]">
      <p>
        {t('common.classicWeb.footer.copyright', {
          year: '2026',
          name: t('common.brand'),
        })}
      </p>
      <p className="mt-1 font-mono">{t('common.classicWeb.footer.note')}</p>
    </footer>
  );
}
