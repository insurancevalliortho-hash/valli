import React from 'react';

interface TrophyIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const TrophyIcon: React.FC<TrophyIconProps> = ({
  size = 64,
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="trophyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F26522" />
          <stop offset="100%" stopColor="#E05000" />
        </linearGradient>
      </defs>
      {/* Sparkle Left */}
      <path
        d="M 10 6 Q 10 10 6 10 Q 10 10 10 14 Q 10 10 14 10 Q 10 10 10 6 Z"
        fill="#FFB800"
      />
      {/* Sparkle Right */}
      <path
        d="M 54 8 Q 54 12 50 12 Q 54 12 54 16 Q 54 12 58 12 Q 54 12 54 8 Z"
        fill="#FFB800"
      />
      
      {/* Handles */}
      <path
        d="M 17 22 C 7 22 7 32 17 32"
        stroke="url(#trophyGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 47 22 C 57 22 57 32 47 32"
        stroke="url(#trophyGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Trophy Cup Body */}
      <path
        d="M 16 20 C 16 32 22 38 28 38 H 36 C 42 38 48 32 48 20 Z"
        fill="url(#trophyGrad)"
      />
      
      {/* Gold Rim */}
      <rect x="15" y="16" width="34" height="4" rx="2" fill="#FFB800" />
      
      {/* Base Stem and Platform */}
      <rect x="29" y="38" width="6" height="12" rx="1" fill="#1A1A2E" />
      <ellipse cx="32" cy="44" rx="5" ry="2.5" fill="#1A1A2E" />
      <rect x="22" y="50" width="20" height="4" rx="1" fill="#1A1A2E" />
      <rect x="16" y="54" width="32" height="6" rx="2" fill="#1A1A2E" />
    </svg>
  );
};

export default TrophyIcon;
