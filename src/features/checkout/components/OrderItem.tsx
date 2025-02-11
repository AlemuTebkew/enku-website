`use client`;
import React from "react";
import Image from "next/image";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/store/app-store-hooks";
// import { clearCart, removeItem } from '../store/cart-slice';
import { CartItemModel } from "../../cart/api/CartApi";
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

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-4">
      <img
        src={`https://api.enkubeauty.com/files/${item.variation.images[0].url}`}
        alt={item.variation.title}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          {item.variation.title}
        </h2>
        {/* <p className="text-gray-600">{item.variation.sku}</p> */}
        {item.variation.color && (
          <p className="text-gray-600">Color: {item.variation.color}</p>
        )}
        <div className="mt-2">
          {item.variation.optionValues.map((optionValue) => (
            <p key={optionValue.id} className="text-sm text-gray-500">
              {optionValue.option.name}: {optionValue.value}
            </p>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <label htmlFor={`quantity-${item.id}`} className="text-gray-600 mr-2">
            Quantity:
          </label>
          <input
            id={`quantity-${item.id}`}
            type="number"
            value={item.quantity}
            min={1}
            max={item.variation.quantity}
            onChange={handleQuantityChange}
            className="w-16 px-2 py-1 border rounded-md"
          />
        </div>
        <p className="text-gray-600">Price: ${item.variation?.price}</p>
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
