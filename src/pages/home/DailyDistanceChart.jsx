import React from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DailyDistanceChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.date), // 日期
    datasets: [
      {
        label: "Daily Distance (km)",
        data: data.map((item) => item.distance), // 距离
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4, // 平滑曲线
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Running Distance",
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
