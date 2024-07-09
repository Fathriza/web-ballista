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

const monthNames = {
  "01": "Januari",
  "02": "Februari",
  "03": "Maret",
  "04": "April",
  "05": "Mei",
  "06": "Juni",
  "07": "Juli",
  "08": "Agustus",
  "09": "September",
  10: "Oktober",
  11: "November",
  12: "Desember",
};

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

      const labels = salesData.map((item) => {
        const [year, month] = item.month.split("-");
        return monthNames[month];
      });

      // Tambahkan bulan berikutnya ke label jika tidak ada
      const lastMonth = salesData[salesData.length - 1].month;
      const [lastYear, lastMonthNumber] = lastMonth.split("-");
      const nextMonthNumber = (parseInt(lastMonthNumber) % 12) + 1;
      const nextYear =
        nextMonthNumber === 1 ? parseInt(lastYear) + 1 : lastYear;
      const nextMonth = `${nextYear}-${String(nextMonthNumber).padStart(
        2,
        "0"
      )}`;
      const nextMonthName =
        monthNames[String(nextMonthNumber).padStart(2, "0")];

      if (!labels.includes(nextMonthName)) {
        labels.push(nextMonthName);
      }

      setLabels(labels);
      setSalesData(salesData.map((item) => item.total_sales));
      setOrdersData(ordersData.map((item) => item.total_orders));
      setKpiData(kpiData.map((item) => item.value));

      console.log("Sales Data:", salesData);
      console.log("Orders Data:", ordersData);
      console.log("KPI Data:", kpiData);
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
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "KPI",
        data: kpiData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Monthly Sales, Orders, and KPI Recommendation Chart
      </h2>
      <div className="p-4">
        <Line options={options} data={data}  />
      </div>
    </div>
  );
}
