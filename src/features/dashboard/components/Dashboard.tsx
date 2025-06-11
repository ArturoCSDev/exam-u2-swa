import React from 'react';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { User, Shield } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useLogin();

  return (
    <div className="min-h-screen bg-background">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 border border-primary/20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  ¡Bienvenido de vuelta, {user?.name}! 👋
                </h2>
                <p className="text-muted-foreground">
                  Has iniciado sesión exitosamente en NutriZone
                  {user?.role === 'admin' && ' como administrador'}.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Estado
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    Autenticado ✅
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Rol
                  </p>
                  <p className="text-2xl font-bold text-foreground capitalize">
                    {user?.role}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {user?.role === 'admin' ? (
                    <Shield className="w-6 h-6 text-primary" />
                  ) : (
                    <User className="w-6 h-6 text-primary" />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Sesión
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    Activa
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Información de Usuario
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="text-foreground font-mono text-sm">{user?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha de registro:</span>
                <span className="text-foreground">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Demo Info */}
          <div className="bg-muted/50 rounded-lg p-6 border border-dashed border-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              🚀 Modo Demo
            </h3>
            <p className="text-muted-foreground text-sm">
              Esta es una demostración del sistema de autenticación.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};