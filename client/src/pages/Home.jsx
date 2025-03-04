import { Link } from "react-router-dom";
import lanimg from "../assets/images/top-ticketing-systems-cover-picture.svg";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold">
          Welcome to the Ticketing System
        </h1>
        <p className="text-lg">
          Manage and track your tickets effortlessly. Login or sign up to access
          all features.
        </p>
        <img
          src={lanimg}
          alt="Ticketing System"
          className="mx-auto rounded-lg shadow-lg max-h-[300px]"
        />
        <div className="flex space-x-4 justify-center mt-6">
          <Link
            to="login"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-ld font-semibold hover:bg-gray-100 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
