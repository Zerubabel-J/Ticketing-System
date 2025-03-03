import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import the library to decode JWT

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

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
            <Link className="text-lg" to="/politics">
              Politics
            </Link>
          </li>
          <li>
            <Link className="text-lg" to="/business">
              Business
            </Link>
          </li>
          <li>
            <Link className="text-lg" to="/technology">
              Technology
            </Link>
          </li>
          <li>
            <Link className="text-lg" to="/culture">
              Culture
            </Link>
          </li>
          <li>
            <Link className="text-lg" to="/travel">
              Travel
            </Link>
          </li>
          <li>
            <Link className="text-lg" to="/archives">
              Archives
            </Link>
          </li>
          <li>
            <Link className="text-lg" to="/about-us">
              About Us
            </Link>
          </li>
          {(role === "admin" || role === "manager") && isAuthenticated ? (
            <li>
              <Link className="text-lg" to="/admin">
                Admin
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
