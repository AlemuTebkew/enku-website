import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Image from 'next/image';

const ProductCard = () => {
  return (
    <Card className='bg-background border-0 rounded-md h-min'>
      <CardHeader>
        <CardTitle className='text-sm text-primaryT font-normal'>FEATURED</CardTitle>
      </CardHeader>
      <CardContent className='relative flex flex-col items-center w-full gap-8'>
        <Image src="/images/Love.avif" width={200} height={40} alt='' />
        <p className='text-md text-center font-medium leading-relaxed px-4'>
          Love Beauty & Planet Bond Repair Shampoo With Olive Oil
        </p>
        <p>
          <span className='text-md mr-2 line-through'>ETB 4000</span>
          ETB 3000
          <span className='text-primaryT ml-2'>25% Off</span>
        </p>
      </CardContent>
      <CardFooter className='w-full flex gap-2'>
        <Button variant={'ghost'} className='w-1/4'><FavoriteBorderOutlinedIcon className='text-primaryT'/></Button>
        <Button variant={'default'} className='w-full'>Add to Bag</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
