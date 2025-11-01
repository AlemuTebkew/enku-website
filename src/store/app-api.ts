import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { RootState } from './app-store';
import { buildApiUrl } from '@/utils/apiBase';

// Define a base query function
const baseQuery: BaseQueryFn = fetchBaseQuery({ baseUrl: buildApiUrl('/user') });

// Define a function to create an API with dynamic endpoints
const createAppApi = () => {
  return createApi({
    reducerPath: 'appApi',
    baseQuery,
    endpoints: (builder) => ({}), // Start with an empty object for endpoints
    tagTypes: [
        "Cart",
        "Auth",
        "Order"
    ]
  });
};

// Export the app API and a function to dynamically inject endpoints
export const appApi = createAppApi();
