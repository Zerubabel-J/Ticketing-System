import { useState, useEffect } from "react";
import axios from "axios";
import ManageTickets from "../components/ManageTickets";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    fetchTickets();
    extractUserRole();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://ticketing-system-g1mw.onrender.com/api/tickets",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTickets(response.data);
      setError("");
    } catch (error) {
      console.error(
        "Failed to fetch tickets:",
        error.response?.data?.error || error.message
      );
      setError("Failed to fetch tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const extractUserRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://ticketing-system-g1mw.onrender.com/api/tickets",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Log the response for debugging
      console.log("New Ticket Response:", response.data);

      // Update the tickets state with the new ticket (including createdBy)
      setTickets((prevTickets) => [...prevTickets, response.data]);

      setTitle("");
      setDescription("");
      setError("");
    } catch (error) {
      console.error(
        "Failed to create ticket:",
        error.response?.data?.error || error.message
      );
      setError("Failed to create ticket. Please try again.");
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://ticketing-system-g1mw.onrender.com/api/tickets/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== ticketId)
      );
      setError("");
    } catch (error) {
      console.error(
        "Failed to delete ticket:",
        error.response?.data?.error || error.message
      );
      setError("Failed to delete ticket. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="flex flex-col justify-center items-center gap-8">
        {/* Create Ticket Form */}
        <form onSubmit={handleCreateTicket} className="mb-8 w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white "
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white"
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

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {/* Display Tickets or No Tickets Message */}
            {tickets.length === 0 ? (
              <p className="text-gray-600">No past tickets, add tickets now.</p>
            ) : (
              <ManageTickets
                tickets={tickets}
                onDeleteTicket={handleDeleteTicket}
                userRole={userRole}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
