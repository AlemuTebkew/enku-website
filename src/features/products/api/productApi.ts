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

export const productApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getFilterByCategoryId: builder.query<FilterModel[], string>({
            query: (params) => ({
                url: params,
                method: 'GET',
            }),
            transformResponse: (response: FetchFilterResponse) => response.data,
        }),
        filterProducts: builder.query<string, Product[]>({
            query: (params) => ({
                url: `/products?` 
            })
        })
    })
})


export const { useLazyGetFilterByCategoryIdQuery } = productApi