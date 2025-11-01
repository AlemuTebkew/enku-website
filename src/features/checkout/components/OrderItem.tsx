`use client`;
import React from "react";
import Image from "next/image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/store/app-store-hooks";
// import { clearCart, removeItem } from '../store/cart-slice';
import { CartItemModel } from "../../cart/api/CartApi";
import { buildFileUrl } from "@/utils/apiBase";
// import useCart from '../hooks/useCart';

// interface CartItemProps {
//     item: CartItemModel;
// }

interface CartItemProps {
  item: CartItemModel;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const OrderItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  // Safe access to variation data
  const variation = item?.variation;
  const imageUrl = variation?.images?.[0]?.url 
    ? buildFileUrl(variation.images[0].url)
    : '/placeholder-image.jpg'; // Fallback image
  
  if (!variation) {
    return (
      <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4">
        <p className="text-red-500">Item data is missing</p>
      </div>
    );
  }

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4">
      <img
        src={imageUrl}
        alt={variation.title || 'Product image'}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          {variation.title || 'Product'}
        </h2>
        {/* <p className="text-gray-600">{variation.sku}</p> */}
        {variation.color && (
          <p className="text-gray-600">Color: {variation.color}</p>
        )}
        {variation.optionValues && variation.optionValues.length > 0 && (
          <div className="mt-2">
            {variation.optionValues.map((optionValue) => (
              <p key={optionValue.id} className="text-sm text-gray-500">
                {optionValue.option?.name}: {optionValue.value}
              </p>
            ))}
          </div>
        )}
        <div className="flex items-center mt-2">
          <label htmlFor={`quantity-${item.id}`} className="text-gray-600 mr-2">
            Quantity:
          </label>
          <input
            id={`quantity-${item.id}`}
            type="number"
            value={item.quantity}
            min={1}
            max={variation.quantity || 999}
            onChange={handleQuantityChange}
            className="w-16 px-2 py-1 border rounded-md"
          />
        </div>
        <p className="text-gray-600">Price: ${variation.price || 0}</p>
      </div>
      {/* <div className="ml-auto">
        <button
          onClick={() => onRemoveItem(item.id)}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Remove
        </button>
      </div> */}
    </div>
  );
};

export default OrderItem;
