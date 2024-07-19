import axios from 'axios'
import { Metadata } from 'next';
import ProductDetail from '@/features/products/pages/ProductDetail';

interface Product {
  images: string[];
  title: string;
  variant: string[];
  description: string;
  ingredient: string;
  howToUse: string;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   const product: Product = await axios.get(`/products/${params.id}`);

  return {
    title: 'product.title',
    description: 'product.description',
  };
}

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {

  return (
    <>
        <ProductDetail/>
    </>
  );
};

export default ProductDetailPage;