import React from 'react';

interface BrandLogoProps {
  light?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ light = false, className = '', size = 'md' }) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subTextSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[11px]' : 'text-[9px]';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Stylized Lotus Emblem */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Central Lotus Petals */}
        <path
          d="M20 6C20 6 23.5 13.5 23.5 19C23.5 21 22 23 20 23C18 23 16.5 21 16.5 19C16.5 13.5 20 6 20 6Z"
          fill={light ? "#E8C888" : "#9E4885"}
          opacity="0.9"
        />
        <path
          d="M20 12C20 12 28 17 28 23C28 27 24 29 20 29C16 29 12 27 12 23C12 17 20 12 20 12Z"
          stroke={light ? "#F5EAD4" : "#581C4E"}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Left Side Petal */}
        <path
          d="M17 14C17 14 10 17 9 23C8.2 28 14 31 18 31"
          stroke={light ? "#E8C888" : "#9E4885"}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Right Side Petal */}
        <path
          d="M23 14C23 14 30 17 31 23C31.8 28 26 31 22 31"
          stroke={light ? "#E8C888" : "#9E4885"}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Base lotus calyx flourish */}
        <path
          d="M14 31C16 33.5 20 34 20 34C20 34 24 33.5 26 31"
          stroke={light ? "#E8C888" : "#581C4E"}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="20" cy="24" r="1.5" fill={light ? "#FFFFFF" : "#581C4E"} />
      </svg>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif tracking-wide leading-none font-semibold ${textSize} ${
            light ? 'text-white' : 'text-[#3B1637]'
          }`}
        >
          SareeAura
        </span>
        <span
          className={`uppercase font-sans tracking-[0.24em] font-medium mt-1 leading-none ${subTextSize} ${
            light ? 'text-[#D4AF37]/90' : 'text-[#6E5566]'
          }`}
        >
          Tradition in Every Drape
        </span>
      </div>
    </div>
  );
};
