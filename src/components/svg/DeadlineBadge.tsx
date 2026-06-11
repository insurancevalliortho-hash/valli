import React from 'react';

interface DeadlineBadgeProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({
  width = 200,
  height = 80,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Calendar Icon */}
      <g transform="translate(16, 14)">
        {/* Calendar body outline */}
        <path
          d="M1 2.5C1 1.67 1.67 1 2.5 1h7C10.33 1 11 1.67 11 2.5v7c0 .83-.67 1.5-1.5 1.5h-7C1.67 11 1 10.33 1 9.5v-7z"
          fill="none"
          stroke="#00A896"
          strokeWidth="1.2"
        />
        {/* Calendar top bar */}
        <path
          d="M1 4h10v-1.5C11 2 10.5 1.5 9.5 1.5h-7C1.5 1.5 1 2 1 3.5V4z"
          fill="#00A896"
        />
        {/* Binder rings */}
        <rect x="3" y="0" width="1.2" height="2" rx="0.5" fill="#1A1A2E" />
        <rect x="7.8" y="0" width="1.2" height="2" rx="0.5" fill="#1A1A2E" />
        {/* Date grid dots */}
        <circle cx="4" cy="6.5" r="0.7" fill="#00A896" />
        <circle cx="6.5" cy="6.5" r="0.7" fill="#00A896" />
        <circle cx="9" cy="6.5" r="0.7" fill="#00A896" />
        <circle cx="4" cy="9" r="0.7" fill="#00A896" />
        <circle cx="6.5" cy="9" r="0.7" fill="#00A896" />
        <circle cx="9" cy="9" r="0.7" fill="#00A896" />
      </g>

      {/* "SUBMISSION DEADLINE" Text */}
      <text
        x="34"
        y="21"
        fill="#666666"
        fontFamily="'Anton', 'Impact', sans-serif"
        fontSize="10"
        letterSpacing="0.05em"
        textAnchor="start"
        dominantBaseline="central"
      >
        SUBMISSION DEADLINE
      </text>

      {/* "JULY 15 2026" Text */}
      <text
        x="16"
        y="52"
        fontFamily="'Anton', 'Impact', sans-serif"
        dominantBaseline="central"
      >
        <tspan
          fill="#1A1A2E"
          fontSize="32"
          fontWeight="bold"
        >
          JULY 15
        </tspan>
        <tspan
          fill="#F26522"
          fontSize="14"
          dx="8"
          dy="-4"
        >
          2026
        </tspan>
      </text>
    </svg>
  );
};

export default DeadlineBadge;
