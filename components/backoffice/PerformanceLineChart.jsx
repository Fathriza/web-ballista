"use client";
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

const ProductPerformanceChart = () => {
  const [productLikedData, setProductLikedData] = useState([]);
  const [productSeenData, setProductSeenData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const likedResponse = await fetch("http://localhost:3002/product-liked");
      const likedData = await likedResponse.json();

      const seenResponse = await fetch("http://localhost:3002/product-seen");
      const seenData = await seenResponse.json();

      const labels = likedData.map((item) => item.product_name);

      setLabels(labels);
      setProductLikedData(likedData.map((item) => item.product_liked));
      setProductSeenData(seenData.map((item) => item.product_seen));

      console.log("Product Liked Data:", likedData);
      console.log("Product Seen Data:", seenData);
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
        text: "Product Performance Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Product Liked",
        data: productLikedData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
      {
        label: "Product Seen",
        data: productSeenData,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Product Performance Chart
      </h2>
      <div className="p-4">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default ProductPerformanceChart;
