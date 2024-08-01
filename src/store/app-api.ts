import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { RootState } from './app-store';

// Define a base query function
const baseQuery: BaseQueryFn = fetchBaseQuery(
  { 
    baseUrl: 'http://192.168.1.9:5000/user',
    prepareHeaders: (headers, { getState }) => {
      // Get the auth token from the state
      const token = (getState() as RootState).auth.token;
      
      // If we have a token, include it in the headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      return headers;
    }, 
  }
);

// Define a function to create an API with dynamic endpoints
const createAppApi = () => {
  return createApi({
    reducerPath: 'appApi',
    baseQuery,
    endpoints: (builder) => ({}), // Start with an empty object for endpoints
    tagTypes: [
        "Cart",
        "Auth"
    ]
  });
};

// Export the app API and a function to dynamically inject endpoints
export const appApi = createAppApi();