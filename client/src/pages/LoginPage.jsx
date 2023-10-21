/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setLogin } from "../context/authSlice";

import welcomeBack from "../assets/login_card_image.jpg";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      const result = await axios.post(
        "http://localhost:3001/auth/login",
        formData
      );
      dispatch(setLogin(result.data));
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full flex py-10 items-center flex-col gap-2">
      <h1 className="text-5xl font-bold pl-6">Login</h1>
      <div className="h-52 overflow-hidden my-4">
        <img src={welcomeBack} alt="" className="w-full h-full object-cover" />
      </div>
      <form
        className=" w-96  p-2 pl-10 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="">
          <label htmlFor="email" className="text-md ">
            Email
          </label>
          <br />
          <input
            id="email"
            type="text"
            ref={emailRef}
            className="border border-gray-500 rounded-md h-10 outline-none w-72 px-2"
          />
        </div>
        <div className="">
          <label htmlFor="password" className="text-md ">
            Password
          </label>
          <br />
          <input
            id="password"
            type="password"
            ref={passwordRef}
            className="border border-gray-500 rounded-md h-10 outline-none w-72 px-2"
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="text-lg font-medium hoverButton bg-blue-600 mr-3 text-white px-5 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
      <div>
        <span className="text-sm px-5">If you don't have a Account:-</span>
        <Link to={"/register"}>
          <button className="text-md hoverButton rounded-lg text-blue-600 px-5 py-2 customBtnShadow">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
