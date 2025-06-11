import axios, { AxiosInstance } from "axios";
import { authSessionService } from "@/services/session/auth-session.service";

// Configuración base de axios
const axiosConfig = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

// Crear una única instancia de axios
const axiosInstance: AxiosInstance = axios.create(axiosConfig);

// Configurar interceptores
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authSessionService.getToken();

    // Depuración para ver si el token existe
    console.log("Token disponible para autenticación:", !!token);

    if (token) {
      // Asegurarse de que las cabeceras existan
      config.headers = config.headers || {};
      // Añadir token a la cabecera de autorización
      config.headers.Authorization = `Bearer ${token}`;

      // Log para depuración
      console.log(
        "Cabecera de autorización añadida:",
        `Bearer ${token.substring(0, 10)}...`
      );
    } else {
      console.warn("No hay token disponible para autenticar la solicitud");
    }

    return config;
  },
  (error) => {
    console.error("Error en interceptor de solicitud:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Comprobar si el error es de autenticación (401)
    if (error.response?.status === 401) {
      console.warn("Error 401: Token inválido o sesión expirada");
      authSessionService.clearSession();
      // Opcional: Redireccionar a página de login
      // window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
