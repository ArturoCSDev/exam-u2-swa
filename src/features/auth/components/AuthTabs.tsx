import React from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { UserRound } from 'lucide-react';

interface AuthTabsProps {
  activeTab: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
  onLoginSuccess?: () => void;
  onRegisterSuccess?: () => void;
}

export const AuthTabs: React.FC<AuthTabsProps> = ({ 
  activeTab,
  onTabChange,
  onLoginSuccess, 
  onRegisterSuccess
}) => {
  return (
    <div className="w-full">
      {/* Custom Tabs */}
      <div className="flex mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-1.5 gap-2 border border-white/10 shadow-lg">
        <button
          className={`
            flex-1 px-5 py-3 font-semibold text-sm transition-all duration-300 ease-in-out
            rounded-lg relative overflow-hidden flex items-center justify-center gap-2
            ${activeTab === 'login'
              ? 'text-white bg-gradient-to-r from-emerald-600 to-green-500 shadow-md shadow-emerald-900/30' 
              : 'text-black/70 hover:text-black hover:bg-black/10'
            }
          `}
          onClick={() => onTabChange('login')}
        >
          <UserRound className="w-4 h-4" />
          <span>Iniciar Sesión</span>
          {activeTab === 'login' && (
            <span className="absolute inset-0 bg-white/10 animate-pulse-slow opacity-0 hover:opacity-100 transition-opacity"></span>
          )}
        </button>
        {/* <button
          className={`
            flex-1 px-5 py-3 font-semibold text-sm transition-all duration-300 ease-in-out
            rounded-lg relative overflow-hidden flex items-center justify-center gap-2
            ${activeTab === 'register'
              ? 'text-white bg-gradient-to-r from-emerald-600 to-green-500 shadow-md shadow-emerald-900/30' 
              : 'text-black/70 hover:text-black hover:bg-black/10'
            }
          `}
          onClick={() => onTabChange('register')}
        >
          <UserPlus className="w-4 h-4" />
          <span>Registrarse</span>
          {activeTab === 'register' && (
            <span className="absolute inset-0 bg-white/10 animate-pulse-slow opacity-0 hover:opacity-100 transition-opacity"></span>
          )}
        </button> */}
      </div>
      
      {/* Tab Content */}
      <div className="relative overflow-hidden min-h-[400px]">
        <div 
          className={`transition-all duration-500 ease-in-out transform ${
            activeTab === 'login' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute top-0 left-0 w-full'
          }`}
        >
          <LoginForm onSuccess={onLoginSuccess} />
        </div>
        
        <div 
          className={`transition-all duration-500 ease-in-out transform ${
            activeTab === 'register' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute top-0 left-0 w-full'
          }`}
        >
          <RegisterForm onSuccess={onRegisterSuccess} />
        </div>
      </div>
      
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};