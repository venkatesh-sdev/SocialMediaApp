/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// Hooks and Navigation
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// StateManagement
import { useDispatch } from "react-redux";
import { setLogout } from "../../context/authSlice";

// Logo
import logo from "../../assets/logo.svg";
// Icons
import { IoIosSearch, IoIosLogOut } from "react-icons/io";
import { IoNotificationsOutline, IoBookmarkOutline } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";

// URLS
import URL from "../../constants/URLS";

// Animations
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ user }) => {
  // Dispatch for make actions in redux
  const dispatch = useDispatch();
  // useNavigate Hook for navigation
  const navigate = useNavigate();

  /* States */
  const [popUpBar, setPopUpBar] = useState(false);
  const [searchText, setSearchText] = useState("");

  /* Methods */
  // Handling Logout
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <nav className="flex px-5 py-2 items-center justify-between">
      {/* Logo and Search Input */}
      <div className="flex justify-between items-center w-1/2">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <img src={logo} alt="" className="w-10 drop-shadow-2xl" />
          <h1 className="text-lg font-medium hidden min-[380px]:block">
            WeShare
          </h1>
        </div>
        {/* Input Search */}
        <div className="hidden lg:flex bg-gray-100 h-8 items-center gap-2 px-2 rounded-lg">
          <IoIosSearch className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-80 caret-slate-600"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      {/* Buttons and Profile */}
      <div className="w-96 flex items-center gap-5 justify-end">
        {/* Notification and Bookmark */}
        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button
            onClick={() => {}}
            className="w-9 h-9 flex justify-center items-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-500"
          >
            <IoNotificationsOutline size={20} className="text-gray-500" />
          </button>
          {/* BookMark Button*/}
          <button
            onClick={() => {}}
            className="w-9 h-9 flex justify-center items-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-500"
          >
            <IoBookmarkOutline size={20} className="text-gray-500" />
          </button>
        </div>
        {/* Profile Image */}
        <div className="flex  items-center gap-1 relative">
          <Link
            to={"/profile"}
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <img
              src={URL.getImageUrl(user.picturePath)}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
          {/* UserName and Menu Button */}
          <button
            onClick={() => setPopUpBar((prev) => !prev)}
            className="flex gap-1 rounded-xl cursor-pointer items-center hover:bg-gray-200 transition-all duration-500 p-2"
          >
            <h1 className="hidden sm:block">
              {user.firstName + " " + user.lastName}
            </h1>
            <RiArrowDownSLine size={20} />
          </button>
          {/* Menu  */}
          <AnimatePresence>
            {popUpBar && (
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white drop-shadow-lg w-40 absolute right-0 top-16 rounded-lg p-2"
              >
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 Ipx-5 py-2 border-b border-gray-200 hover:bg-gray-200 transition-all duration-500 w-full rounded-md"
                >
                  Logout
                  <IoIosLogOut size={20} />
                </button>
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center justify-center gap-2 Ipx-5 py-2 border-b border-gray-200 hover:bg-gray-200 transition-all duration-500 w-full rounded-md"
                >
                  Profile
                  <HiOutlineUser size={20} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
