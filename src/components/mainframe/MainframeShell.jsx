import { Outlet } from 'react-router-dom';
import MainframeNav from './MainframeNav.jsx';
import { MainframeSettingsProvider, useMainframeSettings } from './MainframeSettingsContext.jsx';

const textSizeClass = {
  small: 'text-xs sm:text-sm',
  medium: 'text-sm sm:text-base',
  large: 'text-base sm:text-lg',
};

function MainframeShellContent() {
  const { cinemaMode, textSize } = useMainframeSettings();

  return (
    <div
      className="min-h-screen bg-black font-mono text-[#37ff73]"
      data-mainframe-cinema={cinemaMode}
    >
      <MainframeNav />
      <main
        className={`mainframe-content mx-auto w-full max-w-6xl px-5 py-8 leading-7 sm:px-6 lg:px-8 ${
          textSizeClass[textSize] ?? textSizeClass.medium
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default function MainframeShell() {
  return (
    <MainframeSettingsProvider>
      <MainframeShellContent />
    </MainframeSettingsProvider>
  );
}
