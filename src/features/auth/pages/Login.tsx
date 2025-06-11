import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';
import { AuthTabs } from '../components/AuthTabs';
import { AuthFooter } from '../components/AuthFooter';
import { useLogin } from '../hooks/useLogin';

export const Login: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const { isAuthenticated } = useLogin();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    console.log('Login exitoso, redirigiendo...');
    navigate('/dashboard');
  };
  
  const handleRegisterSuccess = () => {
    console.log('Registro exitoso, redirigiendo...');
    navigate('/dashboard');
  };
  
  const handleTabChange = (newTab: 'login' | 'register') => {
    setCurrentTab(newTab);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Fondo dinámico con temática fitness */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 z-0">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-[10%] left-[5%] w-40 h-40 rounded-full bg-lime-300 blur-3xl"></div>
          <div className="absolute top-[60%] right-[10%] w-56 h-56 rounded-full bg-emerald-400 blur-3xl"></div>
          <div className="absolute bottom-[5%] left-[20%] w-64 h-64 rounded-full bg-teal-400 blur-3xl"></div>
          
          {/* Iconos fitness como decoración */}
          <div className="absolute top-[15%] right-[15%] text-white/10 text-[120px] font-bold">💪</div>
          <div className="absolute bottom-[20%] right-[25%] text-white/10 text-[100px] font-bold">🥤</div>
          <div className="absolute top-[40%] left-[10%] text-white/10 text-[80px] font-bold">🍎</div>
          <div className="absolute bottom-[10%] right-[10%] text-white/10 text-[90px] font-bold">🏋️</div>
        </div>
        
        {/* Patrón de fondo */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi02aDZ2LTZoLTZ2NnptLTYgMGg2di02aC02djZ6bTYgNnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-md z-10 relative">
        {/* Header */}
        <AuthHeader 
          title="NutriZone"
          subtitle={currentTab === 'login' 
            ? 'Inicia sesión en tu cuenta' 
            : 'Crea tu nueva cuenta'
          }
        />

        {/* Main Card */}
        <div className="bg-card/90 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-md animate-slideUp">
          <AuthTabs 
            activeTab={currentTab}
            onTabChange={handleTabChange}
            onLoginSuccess={handleLoginSuccess}
            onRegisterSuccess={handleRegisterSuccess}
          />
        </div>

        {/* Footer */}
        <AuthFooter 
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
        
        {/* Slogan fitness */}
        <div className="mt-8 text-center text-white/70 text-sm font-medium animate-pulse">
          Nutrición personalizada para alcanzar tus metas fitness
        </div>
      </div>
      
      <style>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out 0.3s both;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};