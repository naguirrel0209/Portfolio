import { Link } from 'react-router-dom';

export default function PixelDesktopStartMenu({ items, menuTitle, onOpenItem }) {
  return (
    <div className="absolute bottom-10 left-0 w-56 border-2 border-black bg-[#c0c0c0] p-1 text-sm text-black shadow-[4px_4px_0_rgba(0,0,0,0.45)]">
      <div className="mb-1 bg-[#000080] px-2 py-2 font-bold text-white">{menuTitle}</div>
      <nav className="grid">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="px-3 py-2 hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white"
            onClick={() => onOpenItem(item.key)}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
