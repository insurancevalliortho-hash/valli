import React from 'react';

interface EntryFeeBadgeProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export const EntryFeeBadge: React.FC<EntryFeeBadgeProps> = ({
  width = 260,
  height = 72,
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 260 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Background Pill */}
      <rect
        x="1"
        y="1"
        width="258"
        height="70"
        rx="14"
        fill="#1A1A2E"
        stroke="#00A896"
        strokeWidth="2"
      />

      {/* "ENTRY FEE :" Text */}
      <text
        x="122"
        y="28"
        fill="#FFFFFF"
        fontFamily="'Anton', 'Impact', sans-serif"
        fontSize="13"
        letterSpacing="0.05em"
        textAnchor="end"
        dominantBaseline="central"
      >
        ENTRY FEE :
      </text>

      {/* "₹3000" Text */}
      <text
        x="130"
        y="26"
        fill="#F26522"
        fontFamily="'Anton', 'Impact', sans-serif"
        fontSize="28"
        fontWeight="bold"
        textAnchor="start"
        dominantBaseline="central"
      >
        ₹3000
      </text>

      {/* "ONLY" Text */}
      <text
        x="130"
        y="52"
        fill="#FFFFFF"
        fontFamily="'Anton', 'Impact', sans-serif"
        fontSize="11"
        letterSpacing="0.15em"
        textAnchor="middle"
        dominantBaseline="central"
        opacity="0.8"
      >
        ONLY
      </text>
    </svg>
  );
};

export default EntryFeeBadge;
