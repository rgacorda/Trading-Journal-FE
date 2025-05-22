import { http } from '@/lib/http';

type LoginCredentials = {
  email: string;
  password: string;
};

type AuthResponse = {
  message: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
};

type RegisterCredentials = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
};

export const AuthService = {
  login: (credentials: LoginCredentials) => {
    return http.post<AuthResponse>('/auth/login', credentials);
  },

  logout: () => {
    return http.post('/auth/logout');
  },

  register: (credentials: RegisterCredentials) => {
    return http.post<AuthResponse>('/auth/register', credentials);
  },

//   getCurrentUser: () => {
//     return http.get<AuthResponse['user']>('/auth/me');
//   },
};