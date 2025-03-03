import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/images/tickets-logo.png";
import user from "../assets/images/user.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "About Us", to: "/about-us", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated, "IsAuthenticated");
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logout successful", localStorage.getItem("token"));
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-6">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button - visible only on small screens */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Hawaria Media" src={logo} className="h-16 w-20 " />
            </div>
          </div>

          {/* Site name - visible only on medium and larger screens */}
          <div className="hidden md:block md:absolute md:inset-x-0 md:flex md:justify-center">
            <h2 className="text-lg font-semibold text-white">
              Managing Tickets{" "}
            </h2>
          </div>

          {/* Profile dropdown - aligned to the right */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Register link (visible only when not authenticated) */}
            {!isAuthenticated && (
              <Link
                to="/register"
                className="hidden sm:block relative  p-1 text-gray-400 hover:text-white focus:outline-none  "
              >
                <span className="absolute -inset-1.5" />
                <h2 className=" text-white">Register</h2>
              </Link>
            )}

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img alt="" src={user} className="size-12 rounded-full" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div>
                  <div>
                    {isAuthenticated ? (
                      <MenuItem>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        >
                          Logout
                        </button>
                      </MenuItem>
                    ) : (
                      <MenuItem>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        >
                          Login
                        </Link>
                      </MenuItem>
                    )}
                    <div>
                      {" "}
                      <Link
                        to="/register"
                        className="block sm:hidden px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
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
