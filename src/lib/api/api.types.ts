export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
  statusCode: number;
}

// Helpers para tipar las respuestas
export type ApiSuccessResponse<T> = ApiResponse<T> & {
  success: true;
  data: T;
};

export type ApiErrorResponse = ApiResponse<never> & {
  success: false;
  error: string;
};
