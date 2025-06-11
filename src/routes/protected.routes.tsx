import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { LogOut, ChevronDown, User, Settings, X, Menu, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated, loading, user, logout } = useLogin();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-6 max-w-md mx-auto text-center">
          {/* Logo animado */}
          <div className="relative">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-10 h-10 bg-primary-foreground rounded-lg"></div>
            </div>
            <div className="absolute -inset-2 bg-primary/20 rounded-3xl animate-ping"></div>
          </div>

          {/* Texto de carga */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">NutriZone</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              </div>
              <p className="text-muted-foreground text-sm">
                Cargando tu sesión...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no renderizar nada (el useEffect manejará la redirección)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header global para rutas protegidas */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y marca */}
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2 group">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">NutriZone</h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {currentTime.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
              </Link>
            </div>

            {/* Espacio central - Puede usarse para breadcrumbs o título de página */}
            <div className="hidden md:flex items-center">
              {/* Aquí puedes agregar breadcrumbs o título de página si lo deseas */}
            </div>

            {/* Acciones y perfil de usuario */}
            <div className="flex items-center space-x-4">
              {/* Notificaciones */}
              {/* <div className="relative hidden sm:block">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]">3</Badge>
                </Button>
              </div> */}

              {/* Menú desplegable de usuario */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-2 py-1.5 h-auto">
                    <Avatar className="h-8 w-8 border-2 border-primary/10">
                      <AvatarImage src={user?.avatar} alt={user?.name || 'Usuario'} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start">
                      <p className="text-sm font-medium text-foreground">
                        {user?.name}
                      </p>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-xs text-muted-foreground capitalize">
                          {user?.role || 'Usuario'}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mi Perfil</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Botón de menú móvil */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={cn(
          "md:hidden bg-card border-t border-border overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="px-4 py-3 space-y-3">
            <nav className="flex flex-col space-y-1">
              <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200 flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </Link>
              <Link to="/dashboard/profile" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </Link>
              <Link to="/dashboard/settings" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Ajustes</span>
              </Link>
            </nav>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name || 'Usuario'} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role || 'Usuario'}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer opcional */}
      <footer className="bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>© 2024 NutriZone. Todos los derechos reservados.</p>
            <div className="flex items-center space-x-4">
              <span>Versión 1.0.0</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Sistema activo</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};