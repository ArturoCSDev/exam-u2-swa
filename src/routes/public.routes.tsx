import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLogin } from '@/features/auth/hooks/useLogin';

export const PublicRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-foreground font-medium">NutriZone</p>
            <p className="text-muted-foreground text-sm">Verificando autenticación...</p>
          </div>
        </div>
      </div>
    );
  }

  // Si está autenticado, no renderizar nada (el useEffect manejará la redirección)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Outlet />
    </div>
  );
};