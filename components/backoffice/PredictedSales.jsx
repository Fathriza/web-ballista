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

// Register Chart.js components
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
  Januari: "01",
  Februari: "02",
  Maret: "03",
  April: "04",
  Mei: "05",
  Juni: "06",
  Juli: "07",
  Agustus: "08",
  September: "09",
  Oktober: "10",
  November: "11",
  Desember: "12",
};

const PredictedSales = () => {
  const [predictedData, setPredictedData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchPredictedData();
  }, []);

  const fetchPredictedData = async () => {
    try {
      const response = await fetch("http://localhost:3002/sales-ai");
      if (!response.ok) {
        throw new Error("Failed to fetch predicted sales data");
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Response is not an array");
      }

      // Filter out any entries without a "month" field
      const validData = data.filter((item) => item.month);

      const formattedLabels = validData.map((item) => {
        const [month, year] = item.month.split(" ");
        return `${month} ${year}`;
      });

      // Add an additional check to handle the case where the last month data is not available
      const lastItem = validData[validData.length - 1];
      if (lastItem) {
        const [lastMonth, lastYear] = lastItem.month.split(" ");
        const lastMonthNumber = parseInt(monthNames[lastMonth]);
        const nextMonthNumber = (lastMonthNumber % 12) + 1;
        const nextYear =
          nextMonthNumber === 1 ? parseInt(lastYear) + 1 : lastYear;
        const nextMonthName = Object.keys(monthNames).find(
          (key) => monthNames[key] === String(nextMonthNumber).padStart(2, "0")
        );

        if (
          nextMonthName &&
          !formattedLabels.includes(`${nextMonthName} ${nextYear}`)
        ) {
          formattedLabels.push(`${nextMonthName} ${nextYear}`);
        }
      }

      setLabels(formattedLabels);
      setPredictedData(validData.map((item) => item.predicted_revenue));
    } catch (error) {
      console.error("Error fetching predicted data:", error.message);
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
        text: "Prediksi Pendapatan 6 Bulan Kedepan",
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

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Prediksi Pendapatan",
        data: predictedData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg  shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Prediksi Pendapatan 6 Bulan Kedepan
      </h2>
      <div className="p-2" style={{height: "500px", width:"100%"}}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PredictedSales;
