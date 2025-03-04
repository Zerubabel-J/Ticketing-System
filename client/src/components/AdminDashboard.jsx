import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import api from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const location = useLocation();
  console.log("Location", location);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, usersRes, adsRes] = await Promise.all([
          api.get("/api/articles"),
          api.get("/api/users"),
          api.get("/api/advertisements"),
        ]);
        setArticles(articlesRes.data);
        setUsers(usersRes.data);
        setAds(adsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigationClick = () => {
    setSidebarOpen(false); // Close sidebar when a navigation item is clicked
  };

  const navigation = [
    { name: "Admin", to: "/admin" },
    { name: "Manage Articles", to: "/admin/articles" },
    { name: "Create Article", to: "/admin/create-article" },
    { name: "Manage Users", to: "/admin/users" },
    { name: "Create User", to: "/admin/create-user" },
    { name: "Manage Ads", to: "/admin/ads" },
    { name: "Create Ads", to: "/admin/create-ads" },
    { name: "Manage Archives", to: "/admin/archives" },
    { name: "Create Archive", to: "/admin/create-archive" },
  ];

  const chartData = {
    labels: ["Articles", "Users", "Ads"],
    datasets: [
      {
        label: "Count",
        data: [articles.length, users.length, ads.length],
        backgroundColor: ["#4CAF50", "#FF6384", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dashboard Overview",
      },
    },
    scales: {
      x: {
        type: "category", // Explicitly define the x-axis as a "category" scale
      },
      y: {
        beginAtZero: true, // Ensure the y-axis starts at zero
      },
    },
  };
  return (
    <div className="flex  flex-col">
      {/* Header */}
      <header className="flex items-center   lg:hidden px-4 py-2 absolute top-18 left-0 w-full z-50">
        <button
          className=" bg-gray-800 text-gray-300 hover:text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
        <span className="ml-4 text-lg font-bold">Admin Dashboard</span>
      </header>

      <div className="flex flex-1 pt-12 lg:pt-0">
        {/* Sidebar */}
        <aside
          className={`absolute z-40 inset-y-25 left-0 transform h-full ${
            sidebarOpen
              ? "translate-x-0  bg-gray-800 text-white"
              : "-translate-x-full  "
          } lg:translate-x-0 lg:static w-full lg:w-64  transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="px-4 py-2 text-lg font-bold">Admin Panel</div>
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={handleNavigationClick}
                  className="block py-2 px-4 rounded hover:bg-gray-700"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {location.pathname === "/admin" && (
            <div className="w-full max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
