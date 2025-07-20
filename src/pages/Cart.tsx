import { useCart } from "../state/cart";

export default function CartScreen() {
  const { items, removeItem, clearCart, totalPrice } = useCart();

  return (
    <div className="p-4 text-gray-800">
      <h1 className="text-2xl font-bold text-primary mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={`/src/${item.image}`}
                    alt={item.name}
                    className="h-16 w-16 object-contain rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      Temp: {item.temperature}, Milk: {item.milk}
                    </p>
                    <p className="text-sm text-green-700">
                      ₱{item.price.toFixed(2)} × {item.quantity} ={" "}
                      <span className="font-semibold">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total:</h2>
            <span className="text-xl text-green-700 font-semibold">
              ₱{totalPrice().toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              alert("Order submitted!");
              clearCart();
            }}
            className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90"
          >
            Submit Order
          </button>
        </>
      )}
    </div>
  );
}
