import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { drinks } from "../data/drinks";
import type { Drink } from "../data/drinks";
import CoffeeDetail from "./CoffeeDetail";

type Tab = "coffee" | "non-coffee" | "fruit" | "milkshake";

export default function Menu() {
  const [tab, setTab] = useState<Tab>("coffee");
  const [selected, setSelected] = useState<Drink | null>(null);
  const navigate = useNavigate();

  const categories: Tab[] = ["coffee", "non-coffee", "fruit", "milkshake"];
  const filtered = drinks.filter((d) => d.base === tab);

  return (
    <div className="p-4 text-gray-800">

      {/* Header */}
      <div className="mb-5">
        {/* Top Row with Buttons and Logo */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/orders")}
              className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary/90"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary/90"
            >
              View Cart
            </button>
          </div>
        </div>

        {/* Centered Logo (Full Width) */}
        <div className="bg-primary w-full flex justify-center items-center py-2 rounded">
          <img
            src="/src/assets/icon/app_icon.png"
            alt="Cup of Zion Logo"
            className="h-16 w-auto"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-4 gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${
              tab === c
                ? "bg-primary text-white shadow-md border border-primary"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Drink Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {filtered.map((drink, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-2 cursor-pointer hover:shadow-md transition"
            onClick={() => setSelected(drink)}
          >
            <img
              src={`/src/${drink.image}`}
              alt={drink.name}
              className="w-full h-40 object-contain rounded-md"
            />
            <h2 className="mt-2 font-bold">{drink.name}</h2>
            <p className="text-sm text-gray-600">{drink.description}</p>
            <p className="text-sm font-semibold text-green-700">₱{drink.price}</p>
          </div>
        ))}
      </div>

      {/* Coffee Detail Modal */}
      {selected && (
        <CoffeeDetail drink={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
