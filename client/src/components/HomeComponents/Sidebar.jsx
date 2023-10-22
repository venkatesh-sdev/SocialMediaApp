/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formatNumber } from "../../constants/Formatter";
import URLS from "../../constants/URLS";

import checkImage from "../../assets/check.png";
import logo from "../../assets/logo.svg";

import { BiHomeAlt } from "react-icons/bi";
import {
  BsPeople,
  BsCalendar2Event,
  BsCameraVideo,
  BsImage,
  BsFilesAlt,
} from "react-icons/bs";
import { useState } from "react";
const Sidebar = ({ user }) => {
  const userDetails = [
    { title: "Followers", count: 2300 },
    { title: "Following", count: 233 },
    { title: "Post", count: 83 },
  ];

  const [menuBarDetials, setMeuBarDetails] = useState([
    {
      title: "Feed",
      Icon: BiHomeAlt,
      isActive: true,
    },
    {
      title: "Friends",
      Icon: BsPeople,
      isActive: false,
    },
    {
      title: "Events",
      Icon: BsCalendar2Event,
      isActive: false,
    },
    {
      title: "Watch Videos",
      Icon: BsCameraVideo,
      isActive: false,
    },
    {
      title: "Photos",
      Icon: BsImage,
      isActive: false,
    },
    {
      title: "Files",
      Icon: BsFilesAlt,
      isActive: false,
    },
  ]);

  const likedPages = [
    {
      title: "UI/UX Community Services",
    },
    {
      title: "Web Designer",
    },
    {
      title: "Dribbble Community",
    },
    {
      title: "Behance",
    },
  ];

  const makeActiveMenuBar = (title) => {
    setMeuBarDetails((prev) =>
      prev.map((detail) => {
        if (title === detail.title) return { ...detail, isActive: true };
        return { ...detail, isActive: false };
      })
    );
  };

  return (
    <div className="min-w-[250px] hidden  min-[970px]:block">
      {/* User Detials */}
      <div className="w-full h-44 rounded-2xl p-5 bg-white">
        <div className="w-full h-full flex flex-col justify-between bg-gray-100 rounded-lg p-4">
          {/* Picture and Name */}
          <div className="flex gap-2 items-center">
            {/* Picture */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={URLS.getImageUrl(user.picturePath)}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            {/* Name */}
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <h1 className="font-medium">
                  {user.firstName + " " + user.lastName}
                </h1>
                <img src={checkImage} alt="" className="w-4 object-contain" />
              </div>
              <span className=" text-gray-500 text-xs">@{user.firstName}</span>
            </div>
          </div>
          {/* Following Follower Details */}
          <div className="flex justify-between items-center">
            {userDetails.map((userDetail, index) => (
              <div key={index} className="flex flex-col items-center">
                <h2 className="h-5 font-medium">
                  {formatNumber(userDetail.count)}
                </h2>
                <span className="h-5 text-gray-500 text-xs">
                  {userDetail.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* App Menu and Fields */}
      <div className="w-full bg-white mt-3 rounded-2xl p-3">
        {menuBarDetials.map((detail, index) => (
          <div
            onClick={() => makeActiveMenuBar(detail.title)}
            key={index}
            className={`flex gap-5 px-4 py-2 cursor-pointer ${
              detail.isActive ? "" : "hover:bg-blue-100"
            } transition-all duration-500 rounded-lg ${
              detail.isActive ? "bg-blue-500" : ""
            }`}
          >
            <detail.Icon
              size={20}
              className={`${
                detail.isActive ? "text-white" : "text-gray-600"
              } transition-all duration-500 `}
            />
            <h1
              className={`${
                detail.isActive ? "text-white" : "text-gray-600"
              } transition-all duration-500`}
            >
              {detail.title}
            </h1>
          </div>
        ))}
        <span className="bg-gray-300 h-[1px] w-full my-5 block"></span>
        {/* Liked Pages */}
        <div>
          <h1 className="text-gray-500 text-xs tracking-widest uppercase my-1">
            Pages you like
          </h1>
          {likedPages.map((detail, index) => (
            <div
              onClick={() => makeActiveMenuBar(detail.title)}
              key={index}
              className={`flex gap-2 hover:scale-[1.05] hover:text-blue-500 py-2 cursor-pointer transition-all duration-300`}
            >
              <div className={` `}>
                <img src={logo} alt="" className="w-8" />
              </div>
              <h1
                className={`font-medium overflow-hidden text-ellipsis whitespace-nowrap w-full`}
              >
                {detail.title}
              </h1>
            </div>
          ))}
          <button className="text-xs capitalize text-gray-600 my-0.5 hover:text-blue-500 transition-all duration-300 mb-2">
            view all
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 py-5">
        <span className="text-xs text-gray-500 h-0 ">Privacy Terms</span>
        <span className="text-xs text-gray-500 h-0 ">Advertising</span>
        <span className="text-xs text-gray-500 h-0 ">Cookies</span>
        <span className="text-xs text-gray-500 h-0 ">Paltform @ 2023</span>
      </div>
     
    </div>
  );
};

export default Sidebar;
