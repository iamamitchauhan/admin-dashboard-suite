import apiClient from '../interceptor';
import {
  GetUsersRequest,
  GetUsersResponse,
  GetUserResponse,
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserActivityRequest,
  GetUserActivityResponse,
} from '../types/users.types';

export const usersService = {
  /**
   * Get all users with pagination and filters
   */
  getUsers: async (params: GetUsersRequest = {}): Promise<GetUsersResponse> => {
    const response = await apiClient.get<GetUsersResponse>('/users', { params });
    return response.data;
  },

  /**
   * Get single user by ID
   */
  getUserById: async (id: string): Promise<GetUserResponse> => {
    const response = await apiClient.get<GetUserResponse>(`/users/${id}`);
    return response.data;
  },

  /**
   * Create new user
   */
  createUser: async (payload: CreateUserRequest): Promise<CreateUserResponse> => {
    const response = await apiClient.post<CreateUserResponse>('/users', payload);
    return response.data;
  },

  /**
   * Update existing user
   */
  updateUser: async (payload: UpdateUserRequest): Promise<UpdateUserResponse> => {
    const { id, ...data } = payload;
    const response = await apiClient.put<UpdateUserResponse>(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Delete user
   */
  deleteUser: async (payload: DeleteUserRequest): Promise<DeleteUserResponse> => {
    const response = await apiClient.delete<DeleteUserResponse>(`/users/${payload.id}`);
    return response.data;
  },

  /**
   * Get user activity logs
   */
  getUserActivity: async (params: GetUserActivityRequest): Promise<GetUserActivityResponse> => {
    const { userId, ...queryParams } = params;
    const response = await apiClient.get<GetUserActivityResponse>(
      `/users/${userId}/activity`,
      { params: queryParams }
    );
    return response.data;
  },

  /**
   * Bulk delete users
   */
  bulkDeleteUsers: async (userIds: string[]): Promise<{ message: string }> => {
    const response = await apiClient.post('/users/bulk-delete', { userIds });
    return response.data;
  },

  /**
   * Export users data
   */
  exportUsers: async (params: GetUsersRequest = {}): Promise<Blob> => {
    const response = await apiClient.get('/users/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};
