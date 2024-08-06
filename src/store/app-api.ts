import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { RootState } from './app-store';

// Define a base query function
const baseQuery: BaseQueryFn = fetchBaseQuery({ baseUrl: 'http://ec2-3-91-23-59.compute-1.amazonaws.com:5000/user'});

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