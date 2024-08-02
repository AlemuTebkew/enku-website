import { appApi } from "@/store/app-api";

export interface OrderShippingInfo {
    shippingPhoneNumber: string,
    shippingAddress: string,
    customerName: string,
    agreed: boolean
}
export interface OrderCheckoutParams {
  userId: string | null;
  sessionId?: string;
  shippingInfo: OrderShippingInfo
}


const extendedCartApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    orderCheckout: builder.mutation<void, OrderCheckoutParams>({
      query: ({ userId, sessionId, shippingInfo }) => ({
        url: '/orders',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(userId !== null && { 'Authorization': `Bearer ${userId}` }),
          'sessionId': sessionId, // Send sessionId or empty string if null
        },
        body: {
            ...shippingInfo, // Only include shipping info in the body
          },
      }),
      invalidatesTags: ['Order'],
    })
  }),

  overrideExisting: false,
});

export const { useOrderCheckoutMutation } = extendedCartApi;
export default extendedCartApi;
