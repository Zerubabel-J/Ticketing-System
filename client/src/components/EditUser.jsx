import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/users/${id}`);

        const { name, email, role } = response.data;
        setUser({ name, email, role });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/users/${id}`, user);
      Swal.fire("Success", "User updated successfully!", "success");
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "There was an issue updating the user.", "error");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          >
            <option value="reader">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
