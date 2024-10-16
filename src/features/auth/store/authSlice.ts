import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, AuthResponse, LoginRequest } from '../api/authApi';
import axios from 'axios';
import { generateSessionId, getCurrentToken, getCurrentUserId, getSessionId } from '@/utils/getLocalStorageData';
import { RootState } from '@/store/app-store';

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
  userId: string | null;
  sessionId: string;
  isLoading: boolean;
  isCartLoading: boolean;
  cartDrawerOpen: boolean;
  mobileNavBarOpen: boolean;
  afterLoginRedirect: string;
  loginSuccess: boolean; // Add this line
}

const initialState: AuthState = {
  token: getCurrentToken(),
  userId: getCurrentUserId(),
  sessionId: getSessionId(),
  isLoading: false,
  isCartLoading: false,
  cartDrawerOpen: false,
  mobileNavBarOpen: false,
  afterLoginRedirect: "/",
  loginSuccess: false, // Add this line
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthResponse>) => {
      localStorage.setItem("token", action.payload.token);
      action.payload.customer && localStorage.setItem("userId", action.payload.customer?.id);
      state.token = action.payload.token;
      action.payload.customer && (state.userId = action.payload.customer.id);
      state.loginSuccess = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isCartLoading = action.payload;
    },
    setCartDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.cartDrawerOpen = action.payload
    },
    setMobileNavbarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileNavBarOpen = action.payload
    },
    setAfterLoginRedirect: (state, action: PayloadAction<string>) => {
      state.afterLoginRedirect = action.payload
    },
    logOut: (state) => {
      state.token = null;
      state.userId = null;
      state.sessionId = generateSessionId()
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
});


export function logIn(request: LoginRequest) {
  return async function logInThunk(dispatch: any, getState: any) {
    try {
      dispatch(setLoading(true)); // Start loading

      const response = await axios.post(
        "http://196.188.249.25:5000/user/auth/login",
        request,
        {
          headers: {
            'sessionId': request.sessionId, // Add sessionId from the request to headers
          },
        }
      );
      
      dispatch(setSession({ token: response.data.data.token, customer: response.data.data.customer }));
 
    } catch (error: any) {}
    finally {
      dispatch(setLoading(false)); 
    }
  };
}

export const { setSession, logOut,setLoading, setCartLoading, setCartDrawerOpen, setMobileNavbarOpen, setAfterLoginRedirect } = authSlice.actions;


export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectSessionId = (state: RootState) => state.auth.sessionId;
export const selectIsLoading = (state: RootState):boolean => state.auth.isLoading;
export const selectIsCartLoading = (state: RootState):boolean => state.auth.isCartLoading;
export const selectCartDrawerOpen = (state: RootState):boolean => state.auth.cartDrawerOpen;
export const selectMobileNavBarOpen = (state: RootState):boolean => state.auth.mobileNavBarOpen;
export const selectAfterLoginRedirect = (state: RootState):string => state.auth.afterLoginRedirect;
export const selectLoginSuccess = (state: RootState):boolean => state.auth.loginSuccess;
export default authSlice.reducer;



// Other code such as selectors can use the imported `RootState` type
// export const selectSession = (state: RootState):Session => state.auth.session;
// export const selectIsLoading = (state: RootState):boolean => state.auth.isLoading;

export const authReducer = authSlice.reducer;
