import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Zap, 
  Palette, 
  Code2, 
  LayoutGrid, 
  Router, 
  FileJson, 
  Globe, 
  Mail, 
  Github, 
  ExternalLink 
} from "lucide-react";

const Home = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Error", {
        description: "Por favor ingresa tu correo electrónico",
      });
      return;
    }
    
    toast.success("¡Gracias por suscribirte!", {
      description: "Te mantendremos informado sobre nuevas actualizaciones",
    });
    setEmail("");
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Hero Section */}
      <section className="py-12">
        <div className="flex flex-col items-center text-center">
          <Badge className="px-4 py-1 mb-4 text-sm font-semibold transition-colors rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
            <Zap size={14} className="mr-1" /> v1.0.0 Lanzamiento inicial
          </Badge>
          <h1 className="mb-6 text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Template React Avanzado
          </h1>
          <p className="max-w-2xl mb-8 text-lg text-neutral-600 dark:text-neutral-400">
            Stack moderno para desarrollo frontend con las mejores herramientas y prácticas
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="gap-2 rounded-full">
              <FileJson size={18} /> Ver Documentación
            </Button>
            <Button variant="outline" size="lg" className="gap-2 rounded-full" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github size={18} /> Ver Código Fuente
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center">
          <h2 className="mb-8 text-3xl font-bold">Características Principales</h2>
          
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 transition-all duration-300 border border-transparent rounded-lg shadow-lg hover:border-blue-500 bg-neutral-50 dark:bg-neutral-900 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <Code2 size={28} />
              </div>
              <h3 className="mb-2 text-xl font-medium">React 19</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                La última versión con mejor performance y nuevas APIs
              </p>
              <Badge className="mt-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                Actualizado 2025
              </Badge>
            </div>

            {/* Feature 2 */}
            <div className="p-6 transition-all duration-300 border border-transparent rounded-lg shadow-lg hover:border-blue-500 bg-neutral-50 dark:bg-neutral-900 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-gradient-to-r from-teal-500 to-green-500 rounded-xl">
                <LayoutGrid size={28} />
              </div>
              <h3 className="mb-2 text-xl font-medium">Tailwind v4</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                CSS utilitario con mejor soporte para componentes modernos
              </p>
              <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Zero Runtime
              </Badge>
            </div>

            {/* Feature 3 */}
            <div className="p-6 transition-all duration-300 border border-transparent rounded-lg shadow-lg hover:border-blue-500 bg-neutral-50 dark:bg-neutral-900 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl">
                <Palette size={28} />
              </div>
              <h3 className="mb-2 text-xl font-medium">Shadcn UI</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Componentes accesibles y personalizables 
              </p>
              <div className="flex items-center justify-center mt-4">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                  Personalizable
                </Badge>
                <a 
                  href="https://ui.shadcn.com/docs/theming#base-colors" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 ml-2 text-blue-500 hover:underline"
                >
                  Cambiar colores base <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 transition-all duration-300 border border-transparent rounded-lg shadow-lg hover:border-blue-500 bg-neutral-50 dark:bg-neutral-900 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                <Globe size={28} />
              </div>
              <h3 className="mb-2 text-xl font-medium">TanStack Query</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Gestión de estados asíncronos con caching inteligente
              </p>
              <Badge className="mt-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                Data fetching
              </Badge>
            </div>

            {/* Feature 5 */}
            <div className="p-6 transition-all duration-300 border border-transparent rounded-lg shadow-lg hover:border-blue-500 bg-neutral-50 dark:bg-neutral-900 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl">
                <FileJson size={28} />
              </div>
              <h3 className="mb-2 text-xl font-medium">Axios Configurado</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Cliente HTTP con interceptores para peticiones y autenticación
              </p>
              <Badge className="mt-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                API Ready
              </Badge>
            </div>

            {/* Feature 6 */}
            <div className="p-6 transition-all duration-300 border border-transparent rounded-lg shadow-lg hover:border-blue-500 bg-neutral-50 dark:bg-neutral-900 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                <Router size={28} />
              </div>
              <h3 className="mb-2 text-xl font-medium">React Router</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Configurado con rutas públicas y protegidas por autenticación
              </p>
              <Badge className="mt-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100">
                Auth protection
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Newsletter Section */}
      <section className="py-12">
        <div className="max-w-2xl p-8 mx-auto rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-100 dark:border-blue-900">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
            <Mail size={24} />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-center">Mantente Actualizado</h2>
          <p className="mb-6 text-center text-neutral-600 dark:text-neutral-400">
            Recibe notificaciones sobre nuevas versiones y características
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <Label htmlFor="email" className="text-neutral-700 dark:text-neutral-300">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-blue-200 dark:border-blue-800 focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" className="w-full gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              <Mail size={16} /> Suscribirse
            </Button>
          </form>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} Mi Proyecto React
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="px-3 py-1 font-medium border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
            <Code2 size={14} className="mr-1" /> React 19
          </Badge>
          <Badge variant="outline" className="px-3 py-1 font-medium border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300">
            <LayoutGrid size={14} className="mr-1" /> Tailwind v4
          </Badge>
          <Badge variant="outline" className="px-3 py-1 font-medium border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300">
            <Palette size={14} className="mr-1" /> Shadcn
          </Badge>
          <Badge variant="outline" className="px-3 py-1 font-medium border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300">
            <Globe size={14} className="mr-1" /> TanStack Query
          </Badge>
          <Badge variant="outline" className="px-3 py-1 font-medium border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300">
            <FileJson size={14} className="mr-1" /> Axios
          </Badge>
          <Badge variant="outline" className="px-3 py-1 font-medium border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
            <Router size={14} className="mr-1" /> React Router
          </Badge>
        </div>
        <div className="mt-6">
          <a 
            href="https://ui.shadcn.com/docs/theming#base-colors" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            <Palette size={16} className="mr-2" /> Personalizar colores base <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;