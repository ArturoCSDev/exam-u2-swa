export const LazyLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-center">
        <p className="text-foreground font-medium">NutriZone</p>
        <p className="text-muted-foreground text-sm">Cargando...</p>
      </div>
    </div>
  </div>
);
