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
  

//   const product = {
//     "id": "604aeab1-7457-411a-bf43-e368c31d03da",
//     "name": "Lakme Unreal Blur Perfect Face Primer",
//     "description": `
//       <style type=\"text/css\"> .aplus-container{max-width: 770px; margin: 0 auto; width: 100%;} .aplus-imgcontainers{ margin: -8px 0 0 0; } .aplus-img{ width:100%; max-width: 100%; }</style><div class=\"aplus-container\"> <table class=\"aplus-container\"> <tbody> <tr> <td> <div> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_1.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_2.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_3.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_4.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"> <img src=\"https://adn-static1.nykaa.com/media/wysiwyg/LAKABSMOUSE16_5.jpg\" class=\"aplus-img\" alt=\"aplus-img\"> </div> </td> </tr> <tr> <td> <div class=\"aplus-imgcontainers\"></div> </td> </tr> </tbody> </table></div>
//     `,
//     "ingredients":  `
//     <h3>Ingredients</h3>
//     <ul>
//       <li>Water</li>
//       <li>Glycerin</li>
//       <li>Shea Butter</li>
//       <li>Jojoba Oil</li>
//       <li>Aloe Vera Extract</li>
//       <li>Vitamin E</li>
//       <li>Green Tea Extract</li>
//     </ul>
//   `,
//     "how_to_use": `
//       <ul><li>Prepare skin with Undercover Gel Primer.<br></li><li>Take your index finger and dip it into the mousse foundation. </li><li>Dab the product lightly on your face. Blend in the product using your fingers or a foundation brush. </li><li>Apply concealer and compact to finish the look.</li></ul>
//     `,
//     "price": "438.00",
//     "imageUrl": "https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56KAYBE00000196_1.jpg?tr=w-344,h-344,cm-pad_resize",
//     "productionDate": "2024-01-01",
//     "expiryDate": "2025-01-01",
//     "origin": null,
//     "certified": null,
//     "metaTitle": null,
//     "metaDescription": null,
//     "metaKeywords": null,
//     "createdAt": "2024-07-30T08:45:37.810Z",
//     "updatedAt": "2024-07-30T08:45:37.810Z",
//     "variations": [
//         {
//             "id": "4f1c3526-5b88-4480-adb3-7e57bfd316a9",
//             "sku": "(30ml)",
//             "title": "Kay Beauty Illuminating Strobe Priming Drops - Rosey Twirl(30ml)",
//             "color": null,
//             "price": "222.00",
//             "quantity": 100,
//             "images": [
//                 {
//                     "id": "9d23936c-d27f-4d54-a4ab-290e2bc8a18b",
//                     "url": "https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56KAYBE00000196_2.jpg"
//                 },
//                 {
//                     "id": "a549585e-51b5-40f9-96fe-5e2eb2e0a146",
//                     "url": "https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56KAYBE00000196_3.jpg"
//                 },
//                 {
//                     "id": "c6071fc0-06ce-4573-b79a-f9c80b938a99",
//                     "url": "https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56KAYBE00000196_5.jpg"
//                 }
//             ],
//             "optionValues": [
//                 {
//                     "id": "6a58fff4-8edc-4227-b16c-c39f35ee6ac6",
//                     "value": "Small",
//                     "option": {
//                         "id": "c72738ce-cb0c-4008-82cf-deff086f6311",
//                         "name": "size"
//                     }
//                 },
//                 {
//                     "id": "81254522-aec3-444c-b608-f5d971cec228",
//                     "value": "Red",
//                     "option": {
//                         "id": "0571560a-c892-4a00-9be7-c3539fe7caa2",
//                         "name": "color"
//                     }
//                 }
//             ],
//             isDefault: true
//         },
//         {
//             "id": "a431ec2c-cbcd-44f3-8f25-a72247fc099c",
//             "sku": "(50ml)",
//             "title": "Kay Beauty Illuminating Strobe Priming Drops - Champagne Shimmy(50ml)",
//             "color": null,
//             "price": "122.00",
//             "quantity": 150,
//             "images": [
//                 {
//                     "id": "bc82c6bf-f2d3-4480-ac83-fd00ad4d5ee4",
//                     "url": "https://images-static.nykaa.com/media/catalog/product/3/0/3096990LAKME00000766_1.jpg"
//                 },
//                 {
//                     "id": "e90f3e58-03f8-4061-9a5c-1f3338670254",
//                     "url": "https://images-static.nykaa.com/media/catalog/product/3/0/3096990LAKME00000766_1.jpg"
//                 }
//             ],
//             "optionValues": [
//                 {
//                     "id": "0fd30963-6100-4bcb-9842-8f604ae868e3",
//                     "value": "Medium",
//                     "option": {
//                         "id": "c72738ce-cb0c-4008-82cf-deff086f6311",
//                         "name": "size"
//                     }
//                 },
//                 {
//                     "id": "16e64f30-449c-4938-a4a0-9759bdc7f6f2",
//                     "value": "White",
//                     "option": {
//                         "id": "0571560a-c892-4a00-9be7-c3539fe7caa2",
//                         "name": "color"
//                     }
//                 }
//             ]
//         }
//     ],
//     "images": [
//         {
//             "id": "424d655c-0c20-4faa-ad8c-961192a9f48b",
//             "url": "https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56KAYBE00000196_2.jpg"
//         },
//         {
//             "id": "b60a45ea-5b7c-47d1-8734-39f047175215",
//             "url": "https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56KAYBE00000196_3.jpg"
//         },
//         {
//             "id": "df79c5c1-662d-4053-84b4-07f41ebcf846",
//             "url": "https://images-static.nykaa.com/media/catalog/product/a/4/a4bed56KAYBE00000196_5.jpg"
//         }
//     ]
// }
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