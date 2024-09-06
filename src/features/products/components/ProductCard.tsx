import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Image from 'next/image';
import { Product } from '@/models/product';
import { useAppDispatch } from '@/store/app-store-hooks';
import { addItem } from '../../cart/store/cart-slice';
import Link from 'next/link';
import useCart from '@/features/cart/hooks/useCart';
import CustomButton from '@/components/Button';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { addToCart, isSaveCartLoading, isSaveCartSuccess, isSaveCartError } = useCart()
  return (
    <Card className='bg-background border-0 rounded-md h-min'>
      <CardHeader>
        <CardTitle className='text-sm text-primaryT font-normal'>FEATURED</CardTitle>
      </CardHeader>
      <CardContent>
        <Link target='_blank' href={`/products/${product.id}`}>
          <div className='relative flex flex-col items-center w-full gap-8'>
          <Image 
            src={`https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/e/2/e2f1392DOTKE00000054_1090624.jpg`} 
            width={200} 
            height={200} // Adjusted height for better display
            alt={product.name} // Added alt text for better accessibility
            quality={75} // Added quality for better image quality control
            className='object-contain' // Added class for better image fit
          />
          <p className='text-md text-center font-medium leading-relaxed px-4'>
            {product.name}
          </p>
          <p>
            {/* <span className='text-md mr-2 line-through'>ETB 4000</span> */}
            {`ETB ${product.price}`}
            {/* <span className='text-primaryT ml-2'>25% Off</span> */}
          </p>
          </div>
        </Link>
      </CardContent>
      <CardFooter className='w-full flex gap-2'>
      <CustomButton 
      variant="outline"
      onClick={() => {}} 
      className='w-full flex items-center h-auto'
      >
          <div className='flex gap-2 items-center py-1'>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 20"><g fill="none" fill-rule="evenodd"><path d="M21 23H-3V-1h24z"></path><path fill="#fff" fill-rule="nonzero" d="M9.348 0A4.355 4.355 0 0 0 5 4.348v.87a.435.435 0 1 0 .87 0v-.87A3.472 3.472 0 0 1 9.348.87a3.472 3.472 0 0 1 3.478 3.478v.87a.435.435 0 1 0 .87 0v-.87A4.355 4.355 0 0 0 9.348 0zM5.22 6a.87.87 0 0 0-.87.87H2.179a.435.435 0 0 0-.435.367L.004 18.976a.454.454 0 0 0 .109.353c.082.095.2.15.326.15h1.304v.434h1.305v-.435H15.22v.435h1.305v-.435h1.304a.428.428 0 0 0 .326-.15.453.453 0 0 0 .109-.352l-1.74-11.74a.436.436 0 0 0-.434-.366h-2.174a.87.87 0 1 0-1.739 0H6.091a.87.87 0 0 0-.87-.87z"></path></g></svg> */}
              <p className='text-lg font-bold'>Buy Now</p>
          </div>
      </CustomButton>
        {/* <CustomButton 
        onClick={() => addToCart({productId: product.id, variationId: product.variations[0].id, quantity: 1})} 
        isLoading={isSaveCartLoading} className='w-full flex my-4 items-center'
        >
            <div className='flex gap-2 items-center py-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 20"><g fill="none" fill-rule="evenodd"><path d="M21 23H-3V-1h24z"></path><path fill="#fff" fill-rule="nonzero" d="M9.348 0A4.355 4.355 0 0 0 5 4.348v.87a.435.435 0 1 0 .87 0v-.87A3.472 3.472 0 0 1 9.348.87a3.472 3.472 0 0 1 3.478 3.478v.87a.435.435 0 1 0 .87 0v-.87A4.355 4.355 0 0 0 9.348 0zM5.22 6a.87.87 0 0 0-.87.87H2.179a.435.435 0 0 0-.435.367L.004 18.976a.454.454 0 0 0 .109.353c.082.095.2.15.326.15h1.304v.434h1.305v-.435H15.22v.435h1.305v-.435h1.304a.428.428 0 0 0 .326-.15.453.453 0 0 0 .109-.352l-1.74-11.74a.436.436 0 0 0-.434-.366h-2.174a.87.87 0 1 0-1.739 0H6.091a.87.87 0 0 0-.87-.87z"></path></g></svg>
                Add to Bag
            </div>
        </CustomButton> */}
        <CustomButton 
        onClick={() => addToCart({productId: product.id, variationId: product.variations[0].id, quantity: 1})} 
        isLoading={isSaveCartLoading} className='w-full flex items-center h-auto'
        >
            <div className='flex gap-2 items-center py-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 20"><g fill="none" fill-rule="evenodd"><path d="M21 23H-3V-1h24z"></path><path fill="#fff" fill-rule="nonzero" d="M9.348 0A4.355 4.355 0 0 0 5 4.348v.87a.435.435 0 1 0 .87 0v-.87A3.472 3.472 0 0 1 9.348.87a3.472 3.472 0 0 1 3.478 3.478v.87a.435.435 0 1 0 .87 0v-.87A4.355 4.355 0 0 0 9.348 0zM5.22 6a.87.87 0 0 0-.87.87H2.179a.435.435 0 0 0-.435.367L.004 18.976a.454.454 0 0 0 .109.353c.082.095.2.15.326.15h1.304v.434h1.305v-.435H15.22v.435h1.305v-.435h1.304a.428.428 0 0 0 .326-.15.453.453 0 0 0 .109-.352l-1.74-11.74a.436.436 0 0 0-.434-.366h-2.174a.87.87 0 1 0-1.739 0H6.091a.87.87 0 0 0-.87-.87z"></path></g></svg>
                <p className='text-lg font-bold'>Add to Bag</p>
            </div>
        </CustomButton>
        {/* <Button 
          variant={'default'} 
          className='w-full'
          onClick={() => {
            dispatch(addItem({
              id: product.id,
              name: product.name,
              quantity: 1,
              price: +product.price,
              image: product.imageUrl
            }));
          }}
        >
          Add to Bag
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
