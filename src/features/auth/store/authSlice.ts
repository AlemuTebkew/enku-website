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
  token: string | null
  userId: string | null,
  sessionId: string,
  isLoading: boolean
}

const initialState: AuthState = {
  token: getCurrentToken(),
  userId: getCurrentUserId(),
  sessionId: getSessionId(),
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthResponse>) => {
      localStorage.setItem("token", JSON.stringify(action.payload));
      localStorage.setItem("userId", JSON.stringify(action.payload));
      state.token = action.payload.token;
      action.payload.customer && (state.userId = action.payload.customer.id)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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
        "http://ec2-3-91-23-59.compute-1.amazonaws.com:5000/user/auth/login",
        request,
        {
          headers: {
            'sessionId': request.sessionId, // Add sessionId from the request to headers
          },
        }
      );
      
      dispatch(setSession({ token: response.data.token, customer: response.data.customer }));
 
    } catch (error: any) {}
    finally {
      dispatch(setLoading(false)); 
    }
  };
}

export const { setSession, logOut,setLoading } = authSlice.actions;


export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectSessionId = (state: RootState) => state.auth.sessionId;
export const selectIsLoading = (state: RootState):boolean => state.auth.isLoading;
export default authSlice.reducer;



// Other code such as selectors can use the imported `RootState` type
// export const selectSession = (state: RootState):Session => state.auth.session;
// export const selectIsLoading = (state: RootState):boolean => state.auth.isLoading;

export const authReducer = authSlice.reducer;
