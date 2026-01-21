
import React from 'react';

const iconProps = {
  className: "w-5 h-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const LightbulbIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M12 2a7 7 0 0 0-7 7c0 3.03 1.5 5.5 4 6.5V17a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.5c2.5-1 4-3.47 4-6.5a7 7 0 0 0-7-7z" />
    <path d="M9 20h6" />
  </svg>
);

export const RoadIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M4 13l4-8h8l4 8" />
    <path d="M4 13h16" />
  </svg>
);

export const WalkIcon: React.FC = () => (
  <svg {...iconProps}>
    {/* Person walking on crosswalk */}
    <path d="M12 22v-4l-2-2 2-2 2 2-2 2"/>
    <circle cx="12" cy="6" r="2"/>
    
    {/* Zebra stripes */}
    <path d="M3 22h18"/>
    <path d="M3 19h18"/>
  </svg>
);

export const BusIcon: React.FC = () => (
    <svg {...iconProps}>
      <path d="M19 17h2v2H3v-2h2" />
      <path d="M3 17V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11" />
      <path d="M8 6h8" />
      <circle cx="7" cy="12" r="1" />
      <circle cx="17" cy="12" r="1" />
    </svg>
);

export const HomeIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);