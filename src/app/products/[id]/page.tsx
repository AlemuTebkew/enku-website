import axios from 'axios'
import { Metadata } from 'next';
import ProductDetail from '@/features/products/pages/ProductDetail';
import { fetchProductDetail } from '@/utils/fetchData';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   const product: Product = await axios.get(`/products/${params.id}`);

  return {
    title: 'product.title',
    description: 'product.description',
  };
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  const { id } = params;
  const product = await fetchProductDetail(id);
  try {
    return (
      <>
          <ProductDetail product={product}/>
      </>
    );

  }catch (error) {
    return <div>Error loading product details</div>;
  }
};

export default ProductDetailPage;