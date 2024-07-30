// src/hooks/useCart.ts
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLocalStorageItem, getLocalStorageItem, generateSessionId } from '../../../utils/storage';
import { useGetCartQuery, useSaveCartMutation, useGetCartItemsCountQuery } from '../api/CartApi';

import { AddCartItemModel, CartItemModel } from '../../../models/cart';
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
  const { data: itemCount } = useGetCartItemsCountQuery({ sessionId, userId });

  const [saveCart] = useSaveCartMutation();

  const addToCart = (item: AddCartItemModel) => {
    saveCart({ sessionId, userId, cart: item });
  };

  return {
    items,
    itemCount,
    addToCart,
    refetch,
  };
};

export default useCart;
