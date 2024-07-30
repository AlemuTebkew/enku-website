// src/api/cartApi.ts

import { AddCartItemModel, CartItemModel } from "@/models/cart";
import { appApi } from "@/store/app-api";


interface GetCartParams {
  userId: string | null;
  sessionId?: string;
}

interface SaveCartParams {
  userId: string | null; // Optional
  sessionId: string; // Required
  cart: AddCartItemModel;
}

interface GetCartItemsCountParams {
  sessionId: string;
  userId: string | null;
}

const extendedCartApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    saveCart: builder.mutation<void, SaveCartParams>({
      query: ({ userId, sessionId, cart }) => ({
        url: '/cart',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(userId !== null && { Authorization: `Bearer ${userId}` }),
          'sessionId': sessionId, // Send sessionId or empty string if null
        },
        body: {
          cart, // Only include cart in the body
        },
      }),
    }),
    getCart: builder.query<CartItemModel[], GetCartItemsCountParams>({
      query: ({ sessionId, userId }) => ({
        url: '/cart',
        method: 'GET',
        headers: {
          'sessionId': sessionId, // Use sessionId in the headers
          ...(userId !== null && { Authorization: `Bearer ${userId}` }),
        },
      }),
    }),
    getCartItemsCount: builder.query<number, GetCartItemsCountParams>({
      query: ({ sessionId, userId }) => ({
        url: '/cart/count',
        method: 'GET',
        headers: {
          'sessionId': sessionId, // Use sessionId in the headers
          ...(userId !== null && { Authorization: `Bearer ${userId}` }), // Conditionally add Authorization header
        },
      }),
      transformResponse: (response: { status: boolean; message: string; data: { count: number }; meta: any }) => response.data.count, // Extract count from response
    }),
    deleteCart: builder.mutation<void, GetCartParams>({
      query: (params) => ({
        url: 'delete-cart',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Cart'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetCartQuery, useSaveCartMutation, useGetCartItemsCountQuery, useDeleteCartMutation } = extendedCartApi;
export default extendedCartApi;
