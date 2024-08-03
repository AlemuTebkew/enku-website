import { appApi } from '../../../store/app-api';  // Import your base appApi

export interface LoginRequest {
  loginInfo: LoginInfo
  sessionId: string | null
}

export interface AuthResponse {
  token: string;
  customer: {
    id: string;
    phoneNumber: string;
    name?: string;
    email?: string;
  } | null;
}

export interface LoginInfo {
  phoneNumber: string;
  password?: string;
}

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    loginOrRegister: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',  // Replace with your actual login endpoint
        method: 'POST',
        body: {...credentials.loginInfo},
        headers: {
          'Content-Type': 'application/json',
          ...(credentials.sessionId !== null && { 'sessionId': credentials.sessionId })
        }
      }),
      invalidatesTags: ['Auth'],
    }),
    fetchProfile: builder.query<AuthResponse['customer'], string>({
      query: (token) => ({
        url: '/auth/me',  // Replace with your actual profile endpoint
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }),
      providesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in function components
export const { useLoginOrRegisterMutation, useFetchProfileQuery } = authApi;