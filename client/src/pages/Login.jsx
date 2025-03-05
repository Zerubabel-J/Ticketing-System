import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import apiConfig from "../api/apiConfig";
import { loginSuccess, loginFailure } from "../store/features/userSlice"; // Import Redux actions

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to extract role from token
  const getRoleFromToken = (token) => {
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Base64 decode the payload
      return decoded.role;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiConfig.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);

      const role = getRoleFromToken(response.data.token);

      // Dispatch loginSuccess action with user data
      dispatch(
        loginSuccess({
          user: { username, role },
          token: response.data.token,
        })
      );

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
      setError("Invalid username or password");

      // Dispatch loginFailure action with error message
      dispatch(loginFailure(error.response?.data?.error || "Login failed"));

      Swal.fire("Error", "Invalid username or password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-base-200 p-6 rounded-lg shadow-md"
      >
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input input-bordered w-full"
            disabled={loading} // Disable input during loading
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
            disabled={loading} // Disable input during loading
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading} // Disable button during loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
