import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiConfig from "../api/apiConfig";

const AdminEditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    status: "Open",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await apiConfig.get(`/tickets/${id}`);
        setTicket(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket:", error);
        Swal.fire("Error", "There was an issue fetching the ticket.", "error");
      }
    };

    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiConfig.put(`/tickets/${id}`, {
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
      });
      Swal.fire("Success", "Ticket updated successfully!", "success");
      navigate("/admin-dashboard/tickets"); // Redirect to the tickets list
    } catch (error) {
      console.error("Error updating ticket:", error);
      Swal.fire("Error", "There was an issue updating the ticket.", "error");
    }
  };

  if (loading) {
    return <div>Loading ticket data...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Ticket</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={ticket.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            name="status"
            value={ticket.status}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Ticket
        </button>
      </form>
    </div>
  );
};

export default AdminEditTicket;
