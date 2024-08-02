// src/hooks/useCart.ts
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLocalStorageItem, getLocalStorageItem, generateSessionId } from '../../../utils/storage';
import { OrderShippingInfo, useOrderCheckoutMutation } from '../api/OrderCheckoutApi';

import { RootState } from '@/store/app-store';

export const useOrder = () => {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const sessionId = getLocalStorageItem('sessionId') || generateSessionId();

  useEffect(() => {
    if (!getLocalStorageItem('sessionId')) {
      setLocalStorageItem('sessionId', sessionId);
    }
  }, [sessionId]);


  const [CheckoutOrder, {isLoading: isOrderCheckoutLoading, isError: isOrderCheckoutError, isSuccess: isOrderCheckoutSuccess}] = useOrderCheckoutMutation()

  const checkoutOrder = async (shippingInfo: OrderShippingInfo) => {
    await CheckoutOrder({ sessionId, userId:token?? null, shippingInfo: {...shippingInfo} });
  };

  return {
    checkoutOrder,
    isOrderCheckoutLoading,
    isOrderCheckoutError,
    isOrderCheckoutSuccess
  };
};

export default useOrder;
