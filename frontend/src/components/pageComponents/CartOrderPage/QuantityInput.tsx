import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface QuantityInputProps {
  qunatityValue: number;
  maxQuantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPurchasePage?: boolean;
}

const QuantityInput = ({
  qunatityValue,
  maxQuantity,
  onDecrement,
  onIncrement,
  onChange,
  isPurchasePage,
}: QuantityInputProps) => {
  return (
    <div className="relative flex items-center min-w-[80%]">
      <button
        type="button"
        id="decrement-button"
        data-input-counter-decrement="quantity-input"
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        onClick={onDecrement}
        disabled={isPurchasePage}
      >
        <MinusIcon width={20} height={20} />
      </button>
      <input
        type="number"
        id="quantity-input"
        data-input-counter
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 "
        placeholder="1"
        value={qunatityValue}
        min="1"
        max={maxQuantity}
        onChange={onChange}
        required
        disabled={isPurchasePage}
      />
      <button
        type="button"
        id="increment-button"
        data-input-counter-increment="quantity-input"
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        onClick={onIncrement}
        disabled={isPurchasePage}
      >
        <PlusIcon width={20} height={20} />
      </button>
    </div>
  );
};

export default QuantityInput;
