import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface CircleChartProps {
  booking: {
    completed: number;
    pending: number;
  };
}

const CircleChart: React.FC<CircleChartProps> = ({ booking }) => {
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Bookings",
        data: [booking.completed, booking.pending],
        backgroundColor: ["rgba(33, 150, 243, 0.8)", "#9D57D5"],
        borderColor: ["rgba(33, 150, 243, 1)", "#9D57D5"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <div className="flex justify-center mb-2 text-sm font-medium">
        <span className="mx-2 text-blue-600">Completed: {booking.completed}</span>
        <span className="text-purple-600">Pending: {booking.pending}</span>
      </div>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default CircleChart;
