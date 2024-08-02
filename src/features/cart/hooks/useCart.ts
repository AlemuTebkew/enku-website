// src/hooks/useCart.ts
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLocalStorageItem, getLocalStorageItem, generateSessionId } from '../../../utils/storage';
import { useGetCartItemsQuery, useSaveCartMutation, useGetCartItemsCountQuery, useDeleteCartMutation } from '../api/CartApi';

import { AddCartItemModel, CartItemModel } from '../../../models/cart';
import { RootState } from '@/store/app-store';

export const useCart = () => {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const sessionId = getLocalStorageItem('sessionId') || generateSessionId();

  useEffect(() => {
    if (!getLocalStorageItem('sessionId')) {
      setLocalStorageItem('sessionId', sessionId);
    }
  }, [sessionId]);

  const { data: cartData, isLoading: isFetchCartItemLoading, refetch } = useGetCartItemsQuery({userId:token ?? null, sessionId});
  const { data: itemCount } = useGetCartItemsCountQuery({ sessionId, userId:token ?? null });

  const [saveCart, {isLoading: isSaveCartLoading, isError: isSaveCartError, isSuccess: isSaveCartSuccess}] = useSaveCartMutation();
  const [deleteCartItem, {isLoading: isDeleteCartItemLoading, isError: isDeleteCartItemError, isSuccess: isDeleteCartItemSuccess}] = useDeleteCartMutation();

  const addToCart = async (item: AddCartItemModel) => {
    await saveCart({ sessionId, userId:token?? null, cart: item });
  };

  const deleteCart = (itemId: string) => {
    deleteCartItem({ sessionId, userId:token ?? null, cartItemId: itemId });
  };

  return {
    cartData,
    isFetchCartItemLoading,
    itemCount,
    addToCart,
    isSaveCartLoading,
    isSaveCartError,
    isSaveCartSuccess,
    deleteCart,
    isDeleteCartItemLoading,
    isDeleteCartItemError,
    isDeleteCartItemSuccess,
    refetch,
  };
};

export default useCart;
