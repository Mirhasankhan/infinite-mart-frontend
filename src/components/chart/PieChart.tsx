// src/components/PieChart.tsx
import React, { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useOrderedProductsQuery } from "../../redux/features/purchase/purchase.api";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const { email } = useAppSelector(useCurrentUser);
  const { data: orderedData } = useOrderedProductsQuery(email);
  console.log();
  const processing = orderedData?.data.filter(
    (order: { status: string }) => order.status == "processing"
  );
  const delivered = orderedData?.data.filter(
    (order: { status: string }) => order.status !== "processing"
  );
  const chartRef = useRef<ChartJS<"pie", number[], string> | null>(null);

  const data: ChartData<"pie", number[], string> = {
    labels: ["Order", "Processing", "Delivered"],
    datasets: [
      {
        data: [
          orderedData?.data?.length,
          processing?.length,
          delivered?.length,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
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
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Order Latest Status</h2>
      <Pie data={data} ref={chartRef} />
    </div>
  );
};

export default PieChart;
