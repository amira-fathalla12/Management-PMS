import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the types for the users prop
interface UsersChartProps {
  users: {
    admin: number;
    user: number;
  };
}

const UsersChart: React.FC<UsersChartProps> = ({ users }) => {
  const data = {
    labels: ["Admin", "User"],
    datasets: [
      {
        label: "Users",
        data: [users.admin, users.user],
        backgroundColor: ["#35C2FD", "#54D14D"],
        borderColor: ["#35C2FD", "#54D14D"],
        borderWidth: 5,
        cutout: "70%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Description below the chart */}
      <div className="flex mb-2 text-sm font-medium">
        <span className="mx-2 text-blue-600">Admins: {users.admin}</span>
        <span className="text-green-600">Users: {users.user}</span>
      </div>

      {/* Doughnut Chart Container */}
      <div className="relative w-[200px] h-[200px]">
        <Doughnut data={data} options={options} />

        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-lg">
          Users
        </div>
      </div>
    </div>
  );
};

export default UsersChart;
