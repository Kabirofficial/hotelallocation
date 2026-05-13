import React from 'react';

export function Logo({ size = 28, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sleek modern geometric building/A shape */}
      <path 
        d="M16 3L3 28H10.5L16 17.5L21.5 28H29L16 3Z" 
        fill="currentColor" 
      />
      <path 
        d="M16 21L12.5 28H19.5L16 21Z" 
        fill="currentColor" 
        fillOpacity="0.4"
      />
    </svg>
  );
}
