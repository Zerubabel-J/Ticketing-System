// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    username: "", // Changed from 'name' to 'username'
    email: "",
    password: "",
    role: "user", // Default role is 'user'
  });
  const navigate = useNavigate();

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
      // Send a POST request to the backend signup endpoint
      await axios.post("http://localhost:5000/api/auth/signup", user);

      // Reset form fields
      setUser({
        username: "",
        email: "",
        password: "",
        role: "user",
      });

      // Show success message
      Swal.fire("Success", "User created successfully!", "success");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      Swal.fire(
        "Error",
        error.response?.data?.error || "There was an issue with registering",
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Sign up now!</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-base-200 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
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
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
