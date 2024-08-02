// src/api/cartApi.ts

import { AddCartItemModel } from "@/models/cart";
import { appApi } from "@/store/app-api";

interface CartItemVariation {
  id: string;
  sku: string;
  title: string;
  color: string | null;
  isFeatured: boolean | null;
  price: string;
  quantity: number;
  images: { id: string; url: string }[];
  optionValues: {
    id: string;
    value: string;
    option: {
      id: string;
      name: string;
    };
  }[];
}

export interface CartItemModel {
  id: string;
  quantity: number;
  variation: CartItemVariation;
}

interface CartData {
  cartId: string;
  items: CartItemModel[];
}

interface FetchCartResponse {
  status: boolean;
  message: string;
  data: CartData;
  meta: Record<string, any>;
}


interface GetCartParams {
  userId: string | null;
  sessionId?: string;
}

interface SaveCartParams {
  userId: string | null; // Optional
  sessionId: string; // Required
  cart: AddCartItemModel;
}

interface DeleteCartItemParams {
  userId: string | null; // Optional
  sessionId: string; // Required
  cartItemId: string;
}

interface GetCartItemsCountParams {
  sessionId: string;
  userId: string | null;
}

const extendedCartApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    saveCart: builder.mutation<void, SaveCartParams>({
      query: ({ userId, sessionId, cart }) => ({
        url: '/carts',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(userId !== null && { 'Authorization': `Bearer ${userId}` }),
          'sessionId': sessionId, // Send sessionId or empty string if null
        },
        body: {
          ...cart, // Only include cart in the body
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    getCartItems: builder.query<CartData, GetCartParams>({
      query: ({ sessionId, userId }) => ({
        url: '/carts',
        method: 'GET',
        headers: {
          'sessionId': sessionId, // Use sessionId in the headers
          ...(userId !== null && { 'Authorization': `Bearer ${userId}` }), // Conditionally add Authorization header
        },
      }),
      transformResponse: (response: FetchCartResponse) => response.data,
      providesTags: ['Cart'],
    }),
    getCartItemsCount: builder.query<number, GetCartItemsCountParams>({
      query: ({ sessionId, userId }) => ({
        url: '/carts/item-count',
        method: 'GET',
        headers: {
          'sessionId': sessionId, // Use sessionId in the headers
          ...(userId !== null && { 'Authorization': `Bearer ${userId}` }), // Conditionally add Authorization header
        },
      }),
      transformResponse: (response: { status: boolean; message: string; data: { count: number }; meta: any }) => response.data.count, // Extract count from response
      providesTags: ['Cart'],
    }),
    deleteCart: builder.mutation<void, DeleteCartItemParams>({
      query: ({userId, sessionId, cartItemId}) => ({
        url: `/carts/${cartItemId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(userId !== null && { 'Authorization': `Bearer ${userId}` }),
          'sessionId': sessionId, // Send sessionId or empty string if null
        },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetCartItemsQuery, useSaveCartMutation, useGetCartItemsCountQuery, useDeleteCartMutation } = extendedCartApi;
export default extendedCartApi;
