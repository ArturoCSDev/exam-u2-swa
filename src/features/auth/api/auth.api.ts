import { API_ENDPOINTS } from "@/lib/api/endpoints";
import axiosInstance from "@/lib/api/axios-instance";
import type {
  LoginCredentials,
  LoginResponse,
  User,
  ChangePasswordRequest,
  ChangePasswordResponse,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/auth.types";
import type { ApiResponse } from "@/lib/api/api.types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data: response } = await axiosInstance.post<
      ApiResponse<LoginResponse>
    >(API_ENDPOINTS.AUTH.LOGIN, credentials);

    if (!response.success || !response.data) {
      throw new Error(response.message);
    }

    return response.data;
  },

  changePassword: async (
    request: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> => {
    const { data: response } = await axiosInstance.post<
      ApiResponse<ChangePasswordResponse>
    >(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, request);

    if (!response.success || !response.data) {
      throw new Error(response.message);
    }

    return response.data;
  },

  requestPasswordReset: async (
    request: RequestPasswordResetRequest
  ): Promise<RequestPasswordResetResponse> => {
    const { data: response } = await axiosInstance.post<
      ApiResponse<RequestPasswordResetResponse>
    >(API_ENDPOINTS.AUTH.REQUEST_PASSWORD_RESET, request);

    if (!response.success || !response.data) {
      throw new Error(response.message);
    }

    return response.data;
  },

  resetPassword: async (
    request: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    const { data: response } = await axiosInstance.post<
      ApiResponse<ResetPasswordResponse>
    >(API_ENDPOINTS.AUTH.RESET_PASSWORD, request);

    if (!response.success || !response.data) {
      throw new Error(response.message);
    }

    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data: response } = await axiosInstance.get<ApiResponse<User>>(
      API_ENDPOINTS.AUTH.ME
    );

    if (!response.success || !response.data) {
      throw new Error(response.message);
    }

    return response.data;
  },
};
