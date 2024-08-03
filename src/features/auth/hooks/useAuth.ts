import { useAppDispatch, useAppSelector } from "../../../store/app-store-hooks";
import { logIn, logOut, selectIsLoading, selectToken, selectUserId } from "../store/authSlice";
import { LoginRequest } from "../api/authApi";

export const useAuth = (): {
  token: string | null;
  userId: string | null;
  submitLoginRequest: (request: LoginRequest) => void;
  logOut: () => void;
  selectIsLoading?: boolean;
} => {
  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);
  const isLoading = useAppSelector(selectIsLoading);

  const dispatch = useAppDispatch();
  return {
    token,
    userId,
    submitLoginRequest: (request: LoginRequest) => {
      void dispatch(logIn(request));
    },
    logOut: () => {
      dispatch(logOut());
    },
    selectIsLoading: isLoading,
  };
};
