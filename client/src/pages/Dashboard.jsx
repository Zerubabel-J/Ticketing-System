// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ManageTickets from "../components/ManageTickets";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch tickets:",
        error.response?.data?.error || error.message
      );
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/tickets",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTickets();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(
        "Failed to create ticket:",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="flex flex-col justify-center items-center    gap-8">
        <form onSubmit={handleCreateTicket} className="mb-8 w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Ticket
          </button>
        </form>
        <ManageTickets />
      </div>
    </div>
  );
}
