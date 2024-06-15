"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BestSellingProductsChart() {
  const data = {
    labels: ["Jerseys", "Ticket", "Keychain", "Shawl"],
    datasets: [
      {
        label: "# of Votes",
        data: [46, 19, 23, 15],
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

  const options = {
    plugins: {
      legend: {
        labels: {
          color: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "white"
            : "black", // Adjust label color based on theme
        },
      },
    },
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Best Selling Charts
      </h2>
      {/* Chart */}
      <div className="p-10">
        <Pie data={data} options={options} className="w-14 h-14" />
      </div>
    </div>
  );
}
