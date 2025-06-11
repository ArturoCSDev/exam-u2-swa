export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  users: Array<User & { password: string }>;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface PasswordStrength {
  level: 'weak' | 'medium' | 'strong';
  color: string;
  score: number;
}