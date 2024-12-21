"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Interface for an order item
interface OrderItem {
  id: number; // Assuming each item has a unique id
  product: {
    name: string;
  };
  variation: {
    title: string;
    sku: string;
  };
  quantity: number;
  price: number;
}

// Interface for an order
interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string; // Assuming the correct casing is used here
  shippingPhoneNumber?: string; // New field for phone number
  shippingAddress?: string; // New field for shipping address
  items: OrderItem[];
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      // User is not logged in, redirect to login page
      router.push(`/login?redirect=${encodeURIComponent("/order")}`);
    }
  }, [token]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          "https://api.enkubeauty.com/user/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the Bearer token to the headers
            },
          }
        );

        console.log("Response from API:", response);

        const data = response.data; // Directly access data from response
        setOrders(data.data || []);
      } catch (error: any) {
        console.log("Failed to fetch orders", error);
        setError(error?.message || "An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md"
          >
            <p>
              <strong>Total:</strong> ${Number(order.total).toFixed(2)}{" "}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Shipping Phone Number:</strong>{" "}
              {order.shippingPhoneNumber || "N/A"}
            </p>
            <p>
              <strong>Shipping Address:</strong>{" "}
              {order.shippingAddress || "N/A"}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <h3 className="font-medium mt-2">Order Items:</h3>
            <ul className="list-inside container border border-2 border-radius-3">
              {order.items.map((item) => (
                <li key={item.id} className="mt-1">
                  <p>
                    <strong>Product Name:</strong> {item.product.name}
                  </p>
                  <p>
                    <strong>Product Variation:</strong> {item.variation.title}
                  </p>
                  <p>
                    <strong>Product SKU:</strong> {item.variation.sku}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> {Number(item.price).toFixed(2)}
                  </p>{" "}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
