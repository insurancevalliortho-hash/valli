import React from 'react';

interface PrizeBadgeProps extends React.SVGProps<SVGSVGElement> {
  variant: 'gold' | 'silver' | 'bronze';
  width?: number | string;
  height?: number | string;
}

export const PrizeBadge: React.FC<PrizeBadgeProps> = ({
  variant,
  width = 140,
  height = 48,
  className,
  ...props
}) => {
  const config = {
    gold: {
      bg: '#F26522',
      text: '₹30,000 WINNER',
      textLength: '85',
      icon: (
        <g fill="white">
          {/* Trophy Rim */}
          <path d="M19 18h10v2H19v-2z" />
          {/* Trophy Cup */}
          <path d="M20 20v3c0 3 2 5 5 5s5-2 5-5v-3H20z" />
          {/* Left Handle */}
          <path d="M18 21c-1.1 0-2 .9-2 2s.9 2 2 2h2v-4h-2z" />
          {/* Right Handle */}
          <path d="M30 21h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2v-4z" />
          {/* Stem & Base */}
          <path d="M23 28h4v3h-4z M21 31h8v2h-8z" />
        </g>
      ),
    },
    silver: {
      bg: '#00A896',
      text: '₹20,000 RUNNER-UP',
      textLength: '90',
      icon: (
        <g fill="white">
          {/* Medal Ribbon */}
          <path d="M21 17l1.5 5h5l1.5-5H21z" />
          {/* Outer Medal Circle */}
          <path d="M25 21c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
          {/* Inner Star */}
          <path d="M25 23.8l.5 1.1 1.2.2-.9.8.2 1.2-1-.5-1 .5.2-1.2-.9-.8 1.2-.2z" />
        </g>
      ),
    },
    bronze: {
      bg: '#1A1A2E',
      text: '₹10,000 SPECIAL',
      textLength: '85',
      icon: (
        <g fill="white">
          {/* Star */}
          <path d="M25 17.5l1.8 3.7 4.1.6-3 2.9.7 4.1-3.6-1.9-3.6 1.9.7-4.1-3-2.9 4.1-.6z" />
        </g>
      ),
    },
  };

  const current = config[variant] || config.gold;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Pill Badge Base */}
      <rect width="140" height="48" rx="24" fill={current.bg} />
      
      {/* Icon Group */}
      <g transform="translate(-2, 0)">
        {current.icon}
      </g>

      {/* Text */}
      <text
        x="84"
        y="25"
        fill="white"
        fontFamily="'Anton', 'Impact', sans-serif"
        fontSize="11"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
        textLength={current.textLength}
        lengthAdjust="spacingAndGlyphs"
      >
        {current.text}
      </text>
    </svg>
  );
};

export default PrizeBadge;
