import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  // Extract the user's role from the token
  const token = localStorage.getItem("token");
  let userRole = "";

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      userRole = decodedToken.role;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // Check if the user is authenticated and has the required role
  if (!token || userRole !== allowedRole) {
    // Redirect to the home page if not authorized
    return <Navigate to="/" replace />;
  }

  // Render the nested routes if authorized
  return <Outlet />;
};

export default ProtectedRoute;
