import { useRef, useState } from "react";
import profile from "../assets/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [profilePic, setProfilePic] = useState(profile);
  const [imageFile, setImageFile] = useState();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const locationRef = useRef();
  const occupationRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", imageFile);
      formData.append("firstName", firstNameRef.current.value);
      formData.append("lastName", lastNameRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("location", locationRef.current.value);
      formData.append("occupation", occupationRef.current.value);
      formData.append("password", passwordRef.current.value);
      formData.append("picturePath", imageFile.name);

      const result = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );
      console.log(result.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full flex py-10 items-center flex-col gap-2">
      <h1 className="text-5xl font-bold pl-6">Register</h1>
      <form
        className=" w-96  p-2 pl-10 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-5">
          <label htmlFor="picturePath">
            <div className="w-36 h-36 overflow-hidden rounded-full cursor-pointer">
              <img
                src={profilePic}
                alt=""
                className=" w-full h-full object-cover  hoverButton"
              />
            </div>
            <h1>{"Choose Profile Pic.. "}</h1>
          </label>
          <input
            type="file"
            accept=".jpeg , .jpg , .png"
            className="hidden"
            id="picturePath"
            required
            onChange={(e) => {
              setProfilePic(URL.createObjectURL(e.target.files[0]));
              setImageFile(e.target.files[0]);
            }}
          />
        </div>
        <div className="">
          <label htmlFor="firstName" className="text-md ">
            Firstname
          </label>
          <br />
          <input
            id="firstName"
            type="text"
            ref={firstNameRef}
            required
            className="border border-gray-500 rounded-md h-10 outline-none w-72 px-2"
          />
        </div>
        <div className="">
          <label htmlFor="lastName" className="text-md ">
            Lastname
          </label>
          <br />
          <input
            id="lastName"
            type="text"
            ref={lastNameRef}
            required
            className="border border-gray-500 rounded-md h-10 outline-none w-72 px-2"
          />
        </div>
        <div className="">
          <label htmlFor="email" className="text-md ">
            Email
          </label>
          <br />
          <input
            id="email"
            type="text"
            ref={emailRef}
            required
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
            required
            className="border border-gray-500 rounded-md h-10 outline-none w-72 px-2"
          />
        </div>
        <div className="">
          <label htmlFor="location" className="text-md ">
            Location
          </label>
          <br />
          <input
            id="location"
            type="text"
            ref={locationRef}
            required
            className="border border-gray-500 rounded-md h-10 outline-none w-72 px-2"
          />
        </div>
        <div className="">
          <label htmlFor="occupation" className="text-md ">
            Occupation
          </label>
          <br />
          <input
            id="occupation"
            type="text"
            ref={occupationRef}
            required
            className="border border-gray-500 rounded-md h-10 outline-none w-72 px-2"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="text-lg font-medium hoverButton bg-blue-600 mr-3 text-white px-5 py-2 rounded-lg"
          >
            Register
          </button>
        </div>
      </form>
      <div>
        <span className="text-sm px-5">Already Have a Account:-</span>
        <Link to={"/login"}>
          <button className="text-md hoverButton rounded-lg text-blue-600 px-5 py-2 customBtnShadow">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
