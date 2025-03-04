import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
const NavBar = () => {
  const token = localStorage.getItem("token");
  const { isAuthenticated } = useSelector((state) => state.user);
  let role = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      role = decodedToken.role; // Extract the role
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  return (
    <div className="navbar bg-base-100 justify-center w-full hidden sm:flex">
      <div className="navbar-center hidden sm:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="text-lg" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link className="text-lg" to="/services">
              Services
            </Link>
          </li>
          {role === "admin" && isAuthenticated ? (
            <li>
              <Link className="text-lg" to="/admin-dashboard">
                Admin
              </Link>
            </li>
          ) : (
            isAuthenticated && (
              <li>
                <Link className="text-lg" to="/dashboard">
                  Manage Tickets
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
