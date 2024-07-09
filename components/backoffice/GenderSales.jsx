"use client";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PieController,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PieController
);

const GenderSales = () => {
  const [salesData, setSalesData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await fetch("http://localhost:3002/sales-per-gender");
      const data = await response.json();

      const formattedLabels = data.map((item) => {
        if (item.gender === 'L') {
          return "Laki-laki";
        } else if (item.gender === 'P') {
          return "Perempuan";
        }
        return item.gender;
      });
      const salesData = data.map((item) => item.total_terjual);

      setLabels(formattedLabels);
      setSalesData(salesData);

      console.log("Sales Data per Gender:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Penjualan Produk per Gender",
      },
    },
    maintainAspectRatio: false, // Disable aspect ratio so you can set custom height and width
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Total Terjual",
        data: salesData,
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)", // Blue for Laki-laki
          "rgba(255, 99, 132, 0.5)", // Red for Perempuan
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // Border color for Laki-laki
          "rgba(255, 99, 132, 1)", // Border color for Perempuan
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Penjualan Produk per Gender
      </h2>
      <div className="p-4" style={{ height: "400px", width: "100%" }}>
        <Pie options={options} data={data} />
      </div>
    </div>
  );
};

export default GenderSales;
