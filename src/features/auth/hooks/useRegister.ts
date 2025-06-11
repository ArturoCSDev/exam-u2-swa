import { useState } from 'react';
import { useAuthStore } from '../stores/auth.store';

export const useRegister = () => {
  const {
    register: storeRegister,
    loading,
    error,
    clearError,
    isEmailTaken,
  } = useAuthStore();
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Función mejorada de registro con validaciones adicionales
  const register = async (userData: { name: string; email: string; password: string }) => {
    clearError();
    setValidationErrors({});
    
    // Validar que los campos no estén vacíos
    const errors: Record<string, string> = {};
    if (!userData.name.trim()) {
      errors.name = 'El nombre es requerido';
    } else if (userData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(userData.name)) {
      errors.name = 'El nombre solo puede contener letras y espacios';
    }
    
    if (!userData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.email = 'El formato del email es inválido';
    } else if (isEmailTaken(userData.email)) {
      errors.email = 'Este email ya está registrado';
    }
    
    if (!userData.password) {
      errors.password = 'La contraseña es requerida';
    } else if (userData.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/[A-Z]/.test(userData.password)) {
      errors.password = 'La contraseña debe contener al menos una mayúscula';
    } else if (!/[a-z]/.test(userData.password)) {
      errors.password = 'La contraseña debe contener al menos una minúscula';
    } else if (!/\d/.test(userData.password)) {
      errors.password = 'La contraseña debe contener al menos un número';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return { success: false, error: 'Por favor, corrige los errores en el formulario' };
    }
    
    // Intentar registro con el store
    try {
      const result = await storeRegister(userData);
      return result;
    } catch (error) {
      console.error('Error en registro:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error inesperado durante el registro' 
      };
    }
  };

  return {
    // Estado
    loading,
    error,
    validationErrors,
    
    // Acciones
    register,
    clearError,
    
    // Utilidades
    isEmailTaken,
    clearValidationErrors: () => setValidationErrors({}),
  };
};
