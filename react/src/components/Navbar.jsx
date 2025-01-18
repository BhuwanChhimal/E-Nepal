import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import flag from "../assets/flag.gif";
import userImage from "../assets/user_logo.png";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  Avatar,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";

export function ComNavbar() {
  const { token, logout, user } = useAuth();
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLoginScroll = () => {
    navigate("/login");
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // Function to check if a nav item is active
  const isActive = (path) => location.pathname === path;

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {[
        { label: "Home", path: "/" },
        { label: "Tax-Portal", path: "/taxportal" },
        { label: "Complaint Box", path: "/complaintbox" },
      ].map((item) => (
        <Typography
          as="li"
          key={item.path}
          variant="medium"
          color="blue-gray"
          className="p-1 font-normal relative"
        >
          <a
            href={item.path}
            className={`flex items-center p-2 px-4 rounded-s-full transition-all duration-200 ${
              isActive(item.path) ? "bg-red-600 hover:bg-red-500 text-white" : "hover:text-red-600"
            }`}
          >
            {item.label}
          </a>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="w-[80%] ml-[10%] mt-[1rem] sticky top-4 z-50">
      <Navbar className="sticky shadow-blue-800/70 shadow-lg rounded-full top-0 z-10 h-max max-w-full px-4 py-2 lg:px-8 lg:py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={flag} alt="flag-logo" width={25} height={25} />
            <Typography
              as="a"
              href="/"
              className="cursor-pointer text-lg py-1.5 font-semibold"
            >
              E-Nepal
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-3 hidden lg:block">{navList}</div>
            <div className="flex items-center bg-blue-800/70 rounded-full lg:rounded-s-none lg:rounded-e-full uppercase">
              {token ? (
                <Menu>
                  <MenuHandler>
                    <Button variant="text" className="flex items-center ">
                      <Avatar src={userImage} alt="avatar" size="sm" />
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem className="uppercase">
                      {user ? user.name : "username"}
                    </MenuItem>
                    <MenuItem
                      className="text-red-700 font-semibold"
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button
                  variant="text"
                  className="ml-auto text-white"
                  onClick={handleLoginScroll}
                >
                  Login
                </Button>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {token ? (
              <Button
                onClick={handleLogout}
                fullWidth
                variant="text"
                size="sm"
                className=""
              >
                <span>Log out</span>
              </Button>
            ) : (
              <Button fullWidth variant="text" size="sm" className="">
                <span>Log In</span>
              </Button>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default ComNavbar;