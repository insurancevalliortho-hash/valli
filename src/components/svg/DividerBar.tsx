import React from 'react';

interface DividerBarProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const DividerBar: React.FC<DividerBarProps> = ({
  width = 4,
  height = 80,
  className,
  color = '#00A896',
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 4 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      color={color}
      {...props}
    >
      <rect
        width="4"
        height="80"
        rx="2"
        fill="currentColor"
      />
    </svg>
  );
};

export default DividerBar;
