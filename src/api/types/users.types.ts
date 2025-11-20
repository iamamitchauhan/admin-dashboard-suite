// User API Request Types
export interface GetUsersRequest {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'pending' | 'blocked' | 'all';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

export interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
}

export interface DeleteUserRequest {
  id: string;
}

// User API Response Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetUserResponse {
  user: User;
}

export interface CreateUserResponse {
  user: User;
  message: string;
}

export interface UpdateUserResponse {
  user: User;
  message: string;
}

export interface DeleteUserResponse {
  message: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface GetUserActivityRequest {
  userId: string;
  page?: number;
  limit?: number;
}

export interface GetUserActivityResponse {
  activities: UserActivity[];
  total: number;
  page: number;
  limit: number;
}
