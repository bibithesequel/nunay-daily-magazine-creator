import React from 'react';

interface NunayLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  darkText?: boolean;
}

export const NunayLogo: React.FC<NunayLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  darkText = true,
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', svg: 'w-4 h-4', text: 'text-xs' },
    md: { box: 'w-9 h-9', svg: 'w-5 h-5', text: 'text-sm' },
    lg: { box: 'w-12 h-12', svg: 'w-7 h-7', text: 'text-base' },
    xl: { box: 'w-16 h-16', svg: 'w-10 h-10', text: 'text-xl' },
  };

  const dim = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon Emblem */}
      <div
        className={`${dim.box} rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 flex items-center justify-center shadow-md shadow-emerald-950/20 border border-emerald-400/40 relative overflow-hidden group`}
      >
        {/* Subtle Shine Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Custom Luxury Monogram N SVG */}
        <svg
          viewBox="0 0 100 100"
          className={`${dim.svg} text-white drop-shadow fill-current transition-transform duration-300 group-hover:scale-110`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Linker vertikaler Balken mit Serife */}
          <path
            d="M 22 20 L 36 20 L 36 78 L 22 78 Z"
            fill="currentColor"
          />
          {/* Rechter vertikaler Balken mit Serife */}
          <path
            d="M 64 22 L 78 22 L 78 80 L 64 80 Z"
            fill="currentColor"
          />
          {/* Diagonaler Übergangsbalken mit dynamischem Schliff */}
          <path
            d="M 28 20 L 44 20 L 76 76 L 60 76 Z"
            fill="url(#emerald-gold-diag)"
          />
          {/* Zierender Diamant-Stern im N */}
          <polygon
            points="50,14 53,22 61,25 53,28 50,36 47,28 39,25 47,22"
            fill="#a7f3d0"
          />

          <defs>
            <linearGradient id="emerald-gold-diag" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#d1fae5" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${dim.text} font-black tracking-wider uppercase leading-none font-montserrat flex items-center gap-1 ${darkText ? 'text-neutral-900' : 'text-white'}`}>
            NUNAY <span className="text-emerald-600 font-bold">DAILY</span>
          </span>
          <span className={`text-[10px] font-mono tracking-widest uppercase ${darkText ? 'text-neutral-500' : 'text-emerald-300/70'}`}>
            Publishing Studio
          </span>
        </div>
      )}
    </div>
  );
};
