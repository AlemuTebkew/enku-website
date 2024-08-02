import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

interface Customer {
  customer: {
    id: string;
    phoneNumber: string;
    name?: string;
    email?: string;
  } | null;
}

interface AuthState {
  token: string | null;
  userId: string | null
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  userId: typeof window !== 'undefined' ? localStorage.getItem('userId') : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginOrRegister.matchFulfilled,
      (state, action: PayloadAction<{ token: string; customer: Customer['customer']}>) => {
        const { token, customer } = action.payload;
        state.token = token;
        state.userId = customer?.id ?? null;
        localStorage.setItem('token', token);
        customer?.id && localStorage.setItem('userId', customer.id);
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
