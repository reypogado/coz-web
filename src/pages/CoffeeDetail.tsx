import type { Drink } from "../data/drinks";
import { useState } from "react";
import { useCart, type CartItem } from "../state/cart";

interface Props {
  drink: Drink;
  onClose: () => void;
}

export default function CoffeeDetail({ drink, onClose }: Props) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState(
    drink.options.length > 0 ? drink.options[0] : "none"
  );
  const [milk, setMilk] = useState(
    drink.base === "coffee" || drink.base === "non-coffee" ? "regular" : "none"
  );

  const basePrice = parseFloat(drink.price);
  const adjustedPrice = milk === "oat" ? basePrice + 20 : basePrice;
  const totalPrice = quantity * adjustedPrice;

  function handleAddToCart() {
    const item: CartItem = {
      name: drink.name,
      image: drink.image,
      price: adjustedPrice,
      temperature,
      milk,
      quantity,
    };
    addToCart(item);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{drink.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">&times;</button>
        </div>

        {/* Image */}
        <div className="flex justify-center mb-4">
          <img
            src={`/src/${drink.image}`}
            alt={drink.name}
            className="h-40 object-contain" />
        </div>

        {/* Ingredients */}
        <p className="text-sm text-gray-600 mb-2">{drink.ingredients}</p>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4">{drink.description}</p>

        {/* Temperature */}
        {drink.options.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold text-sm mb-1">Temperature:</p>
            <div className="flex gap-2 flex-wrap">
              {drink.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setTemperature(opt)}
                  className={`px-3 py-1 text-sm rounded border ${temperature === opt ? "bg-primary text-white" : "bg-gray-100"
                    }`}
                >
                  {opt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Milk Option */}
        {(drink.base === "coffee" || drink.base === "non-coffee") && (
          <div className="mb-4">
            <p className="font-semibold text-sm mb-1">Milk Option:</p>
            <div className="flex gap-2">
              {["regular", "oat"].map((type) => (
                <button
                  key={type}
                  onClick={() => setMilk(type)}
                  className={`px-3 py-1 text-sm rounded border ${milk === type ? "bg-primary text-white" : "bg-gray-100"
                    }`}
                >
                  {type[0].toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-6 flex items-center gap-4">
          <span className="font-semibold text-sm">Quantity:</span>
          <div className="flex items-center border rounded">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="px-2 text-xl font-bold"
            >
              −
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-lg text-gray-800">Php {totalPrice.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
