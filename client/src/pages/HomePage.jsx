/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../context/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../components";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  return (
    <div className="min-h-screen max-h-full ">
      <Navbar user={user} />
      <div className="bg-gray-200 h-screen m-2 rounded-lg"></div>
    </div>
  );
};

export default HomePage;
