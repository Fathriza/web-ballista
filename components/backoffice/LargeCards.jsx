"use client"
import React, { useEffect, useState } from "react";
import LargeCard from "./LargeCard";

export default function LargeCards() {
  const [orderStats, setOrderStats] = useState([
    {
      period: "Today Orders",
      sales: 0,
      color: "bg-green-600",
    },
    {
      period: "Yesterday Orders",
      sales: 0,
      color: "bg-blue-600",
    },
    {
      period: "Last Month",
      sales: 0,
      color: "bg-orange-600",
    },
    {
      period: "Total Sales",
      sales: 0,
      color: "bg-purple-600",
    },
  ]);

  useEffect(() => {
    // Ambil data order stats dari server menggunakan fetch
    fetch("http://localhost:3002/order-stats")
      .then((response) => response.json())
      .then((data) => {
        const updatedOrderStats = [
          {
            period: "Today Orders",
            sales: data.today_sales,
            color: "bg-green-600",
          },
          {
            period: "Yesterday Orders",
            sales: data.yesterday_sales,
            color: "bg-blue-600",
          },
          {
            period: "Last Month",
            sales: data.last_month_sales,
            color: "bg-orange-600",
          },
          {
            period: "Total Sales",
            sales: data.total_sales,
            color: "bg-purple-600",
          },
        ];
        setOrderStats(updatedOrderStats);
      })
      .catch((error) => {
        console.error("Error fetching order stats:", error);
      });
  }, []);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2
    md:grid-cols-3 lg:grid-cols-4 gap-4 py-8"
    >
      {orderStats.map((item, i) => {
        return <LargeCard className="bg-green-600" data={item} key={i} />;
      })}
    </div>
  );
}
