import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md' }) => {
  const sizeClasses = {
    sm: variant === 'full' ? 'h-8' : 'h-8',
    md: variant === 'full' ? 'h-10' : 'h-10',
    lg: variant === 'full' ? 'h-12' : 'h-12',
  };

  return (
    <div className="flex items-center">
      <img 
        src="/logo.png" 
        alt="CalmCue Logo" 
        className={`${sizeClasses[size]}`} 
      />
      {variant === 'full' && (
        <div className="ml-2 flex flex-col">
          <span className="text-2xl font-bold text-primary-600">CalmCue</span>
          {size !== 'sm' && (
            <span className="text-xs uppercase tracking-wider text-neutral-500">Stress Management</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;