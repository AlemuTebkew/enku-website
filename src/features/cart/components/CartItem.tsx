`use client`
import React, { useEffect } from 'react';
import Image from 'next/image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Separator } from '@/components/ui/separator';
import { CartItemModel } from '../api/CartApi';
import useCart from '../hooks/useCart';
import QuantityAdjuster from './QuantityAdjuster';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Notify } from '@/lib/Notification/notify';

interface CartItemProps {
    item: CartItemModel;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const {
        deleteCart,
        updateCartQuantity,
        isDeleteCartItemError, 
        isDeleteCartItemLoading, 
        isDeleteCartItemSuccess,
        isUpdateQuantityLoading,
        isUpdateQuantitySuccess,
        isUpdateQuantityError
    } = useCart()

    const { setCartLoading } = useAuth()

    useEffect(() => {
        if(isDeleteCartItemLoading || isUpdateQuantityLoading) {
            setCartLoading(true)
        }
    }, [isDeleteCartItemLoading, isUpdateQuantityLoading])

    useEffect(() => {
        if(isUpdateQuantitySuccess) {
            setCartLoading(false)
            Notify("success", "Cart item quantity updated")
        }
    }, [isUpdateQuantitySuccess])

    useEffect(() => {
        if(isDeleteCartItemSuccess) {
            setCartLoading(false)
            Notify("success", "Cart item removed")
        }
    }, [isDeleteCartItemSuccess])

    return (
        <div className="flex flex-col gap-2 border-[0.1px] p-4 rounded-md">
            <div className="flex justify-between gap-2 items-start">
                <div className="relative w-20 h-20">
                    <img
                        src={`https://api.enkubeauty.com/files/${item.variation.images[0].url}`}
                        // layout="fill"
                        // objectFit="cover"
                        alt={item.variation.title}
                        // priority={true}
                    />
                </div>
                <div className="flex flex-col justify-between flex-1">
                    <p className="text-lg font-medium">{item.variation.title}</p>
                    <div className="mt-2 flex gap-4">
                    {item.variation.optionValues.map((optionValue) => (
                        <p key={optionValue.id} className="text-sm text-gray-500 capitalize">
                        {optionValue.option.name}: {optionValue.value}
                        </p>
                    ))}
                    </div>
                </div>
                <div className="flex items-center" onClick={() => deleteCart(item.id)}>
                    <DeleteForeverIcon className="text-black-100 cursor-pointer hover:text-primary" />
                </div>
            </div>
            <Separator className='h-[0.1px]'/>
           
            <div className="flex justify-between items-center">
                <QuantityAdjuster
                quantity={item.quantity}
                minQuantity={1}
                maxQuantity={item.variation.quantity}
                onDecrease={() => {updateCartQuantity(item.quantity - 1, item.id)}}
                onIncrease={() => {updateCartQuantity(item.quantity + 1, item.id)}}
                />
                {/* <div>
                    <p>{`Quantity: ${item.quantity}`}</p>
                </div> */}
                <div>
                    <p>{`ETB ${+item.variation.price * item.quantity}`}</p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
