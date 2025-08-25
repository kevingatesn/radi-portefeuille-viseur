import React from "react";

export interface HeroImageProps {
  className?: string;
  alt?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ 
  className = "", 
  alt = "Investment growth illustration" 
}) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 300"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--electric-blue))" />
            <stop offset="50%" stopColor="hsl(var(--vibrant-violet))" />
            <stop offset="100%" stopColor="hsl(var(--neon-green))" />
          </linearGradient>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--neon-green))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--neon-green))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Background circles */}
        <circle cx="350" cy="50" r="30" fill="hsl(var(--solar-orange))" opacity="0.2" className="animate-float" />
        <circle cx="50" cy="80" r="20" fill="hsl(var(--electric-blue))" opacity="0.3" className="animate-float" />
        <circle cx="300" cy="250" r="25" fill="hsl(var(--vibrant-violet))" opacity="0.2" className="animate-float" />
        
        {/* Growth chart */}
        <path
          d="M50 200 Q100 150 150 120 T250 80 Q300 60 350 50"
          stroke="hsl(var(--neon-green))"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className="drop-shadow-lg"
        />
        
        {/* Chart area fill */}
        <path
          d="M50 200 Q100 150 150 120 T250 80 Q300 60 350 50 L350 250 L50 250 Z"
          fill="url(#chartGradient)"
        />
        
        {/* Data points */}
        <circle cx="50" cy="200" r="6" fill="hsl(var(--electric-blue))" className="animate-glow" />
        <circle cx="150" cy="120" r="6" fill="hsl(var(--solar-orange))" className="animate-glow" />
        <circle cx="250" cy="80" r="6" fill="hsl(var(--vibrant-violet))" className="animate-glow" />
        <circle cx="350" cy="50" r="6" fill="hsl(var(--neon-green))" className="animate-glow" />
        
        {/* Coins/Money symbols */}
        <g transform="translate(280, 180)">
          <circle r="15" fill="hsl(var(--solar-orange))" />
          <text x="0" y="5" textAnchor="middle" className="text-xs font-bold" fill="white">$</text>
        </g>
        
        <g transform="translate(320, 200)">
          <circle r="12" fill="hsl(var(--electric-blue))" />
          <text x="0" y="4" textAnchor="middle" className="text-xs font-bold" fill="white">€</text>
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none rounded-lg" />
    </div>
  );
};

export default HeroImage;