import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { format } from "date-fns";
import type { CartItem } from "../models/CartItem";

type Transaction = {
  id: string;
  customer_name: string;
  total_price: number;
  created_at: Date;
  items: CartItem[];
};

export default function ReportScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [milkFilter, setMilkFilter] = useState("");
  const [tempFilter, setTempFilter] = useState("");
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalItems: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    if (!startDate || !endDate) {
      setTransactions([]);
      setSummary({ totalSales: 0, totalItems: 0, totalTransactions: 0 });
      return;
    }
    fetchTransactions();
  }, [startDate, endDate, sizeFilter, milkFilter, tempFilter]);

  const fetchTransactions = async () => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // beginning of the day

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // end of the day

    console.log(start, end)

    const q = query(
      collection(db, "transactions"),
      where("created_at", ">=", start),
      where("created_at", "<=", end)
    );

    const snapshot = await getDocs(q);
    const data: Transaction[] = [];

    let totalSales = 0;
    let totalItems = 0;

    snapshot.forEach((doc) => {
      const tx = doc.data();

      const created_at =
        tx.created_at && typeof tx.created_at.toDate === "function"
          ? tx.created_at.toDate()
          : new Date(tx.created_at);

      const items = tx.items.filter((item: any) => {
        const matchSize = !sizeFilter || item.size === sizeFilter;
        const matchMilk = !milkFilter || item.milk === milkFilter;
        const matchTemp = !tempFilter || item.temperature === tempFilter;
        return matchSize && matchMilk && matchTemp;
      });

      if (items.length > 0) {
        totalSales += tx.total_price;
        totalItems += items.reduce((sum: number, i: any) => sum + i.quantity, 0);

        data.push({
          id: doc.id,
          customer_name: tx.customer_name || "N/A",
          total_price: tx.total_price || 0,
          created_at,
          items,
        });
      }
    });

    setTransactions(data);
    setSummary({ totalSales, totalItems, totalTransactions: data.length });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction Report</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-3 py-1"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-3 py-1"
        />
        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">All Sizes</option>
          <option value="regular">Regular</option>
          <option value="upsize">Upsize</option>
        </select>
        <select
          value={milkFilter}
          onChange={(e) => setMilkFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">All Milks</option>
          <option value="regular">Regular</option>
          <option value="oat">Oat</option>
        </select>
        <select
          value={tempFilter}
          onChange={(e) => setTempFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">All Temperatures</option>
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
        </select>
      </div>

      {!startDate || !endDate ? (
        <p className="text-gray-500 mt-4">Please select a start and end date to view reports.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded shadow text-center">
              <div className="text-sm text-gray-500">Total Sales</div>
              <div className="text-xl font-bold">Php {summary.totalSales.toFixed(2)}</div>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <div className="text-sm text-gray-500">Total Items</div>
              <div className="text-xl font-bold">{summary.totalItems}</div>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <div className="text-sm text-gray-500">Total Transactions</div>
              <div className="text-xl font-bold">{summary.totalTransactions}</div>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr className="bg-gray-200 text-sm">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Customer</th>
                  <th className="p-2 text-left">Total</th>
                  <th className="p-2 text-left">Items</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t">
                    <td className="p-2 text-sm">
                      {format(tx.created_at, "yyyy-MM-dd HH:mm")}
                    </td>
                    <td className="p-2 text-sm">{tx.customer_name}</td>
                    <td className="p-2 text-sm">Php {tx.total_price.toFixed(2)}</td>
                    <td className="p-2 text-sm">
                      {tx.items.map((item, idx) => (
                        <div key={idx}>
                          {item.name} x{item.quantity} ({item.temperature}, {item.milk}, {item.size})
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
