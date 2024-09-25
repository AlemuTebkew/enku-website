import { useAppDispatch, useAppSelector } from "../../../store/app-store-hooks";
import { 
  logIn, 
  logOut, 
  selectIsLoading, 
  selectToken, 
  selectUserId, 
  selectCartDrawerOpen, 
  selectMobileNavBarOpen,
  setCartDrawerOpen,
  setMobileNavbarOpen,
  selectLoginSuccess,
  selectIsCartLoading,
  setCartLoading
} from "../store/authSlice";
import { LoginRequest } from "../api/authApi";

export const useAuth = (): {
  token: string | null;
  userId: string | null;
  cartDrawerOpen: boolean;
  mobileNavBarOpen: boolean;
  submitLoginRequest: (request: LoginRequest) => void;
  logOut: () => void;
  setCartLoading: (value: boolean) => void;
  setCartDrawerOpen: (value: boolean) => void;
  setMobileNavbarOpen: (value: boolean) => void;
  selectIsLoading?: boolean;
  selectIsCartLoading?: boolean;
  selectLoginSuccess?: boolean
} => {
  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);
  const isLoading = useAppSelector(selectIsLoading);
  const isCartLoading = useAppSelector(selectIsCartLoading);
  const cartDrawerOpen = useAppSelector(selectCartDrawerOpen);
  const mobileNavBarOpen = useAppSelector(selectMobileNavBarOpen);
  const loginSuccess = useAppSelector(selectLoginSuccess)

  const dispatch = useAppDispatch();
  return {
    token,
    userId,
    cartDrawerOpen,
    mobileNavBarOpen,
    submitLoginRequest: (request: LoginRequest) => {
      void dispatch(logIn(request));
    },
    logOut: () => {
      dispatch(logOut());
    },
    setCartLoading: (value: boolean) => {
      dispatch(setCartLoading(value))
    },
    setCartDrawerOpen: (value: boolean) => {
      dispatch(setCartDrawerOpen(value))
    },
    setMobileNavbarOpen: (value: boolean) => {
      dispatch(setMobileNavbarOpen(value))
    },
    selectIsLoading: isLoading,
    selectIsCartLoading: isCartLoading,
    selectLoginSuccess: loginSuccess
  };
};