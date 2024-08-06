import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityAdjusterProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

const QuantityAdjuster: React.FC<QuantityAdjusterProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity,
}) => {
  return (
    <div className="flex items-center">
      <button
        onClick={onDecrease}
        disabled={quantity <= minQuantity}
        className="p-2 text-primary hover:text-secondary disabled:text-gray-400"
      >
        <Minus className="h-5 w-5" />
      </button>
      <span className="mx-3 w-8 text-center text-lg font-medium">{quantity}</span>
      <button
        onClick={onIncrease}
        disabled={maxQuantity !== undefined && quantity >= maxQuantity}
        className="p-2 text-primary hover:text-secondary disabled:text-gray-400"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
};

export default QuantityAdjuster;
