"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { buildApiUrl } from "@/utils/apiBase";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { userId, token } = useAuth();

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token || !userId) {
      // User is not logged in, redirect to login page
      router.push(`/login?redirect=${encodeURIComponent("/profile")}`);
    }
  }, [token, userId]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          buildApiUrl("/user/auth/me/" + userId)
        );

        // Adjust the endpoint as necessary
        setCustomer(response.data?.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setError("Error fetching customer data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchCustomerData();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const updateCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    setSuccess(false);

    try {
      const response = await axios.put(
        buildApiUrl("/user/auth/me/" + userId),
        { ...customer }
      );
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      setError("Error updating customer");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">Customer Profile</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && (
        <div className="text-green-500 mb-4">Profile Updated Successfully</div>
      )}
      <form onSubmit={updateCustomer}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            type="text"
            name="fullName"
            id="fullName"
            value={customer.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            type="email"
            name="email"
            id="email"
            value={customer.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="submit"
          className={`mt-4 p-2 bg-primary text-background rounded-md w-full ${
            updating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
