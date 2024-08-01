import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

interface AuthState {
  token: string | null;
  customer: {
    id: string;
    phoneNumber: string;
    name?: string;
    email?: string;
  } | null;
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  customer: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('customer') || 'null') : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.customer = null;
      localStorage.removeItem('token');
      localStorage.removeItem('customer');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginOrRegister.matchFulfilled,
      (state, action: PayloadAction<{ token: string; customer: AuthState['customer'] }>) => {
        const { token, customer } = action.payload;
        state.token = token;
        state.customer = customer;
        localStorage.setItem('token', token);
        localStorage.setItem('customer', JSON.stringify(customer));
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
