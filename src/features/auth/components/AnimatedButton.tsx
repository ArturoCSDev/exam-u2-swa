import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showArrow?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  loading = false, 
  variant = "default",
  size = "default",
  className = "",
  showArrow = true,
  ...props 
}) => {
  return (
    <Button
      className={`
        group transition-all duration-300 ease-in-out 
        transform hover:scale-[1.02] active:scale-[0.98] 
        shadow-lg hover:shadow-xl
        ${loading ? 'cursor-not-allowed' : ''}
        ${className}
      `}
      variant={variant}
      size={size}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Cargando...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <span>{children}</span>
          {showArrow && (
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </div>
      )}
    </Button>
  );
};