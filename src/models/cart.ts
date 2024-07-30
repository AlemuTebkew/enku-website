import { Product } from "./product";

export interface CartItemModel {
    id: string;
    name: string;
    quantity: number;
    price: number,
    image: string
}

export interface AddCartItemModel {
    productId: string,
    variationId: string,
    quantity: number
}