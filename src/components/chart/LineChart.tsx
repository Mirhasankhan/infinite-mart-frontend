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
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const LineChart: React.FC = () => {
  const chartRef = useRef<ChartJS<"line", number[], string> | null>(null);

  const data: ChartData<"line", number[], string> = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Orders",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Cost Needed",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: true,
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
      },
    ],
  };

  useEffect(() => {
    const currentChart = chartRef.current;

    return () => {
      if (currentChart) {
        currentChart.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full mt-6">
      <h2 className="text-xl font-bold mb-4">Orders Update</h2>
      <Line data={data} ref={chartRef} />
    </div>
  );
};

export default LineChart;
