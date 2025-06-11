import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AuthFooterProps {
  currentTab: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ 
  currentTab, 
  onTabChange
}) => {
  const isLogin = currentTab === 'login';
  
  return (
    <div className="text-center mt-8 animate-fadeIn">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
        <p className="text-white/90 text-sm">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          {' '}
          <button
            onClick={() => onTabChange(isLogin ? 'register' : 'login')}
            className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-semibold transition-all duration-200 hover:underline transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 rounded px-1"
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            <ArrowRight className="w-3 h-3" />
          </button>
        </p>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
};