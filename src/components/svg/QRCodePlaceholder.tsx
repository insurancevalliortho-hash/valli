import React from 'react';

interface QRCodePlaceholderProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  // QR Target URL: https://vallihospital.in/iyakkam/technnovations/register
}

export const QRCodePlaceholder: React.FC<QRCodePlaceholderProps> = ({
  size = 160,
  className,
  ...props
}) => {
  // Generate 21x21 grid
  const grid = Array(21)
    .fill(null)
    .map(() => Array(21).fill(false));

  // Helper to draw finder patterns
  const drawFinder = (r: number, c: number) => {
    for (let dr = 0; dr < 7; dr++) {
      for (let dc = 0; dc < 7; dc++) {
        const isOuter = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const isInner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        grid[r + dr][c + dc] = isOuter || isInner;
      }
    }
  };

  // Draw finder patterns
  drawFinder(0, 0); // Top-left
  drawFinder(0, 14); // Top-right
  drawFinder(14, 0); // Bottom-left

  // Draw timing patterns
  for (let i = 7; i < 14; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  // Dark module
  grid[13][8] = true;

  // Fill rest of the grid deterministically to avoid hydration mismatches
  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
      const isTopLeft = r < 9 && c < 9;
      const isTopRight = r < 9 && c > 12;
      const isBottomLeft = r > 12 && c < 9;
      if (isTopLeft || isTopRight || isBottomLeft) continue;
      if (r === 6 || c === 6) continue;

      // Deterministic pseudo-random value
      const val = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
      grid[r][c] = val - Math.floor(val) > 0.48;
    }
  }

  const cellSize = 5.5;
  const gridOffsetTop = 15;
  const gridOffsetLeft = 22.25;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Background card */}
      <rect width="160" height="160" rx="16" fill="#FFFFFF" />
      
      {/* QR Code Grid */}
      <g fill="#1A1A2E">
        {grid.map((row, r) =>
          row.map((isDark, c) => {
            if (!isDark) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={gridOffsetLeft + c * cellSize}
                y={gridOffsetTop + r * cellSize}
                width={cellSize - 0.2} // Subtle gap for realistic pixel look
                height={cellSize - 0.2}
                rx={0.5} // slightly rounded pixels for premium look
              />
            );
          })
        )}
      </g>

      {/* Label */}
      <text
        x="80"
        y="146"
        fill="#1A1A2E"
        fontFamily="'Anton', 'Impact', sans-serif"
        fontSize="11"
        letterSpacing="0.08em"
        textAnchor="middle"
        dominantBaseline="central"
      >
        SCAN TO REGISTER
      </text>
    </svg>
  );
};

export default QRCodePlaceholder;
