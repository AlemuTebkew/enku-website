import { Product } from "@/models/product";
import { appApi } from "@/store/app-api";

interface FilterValueModel {
    id: number,
    value: string
}

export interface FilterModel {
    id: string,
    name: string,
    values: FilterValueModel[]
}

interface FetchFilterResponse {
    status: boolean;
    message: string;
    data: FilterModel[];
    meta: Record<string, any>;
  }

  interface FetchProductResponse {
    status: boolean;
    message: string;
    data: Product[];
    meta: Record<string, any>;
  }

export const productApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getFilterByCategoryId: builder.query<FilterModel[], string>({
            query: (params) => ({
                url: params,
                method: 'GET',
            }),
            transformResponse: (response: FetchFilterResponse) => response.data,
        }),
        filterProducts: builder.query<Product[], number[]>({
            query: (filters) => {
                const filterParams = `filters=${filters.join(',')}`; // Join filters with commas
                return {
                    url: `/products?${filterParams}`, // Append the single filters parameter
                    method: 'GET',
                };
            },
            transformResponse: (response: FetchProductResponse) => {
                console.log(response.data)
                return response.data
            },
        }),
    })
})


export const { useLazyGetFilterByCategoryIdQuery, useLazyFilterProductsQuery } = productApi