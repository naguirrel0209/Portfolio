import { Outlet } from 'react-router-dom';
import MainframeNav from './MainframeNav.jsx';

export default function MainframeShell() {
  return (
    <div className="min-h-screen bg-black font-mono text-[#37ff73]">
      <MainframeNav />
      <main className="mx-auto w-full max-w-6xl px-5 py-8 text-sm leading-7 sm:px-6 sm:text-base lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
