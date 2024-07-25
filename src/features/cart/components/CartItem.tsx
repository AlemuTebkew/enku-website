`use client`
import React from 'react';
import Image from 'next/image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CartItemModel } from '@/models/cart';
import { Separator } from '@/components/ui/separator';
import { useAppDispatch } from '@/store/app-store-hooks';
import { clearCart, removeItem } from '../store/cart-slice';

interface CartItemProps {
    item: CartItemModel;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col gap-2 border-2 p-4 rounded-md">
            <div className="flex justify-between gap-2 items-start">
                <div className="relative w-20 h-20">
                    <Image 
                        src={item.image} 
                        layout="fill" 
                        objectFit="cover" 
                        alt={item.name} 
                        priority={true} 
                    />
                </div>
                <div className="flex flex-col justify-between flex-1">
                    <p className="text-lg font-medium">{item.name}</p>
                </div>
                <div className="flex items-center" onClick={() => dispatch(removeItem(item.id))}>
                    <DeleteForeverIcon className="text-red-500 cursor-pointer" />
                </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
                <div>
                    <p>{`Quantity: ${item.quantity}`}</p>
                </div>
                <div>
                    <p>{`ETB ${item.price * item.quantity}`}</p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
