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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  return (
    <Card className='bg-background border-0 rounded-md h-min'>
      <CardHeader>
        <CardTitle className='text-sm text-primaryT font-normal'>FEATURED</CardTitle>
      </CardHeader>
      <CardContent>
        <Link target='_blank' href={`/products/${product.id}`}>
          <div className='relative flex flex-col items-center w-full gap-8'>
          <Image 
            src={`http://ec2-3-91-23-59.compute-1.amazonaws.com:5000/uploads/${product.imageUrl}`} 
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
            <span className='text-md mr-2 line-through'>ETB 4000</span>
            {product.price}
            <span className='text-primaryT ml-2'>25% Off</span>
          </p>
          </div>
        </Link>
      </CardContent>
      <CardFooter className='w-full flex gap-2'>
        <Button variant={'outline'} className=''>Buy Now</Button>
        <Button 
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
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
