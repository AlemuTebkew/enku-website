// src/hooks/useCart.ts
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLocalStorageItem, getLocalStorageItem, generateSessionId } from '../../../utils/storage';
import { useGetCartQuery, useSaveCartMutation } from '../api/CartApi';

import { CartItemModel } from '../../../models/cart';
import { RootState } from '@/store/app-store';

export const useCart = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const sessionId = getLocalStorageItem('sessionId') || generateSessionId();

  useEffect(() => {
    if (!getLocalStorageItem('sessionId')) {
      setLocalStorageItem('sessionId', sessionId);
    }
  }, [sessionId]);

  const { data: items, refetch } = useGetCartQuery({userId, sessionId});
  const [saveCart] = useSaveCartMutation();

  const addToCart = (item: CartItemModel) => {
    const updatedItems = items ? [...items, item] : [item];
    saveCart({ sessionId, userId, cart: updatedItems });
  };

  return {
    items,
    addToCart,
    refetch,
  };
};

export default useCart;
