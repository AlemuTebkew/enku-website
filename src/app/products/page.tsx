import React from 'react'
import ProductList from '@/features/products/pages/ProductList'
import { Metadata } from 'next';
import { fetchProducts } from '@/utils/fetchData';

interface ProductsPageProps {
searchParams: {
    [key: string]: string | string[];
};
}

// Optionally, you can use generateMetadata to create SEO-friendly metadata
export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {

return {
    title: `Products - ${searchParams.category || 'All Categories'}`,
    description: `Browse our selection of products in ${searchParams.category || 'all categories'}.`,
    // You can further customize metadata here
};
}

const page = async ({ searchParams }: ProductsPageProps) => {
    const products = await fetchProducts(searchParams);
    return (
        <div>
            <ProductList products={products}/>
        </div>
    )
}

export default page