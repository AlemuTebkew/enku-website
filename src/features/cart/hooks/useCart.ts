// src/hooks/useCart.ts
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLocalStorageItem, getLocalStorageItem, generateSessionId } from '../../../utils/storage';
import { useGetCartItemsQuery, useSaveCartMutation, useGetCartItemsCountQuery, useDeleteCartMutation, useUpdateQuantityMutation } from '../api/CartApi';

import { AddCartItemModel, CartItemModel } from '../../../models/cart';
import { RootState } from '@/store/app-store';

export const useCart = () => {
  const { token, userId,sessionId } = useSelector((state: RootState) => state.auth);
  
  const { data: cartData, isLoading: isFetchCartItemLoading, refetch } = useGetCartItemsQuery({userId:token ?? null, sessionId});
  const { data: itemCount } = useGetCartItemsCountQuery({ sessionId, userId:token ?? null });

  const [saveCart, {isLoading: isSaveCartLoading, isError: isSaveCartError, isSuccess: isSaveCartSuccess}] = useSaveCartMutation();
  const [deleteCartItem, {isLoading: isDeleteCartItemLoading, isError: isDeleteCartItemError, isSuccess: isDeleteCartItemSuccess}] = useDeleteCartMutation();

  const [updateQuantity, {isLoading: isUpdateQuantityLoading, isError: isUpdateQuantityError, isSuccess: isUpdateQuantitySuccess}] = useUpdateQuantityMutation()

  const addToCart = async (item: AddCartItemModel) => {
    await saveCart({ sessionId, userId:token?? null, cart: item });
  };

  const deleteCart = (itemId: string) => {
    deleteCartItem({ sessionId, userId:token ?? null, cartItemId: itemId });
  };

  const updateCartQuantity = async (quantity: number, itemId: string) => {
    updateQuantity({ sessionId, userId:token?? null, cartId: itemId, quantity: quantity })
  }

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
    updateCartQuantity,
    isUpdateQuantityLoading,
    isUpdateQuantitySuccess,
    isUpdateQuantityError,
    refetch,
  };
};

export default useCart;
