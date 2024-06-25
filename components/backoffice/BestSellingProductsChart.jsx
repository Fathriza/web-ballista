// BestSellingProductsChart.jsx
"use client"
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const BestSellingProductsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Sales",
        data: [],
        backgroundColor: [
          "rgba(5, 255, 217, 0.786)",
          "rgba(255, 184, 5, 0.896)",
          "rgba(255, 39, 237, 0.858)",
          "rgba(39, 61, 255, 0.858)",
        ],
        borderColor: [
          "rgba(5, 255, 217, 0.386)",
          "rgba(255, 184, 5, 0.496)",
          "rgba(255, 39, 237, 0.458)",
          "rgba(39, 61, 255, 0.458)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchPieChartData();
  }, []);

  const fetchPieChartData = async () => {
    try {
      const response = await fetch("http://localhost:3002/pie-chart-data");
      const data = await response.json();

      const updatedChartData = {
        labels: data.map((item) => item.product_name),
        datasets: [
          {
            label: "Total Sales",
            data: data.map((item) => item.total_sales),
            backgroundColor: [
              "rgba(5, 255, 217, 0.786)",
              "rgba(255, 184, 5, 0.896)",
              "rgba(255, 39, 237, 0.858)",
              "rgba(39, 61, 255, 0.858)",
            ],
            borderColor: [
              "rgba(5, 255, 217, 0.386)",
              "rgba(255, 184, 5, 0.496)",
              "rgba(255, 39, 237, 0.458)",
              "rgba(39, 61, 255, 0.458)",
            ],
            borderWidth: 1,
          },
        ],
      };

      setChartData(updatedChartData);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "white"
            : "black",
        },
      },
    },
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Best Selling Charts
      </h2>
      <div className="p-10">
        <Pie data={chartData} options={options} className="w-14 h-14" />
      </div>
    </div>
  );
};

export default BestSellingProductsChart;
