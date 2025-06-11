import React from 'react';
import { Dumbbell } from 'lucide-react';

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ 
  title = "Bienvenido", 
  subtitle = "Inicia sesión en tu cuenta",
  showLogo = true 
}) => {
  return (
    <div className="text-center mb-8 animate-fadeIn">
      {showLogo && (
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse-subtle">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
            FITNESS
          </div>
        </div>
      )}
      
      <h1 className="text-3xl font-bold text-white mb-2 animate-slideDown drop-shadow-md">
        {title}
      </h1>
      
      <p className="text-white/80 animate-slideUp">
        {subtitle}
      </p>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-4px); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out 0.2s both;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out 0.4s both;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};