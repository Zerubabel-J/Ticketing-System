import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/images/tickets-logo.png";
import user from "../assets/images/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setAuthState } from "../store/features/userSlice";
import { useEffect, useState } from "react";

// Define the navigation items
const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Services", to: "/services", current: false },
  { name: "Manage Tickets", to: "/dashboard", current: false, role: "user" },
  { name: "Admin", to: "/admin-dashboard", current: false, role: "admin" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavHeader() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the token to extract the role
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserRole(decodedToken.role);
        dispatch(setAuthState(true));
      } catch (error) {
        console.error("Error decoding token:", error);
        dispatch(setAuthState(false));
      }
    } else {
      dispatch(setAuthState(false));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setUserRole(null); // Clear the role on logout
    navigate("/login");
  };

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  // Filter navigation items based on user role and authentication status
  const filteredNavigation = navigation.filter((item) => {
    if (!item.role) return true;
    if (!isAuthenticated) return false;
    return item.role === userRole;
  });

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-6">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button - visible only on small screens */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block size-6" />
              ) : (
                <Bars3Icon className="block size-6" />
              )}
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Ticketing System"
                src={logo}
                className="h-14 w-20 rounded-lg"
              />
            </div>
          </div>

          {/* Site name - visible only on medium and larger screens */}
          <div className="hidden md:block md:absolute md:inset-x-0 md:flex md:justify-center">
            <h2 className="text-lg font-semibold text-white">
              Ticketing System
            </h2>
          </div>

          {/* Profile dropdown - aligned to the right */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Sign Up link (visible only when not authenticated) */}
            {!isAuthenticated && (
              <Link
                to="/signup"
                className="hidden sm:block relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
              >
                <span className="absolute -inset-1.5" />
                <h2 className="text-white">Sign Up</h2>
              </Link>
            )}

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img alt="" src={user} className="size-12 rounded-full" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none"
              >
                {isAuthenticated ? (
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  </MenuItem>
                )}
                {/* Mobile-only Sign Up link */}
                {!isAuthenticated && (
                  <MenuItem>
                    <Link
                      to="/signup"
                      className="block sm:hidden px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Up
                    </Link>
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {filteredNavigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.to}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
