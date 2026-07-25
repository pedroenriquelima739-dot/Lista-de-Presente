import React from 'react';

interface BotanicalFrameProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export const BotanicalFrame: React.FC<BotanicalFrameProps> = ({ position, className = '' }) => {
  // Position transform styles
  let transform = '';
  if (position === 'top-right') transform = 'scaleX(-1)';
  if (position === 'bottom-left') transform = 'scaleY(-1)';
  if (position === 'bottom-right') transform = 'scale(-1)';

  return (
    <div className={`pointer-events-none select-none text-[#3E5C38]/40 ${className}`} style={{ transform }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Elegant botanical leaf branch SVG */}
        <path
          d="M10 110C30 90 40 50 110 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Leaves along stem */}
        <path
          d="M25 95C20 80 30 75 40 80C45 82 40 92 25 95Z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M38 82C40 68 52 65 58 73C61 77 52 84 38 82Z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M55 65C52 50 66 45 74 52C78 55 70 65 55 65Z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M75 45C70 30 85 28 91 36C95 40 88 47 75 45Z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M95 25C92 12 105 10 110 18C113 21 106 28 95 25Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Subtle decorative berries / flowers */}
        <circle cx="32" cy="72" r="2.5" fill="currentColor" opacity="0.6" />
        <circle cx="48" cy="55" r="2.5" fill="currentColor" opacity="0.6" />
        <circle cx="68" cy="38" r="2.5" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
};
