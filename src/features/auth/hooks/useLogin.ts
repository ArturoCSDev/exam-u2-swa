import { useState } from 'react';
import { useAuthStore } from '../stores/auth.store';

export const useLogin = () => {
  const {
    user,
    isAuthenticated,
    loading,
    error,
    login: storeLogin,
    register,
    logout,
    clearError,
    isEmailTaken,
    getUserByEmail,
  } = useAuthStore();
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Función mejorada de login con validaciones adicionales
  const login = async (credentials: { email: string; password: string }) => {
    clearError();
    setValidationErrors({});
    
    // Validar que los campos no estén vacíos
    const errors: Record<string, string> = {};
    if (!credentials.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      errors.email = 'El formato del email es inválido';
    }
    
    if (!credentials.password) {
      errors.password = 'La contraseña es requerida';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return { success: false, error: 'Por favor, corrige los errores en el formulario' };
    }
    
    // Verificar si el usuario existe
    const userExists = getUserByEmail(credentials.email);
    if (!userExists) {
      return { success: false, error: 'Este usuario no existe en el sistema' };
    }
    
    // Intentar login con el store
    try {
      const result = await storeLogin(credentials);
      return result;
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error inesperado durante el login' 
      };
    }
  };

  return {
    // Estado
    user,
    isAuthenticated,
    loading,
    error,
    validationErrors,
    
    // Acciones
    login,
    register,
    logout,
    clearError,
    
    // Utilidades
    isEmailTaken,
    getUserByEmail,
    clearValidationErrors: () => setValidationErrors({}),
  };
};