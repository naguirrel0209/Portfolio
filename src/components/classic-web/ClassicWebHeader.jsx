import { useTranslation } from 'react-i18next';
import ClassicWebNav from './ClassicWebNav.jsx';

export default function ClassicWebHeader() {
  const { t } = useTranslation();

  return (
    <header className="border-2 border-[#000080] bg-[#e8eef8] shadow-[4px_4px_0_#808080]">
      <div className="bg-[#000080] px-4 py-2 text-white">
        <p className="font-mono text-xs uppercase tracking-normal">
          {t('common.classicWeb.header.kicker')}
        </p>
      </div>
      <div className="grid gap-2 px-4 py-5">
        <h1 className="text-3xl font-bold text-[#000080] sm:text-4xl">
          {t('common.brand')}
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-[#202020]">
          {t('common.classicWeb.header.subtitle')}
        </p>
      </div>
      <ClassicWebNav />
    </header>
  );
}
