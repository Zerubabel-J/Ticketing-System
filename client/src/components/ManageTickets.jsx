// src/pages/ManageTickets.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/tickets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = (ticketId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`http://localhost:5000/api/tickets/${ticketId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTickets((prevTickets) =>
            prevTickets.filter((ticket) => ticket._id !== ticketId)
          );
          Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting ticket:", error);
          const errorMessage =
            error.response?.data?.error ||
            "There was a problem deleting the ticket.";
          Swal.fire("Error!", errorMessage, "error");
        }
      }
    });
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  function TruncatedDescription({ description, maxLength }) {
    const truncatedText =
      description.length > maxLength
        ? description.substring(0, maxLength) + "..."
        : description;

    return <p>{truncatedText}</p>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl mb-6 text-gray-600">Manage Tickets</h2>

      <table className=" w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-0 text-center text-gray-600 whitespace-nowrap">
              Title
            </th>
            <th className="px-0 py-3 text-center text-gray-600 whitespace-nowrap">
              Description
            </th>
            <th className="px-2 py-3 text-center text-gray-600 whitespace-nowrap">
              Status
            </th>
            <th className="px-0 py-3 text-center text-gray-600 whitespace-nowrap">
              Created By
            </th>
            <th className="px-0 py-3 text-center text-gray-600 whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-b">
              <td className="px-2  py-4 text-gray-800 text-center">
                {ticket.title}
              </td>
              <td className="px-2 py-4 text-gray-800 text-center">
                <TruncatedDescription
                  description={ticket.description}
                  maxLength={100}
                />
              </td>
              <td className="px-2 py-4 text-gray-800 text-center">
                {ticket.status}
              </td>
              <td className="px-2 py-4 text-gray-800 text-center">
                {ticket.createdBy.username}
              </td>
              <td className="px-2 py-4 text-center">
                <Link
                  to={`/dashboard/edit-ticket/${ticket._id}`}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(ticket._id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTickets;
