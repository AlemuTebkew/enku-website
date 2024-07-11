import { Product } from "./product";

export interface CartItem {
    productId: string;
    quantity: number;
    product: Product; // Reference to the product details
}