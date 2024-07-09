"use client"
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CitySales = () => {
  const [salesData, setSalesData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await fetch("http://localhost:3002/sales-per-city");
      const data = await response.json();

      const labels = data.map((item) => item.kota.trim());
      const salesData = data.map((item) => item.total_terjual);

      setLabels(labels);
      setSalesData(salesData);

      console.log("Sales Data per City:", data);
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
        text: "Penjualan Produk per Kota",
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
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Total Terjual",
        data: salesData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Penjualan Produk per Kota
      </h2>
      <div className="p-4" style={{ height: "400px", width: "100%" }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default CitySales;
