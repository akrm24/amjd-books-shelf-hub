
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', animated = true }) => {
  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-5xl',
  };
  
  return (
    <Link to="/" className="inline-block">
      <div className={`font-bold ${sizeClasses[size]} ${animated ? 'animate-logo-pulse' : ''}`}>
        <span className="text-gradient">AMJD</span>
        <span className="text-white"> Books</span>
      </div>
    </Link>
  );
};

export default Logo;
