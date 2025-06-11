import { createBrowserRouter } from 'react-router-dom';
import { PublicRoutes } from './public.routes';
import { ProtectedRoutes } from './protected.routes';
import { lazy } from 'react';
import { SuspenseWrapper } from '@/components/ui/SuspenseWrapper';

// Lazy loading de componentes
const Login = lazy(() => import('@/features/auth/pages/Login').then(module => ({ default: module.Login })));
const Dashboard = lazy(() => import('@/features/dashboard/components/Dashboard').then(module => ({ default: module.Dashboard })));

export const router = createBrowserRouter([
  // Rutas públicas
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <PublicRoutes />
      </SuspenseWrapper>
    ),
    children: [
      { 
        path: '/', 
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        )
      },
      { 
        path: 'auth/login', 
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        )
      },
    ],
  },
  
  // Rutas protegidas
  {
    path: '/dashboard',
    element: (
      <SuspenseWrapper>
        <ProtectedRoutes />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: '',
        element: (
          <SuspenseWrapper>
            <Dashboard />
          </SuspenseWrapper>
        )
      },
      // Aquí puedes agregar más rutas protegidas
      // {
      //   path: 'profile',
      //   element: <SuspenseWrapper><Profile /></SuspenseWrapper>
      // },
      // {
      //   path: 'settings',
      //   element: <SuspenseWrapper><Settings /></SuspenseWrapper>
      // },
    ],
  },

  // Ruta 404 - redirige a home
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🤔</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">404</h1>
              <p className="text-muted-foreground">
                Página no encontrada
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              La página que buscas no existe o ha sido movida.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
              >
                Ir al inicio
              </a>
              <a
                href="/auth/login"
                className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors duration-200 font-medium"
              >
                Iniciar sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]);