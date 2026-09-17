import { Link } from 'react-router-dom';

export default function PixelDesktopIcon({ icon, label, onOpen, to }) {
  return (
    <Link
      to={to}
      className="flex w-20 flex-col items-center gap-2 text-center text-xs text-white outline-none focus:bg-[#000080]/70"
      onClick={onOpen}
    >
      <span className="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#e6e6e6] text-xl text-black shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
        {icon}
      </span>
      <span className="px-1 leading-tight drop-shadow-[1px_1px_0_rgba(0,0,0,0.9)]">{label}</span>
    </Link>
  );
}
