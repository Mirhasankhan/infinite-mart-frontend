// src/components/LineChart.tsx
import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ChartData,
  ChartOptions,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
);

const LineChart: React.FC = () => {
  const chartRef = useRef<ChartJS<"line", number[], string> | null>(null);

  const data: ChartData<"line", number[], string> = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Total Orders",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        tension: 0.45,
        backgroundColor: "rgba(37,99,235,0.08)",
        borderColor: "#2563eb",
        borderWidth: 2.5,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Spend ($)",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: true,
        tension: 0.45,
        backgroundColor: "rgba(219,39,119,0.08)",
        borderColor: "#db2777",
        borderWidth: 2.5,
        pointBackgroundColor: "#db2777",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#94a3b8",
        bodyColor: "#f8fafc",
        padding: 12,
        cornerRadius: 10,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#94a3b8", font: { size: 12 } },
      },
      y: {
        grid: { color: "#f1f5f9" },
        border: { display: false, dash: [4, 4] },
        ticks: { color: "#94a3b8", font: { size: 12 } },
      },
    },
  };

  useEffect(() => {
    const currentChart = chartRef.current;
    return () => {
      if (currentChart) currentChart.destroy();
    };
  }, []);

  const legendItems = [
    { label: "Total Orders", color: "#2563eb" },
    { label: "Spend ($)",    color: "#db2777" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-bold text-gray-800">Activity Overview</p>
          <p className="text-xs text-gray-400 mt-0.5">Orders & spend — last 7 months</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-500 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <Line data={data} options={options} ref={chartRef} />
    </div>
  );
};

export default LineChart;
