import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logout successful", localStorage.getItem("token"));
    navigate("/login");
  };

  return (
    <>
      <div className="navbar bg-gray-800 text-white py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="m-1  btn-ghost btn-sm dropdown-toggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow  text-black"
            >
              <li>
                <Link className="" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/">Politics</Link>
              </li>
              <li>
                <Link to="/">Business</Link>
              </li>
              <li>
                <Link to="/">Technology</Link>
              </li>
              <li>
                <Link to="/">Culture</Link>
              </li>
              <li>
                <Link to="/">Arts</Link>
              </li>
              <li>
                <Link to="/">Travel</Link>
              </li>
              <li>
                <Link to="/">Nature</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <h1>Hawarya Media</h1>
        </div>
        <div className="navbar-end">
          {/* <button className=" hover:bg-sky-700  mr-5">Register</button> */}
          <div className="">
            {isAuthenticated ? (
              <button onClick={handleLogout} className=" ">
                Logout
              </button>
            ) : (
              <>
                <Link to="/register" className=" mr-5">
                  Register
                </Link>
                <Link to="/login" className="">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
