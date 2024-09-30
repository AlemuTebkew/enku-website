import { Metadata } from 'next';
import ProductDetail from '@/features/products/pages/ProductDetail';
import { fetchProductDetail } from '@/utils/fetchData';
import NoProductsFound from '@/features/products/components/NoProductFound';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
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
      // {
      //   product?  <ProductDetail product={product}/> : <NoProductsFound title='' message=''/>
      // }
      // {
      //   product ? 
      // }
      <ProductDetail product={product}/>
       
    );

  } catch (error) {
    return <div>Error loading product details</div>;
  }
};

export default ProductDetailPage;