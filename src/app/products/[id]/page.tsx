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
  // const product = await fetchProductDetail(id);
  const product = {
    id: '1',
    name: 'Lakme Xtraordin-Airy Mattereal Mousse Foundation, Matte Finish, With SPF8, 01 Classic Ivory',
    price: 299.99,
    description: `
      <style type=\"text/css\"> .aplus-container{max-width: 770px; margin: 0 auto; width: 100%;} .aplus-imgcontainers{ margin: -8px 0 0 0; } .aplus-img{ width:100%; max-width: 100%; }</style><div class=\"aplus-container\"> <table class=\"aplus-container\"> <tbody> <tr> <td> <div> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_1.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_2.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_3.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_4.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_5.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"></div> </td> </tr> </tbody> </table></div>
    `,
    ingredients: `
      <h3>Ingredients</h3>
      <ul>
        <li>Water</li>
        <li>Glycerin</li>
        <li>Shea Butter</li>
        <li>Jojoba Oil</li>
        <li>Aloe Vera Extract</li>
        <li>Vitamin E</li>
        <li>Green Tea Extract</li>
      </ul>
    `,
    howToUse: `
      <ul><li>Prepare skin with Undercover Gel Primer.<br></li><li>Take your index finger and dip it into the mousse foundation. </li><li>Dab the product lightly on your face. Blend in the product using your fingers or a foundation brush. </li><li>Apply concealer and compact to finish the look.</li></ul>
    `,
    imageUrl: 'https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56LAK_8901030366086_1.jpg',
    images: [
      'https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56LAK_8901030366086_1.jpg',
      'https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56LAK_8901030366086_2.jpg',
      'https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56LAK_8901030366086_3.jpg',
      'https://images-static.nykaa.com/media/consc/cruelty.jpg',
      'https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56LAK_8901030366086_4.jpg'
    ],
    category: {name:"Makeup"},
    subCategory: {name:"Face"},
    subSubCategory: {name:"Foundation"},
  };
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