"use client"
import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard";
import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from "lucide-react";

export default function SmallCards() {
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    // Ambil data order dari server menggunakan fetch
    fetch("http://localhost:3002/orders")
      .then((response) => response.json())
      .then((data) => {
        const orders = [
          {
            title: "Total Orders",
            number: data.total,
            icon: ShoppingCart,
            iconBg: "bg-green-600",
          },
          {
            title: "Orders Failed",
            number: data.failed,
            icon: Loader2,
            iconBg: "bg-blue-600",
          },
          {
            title: "Order Processing",
            number: data.processing,
            icon: RefreshCcw,
            iconBg: "bg-orange-600",
          },
          {
            title: "Orders Delivered",
            number: data.delivered,
            icon: CheckCheck,
            iconBg: "bg-purple-600",
          },
        ];
        setOrderStatus(orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2
    md:grid-cols-3 lg:grid-cols-4 gap-4 py-8"
    >
      {orderStatus.map((data, i) => {
        return <SmallCard key={i} data={data} />;
      })}
    </div>
  );
}
