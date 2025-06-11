import { toast } from "sonner";
import { AxiosError, isAxiosError } from "axios";
import type { ApiErrorResponse } from "./api.types";

export type ErrorMessages = {
  [key: string]: string;
};

const AUTH_ERROR_MESSAGES: ErrorMessages = {
  InvalidCredentialsError: "Credenciales inválidas",
  InvalidTokenError: "Sesión expirada",
  UserAlreadyExistsError: "El correo electrónico ya está registrado",
  InvalidCodeError: "Código inválido",
  UserNotFoundError: "Usuario no encontrado",
};

const GENERIC_ERROR_MESSAGES: Record<number, string> = {
  400: "Los datos proporcionados no son válidos",
  401: "No autorizado",
  403: "No tienes permiso para realizar esta acción",
  404: "Recurso no encontrado",
  409: "Ya existe un registro con estos datos",
  500: "Error del servidor",
};

export const handleApiError = (
  error: Error | AxiosError<ApiErrorResponse>,
  _variables?: unknown,
  _context?: unknown,
  customMessages: ErrorMessages = {}
) => {
  if (!isAxiosError(error)) {
    toast.error("Error inesperado");
    return;
  }

  const errorResponse = error.response?.data;
  const errorMessage = error.message;
  const status = errorResponse?.statusCode || error.response?.status || 500;

  // Primero chequeamos si hay un mensaje de error específico del backend
  if (errorResponse?.error) {
    const messages = { ...AUTH_ERROR_MESSAGES, ...customMessages };
    // Buscamos si el error coincide con alguno de nuestros mensajes personalizados
    for (const [errorKey, message] of Object.entries(messages)) {
      if (errorResponse.error.includes(errorKey)) {
        toast.error(message);
        return;
      }
    }
    // Si no encontramos coincidencia, usamos el mensaje del backend
    toast.error(errorMessage);
    return;
  }

  // Si no hay un error específico, usamos el mensaje genérico según el status
  toast.error(
    errorResponse?.message ||
      GENERIC_ERROR_MESSAGES[status] ||
      "Error inesperado"
  );
};
