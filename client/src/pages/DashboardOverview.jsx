import { Bar } from "react-chartjs-2";

const DashboardOverview = ({ chartData, chartOptions }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default DashboardOverview;
