"use client";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WeeklySalesChart() {
  const [salesData, setSalesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [kpiData, setKpiData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const salesResponse = await fetch("http://localhost:3002/sales-data");
      const salesData = await salesResponse.json();

      const ordersResponse = await fetch(
        "http://localhost:3002/orders-data-line"
      );
      const ordersData = await ordersResponse.json();

      const kpiResponse = await fetch("http://localhost:3002/kpi-ai");
      const kpiData = await kpiResponse.json();

      const labels = salesData.map((item) => item.month);

      setLabels(labels);

      setSalesData(salesData.map((item) => item.total_sales));
      setOrdersData(ordersData.map((item) => item.total_orders));
      setKpiData(kpiData.map((item) => item.value)); // Set KPI data
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
        text: "Monthly Sales, Orders, and KPI Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: salesData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Orders",
        data: ordersData,
        borderColor: "rgb(0, 137, 132)",
        backgroundColor: "rgba(0, 137, 132, 0.5)",
      },
      {
        label: "KPI AI",
        data: kpiData,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Monthly Sales, Orders, and KPI Chart
      </h2>
      <div className="p-4">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
