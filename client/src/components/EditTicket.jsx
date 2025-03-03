// src/pages/EditTicket.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditTicket = () => {
  const { id } = useParams(); // Get ticket ID from URL
  const navigate = useNavigate(); // To navigate after successful edit

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/tickets/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/tickets/${id}`,
        {
          title: ticket.title,
          description: ticket.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success", "Ticket updated successfully!", "success");
      navigate("/dashboard");
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

        <button type="submit" className="btn btn-primary">
          Update Ticket
        </button>
      </form>
    </div>
  );
};

export default EditTicket;
