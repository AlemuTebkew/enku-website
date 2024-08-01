import { appApi } from '../../../store/app-api';  // Import your base appApi

interface LoginRequest {
  phoneNumber: string;
  password?: string;
}

interface AuthResponse {
  token: string;
  customer: {
    id: string;
    phoneNumber: string;
    name?: string;
    email?: string;
  } | null;
}

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    loginOrRegister: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',  // Replace with your actual login endpoint
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    fetchProfile: builder.query<AuthResponse['customer'], void>({
      query: () => ({
        url: '/auth/me',  // Replace with your actual profile endpoint
      }),
      providesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in function components
export const { useLoginOrRegisterMutation, useFetchProfileQuery } = authApi;