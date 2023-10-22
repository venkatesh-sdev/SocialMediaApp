/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../context/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MessageSide, Navbar, PostBar, Sidebar } from "../components";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-full bg-gray-100 ">
      <Navbar user={user} />
      <div className="mx-2 rounded-lg flex gap-2 p-2 lg:p-3">
        <Sidebar user={user} />
        <PostBar user={user} />
        <MessageSide user={user} />
      </div>
    </div>
  );
};

export default HomePage;
