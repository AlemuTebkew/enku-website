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
  selectLoginSuccess
} from "../store/authSlice";
import { LoginRequest } from "../api/authApi";

export const useAuth = (): {
  token: string | null;
  userId: string | null;
  cartDrawerOpen: boolean;
  mobileNavBarOpen: boolean;
  submitLoginRequest: (request: LoginRequest) => void;
  logOut: () => void;
  setCartDrawerOpen: (value: boolean) => void;
  setMobileNavbarOpen: (value: boolean) => void;
  selectIsLoading?: boolean;
  selectLoginSuccess?: boolean
} => {
  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);
  const isLoading = useAppSelector(selectIsLoading);
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
    setCartDrawerOpen: (value: boolean) => {
      dispatch(setCartDrawerOpen(value))
    },
    setMobileNavbarOpen: (value: boolean) => {
      dispatch(setMobileNavbarOpen(value))
    },
    selectIsLoading: isLoading,
    selectLoginSuccess: loginSuccess
  };
};
