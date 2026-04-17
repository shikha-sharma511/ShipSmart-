import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Orders</h1>

      <div className="bg-white shadow rounded p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Product</th>
              <th className="text-left p-2">Buyer</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-2">
                  {order.product?.name || "N/A"}
                </td>
                <td className="p-2">
                  {order.buyer?.name || "N/A"}
                </td>
                <td className="p-2">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-gray-500 mt-4">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;