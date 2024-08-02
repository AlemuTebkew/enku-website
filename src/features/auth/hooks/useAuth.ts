// src/hooks/useCart.ts
import { useEffect } from 'react';
import { setLocalStorageItem, getLocalStorageItem, generateSessionId } from '../../../utils/storage';
import { LoginInfo, useFetchProfileQuery, useLoginOrRegisterMutation } from '../api/authApi';

import { RootState } from '@/store/app-store';
import { useAppSelector } from '@/store/app-store-hooks';

export const useAuth = () => {
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  
  const sessionId = getLocalStorageItem('sessionId') || generateSessionId();

  useEffect(() => {
    if (!getLocalStorageItem('sessionId')) {
      setLocalStorageItem('sessionId', sessionId);
    }
  }, [sessionId]);

  // const { data: loggedInfo, isLoading: isFetchProfileLoading, isSuccess: isFetchProfileSucess, isError: isFetchProfileError} = useFetchProfileQuery(token ?? "");
 
  const [Login, {isLoading: isLoginLoading, isError: isLoginError, isSuccess: isLoginSuccess}] = useLoginOrRegisterMutation();

  const login = async (loginInfo: LoginInfo) => {
    await Login({ sessionId, loginInfo });
  };

  return {
    // loggedInfo,
    login,
    isLoginLoading,
    isLoginError,
    isLoginSuccess
  };
};

export default useAuth;