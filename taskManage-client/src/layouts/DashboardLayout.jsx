import { Outlet } from "react-router-dom";
import ActivityLog from "../components/ActivityLog";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ThemeToggleButton from "../context/themeContext/ThemeToggleButton";

const DashboardLayout = () => {
  const [show, setShow] = useState(false)
  const handleShowHide = () => {
    setShow(!show)
  }
  return (
    <div className="w-full min-h-screen bg-[#dbdfd8] dark:bg-black md:p-6 flex md:flex-row flex-col">
      <div onClick={handleShowHide} className="md:hidden block">
        {
          !show ? <FaBars className="absolute top-4 left-4 text-black dark:text-white text-2xl" /> : <IoMdClose className="fixed top-4 z-50 left-3 mb-2 text-black dark:text-white text-2xl" />
        }
      </div>
      <div className={`md:block ${show ? 'block' : 'hidden'}`}>
        <Sidebar className="relative" />
      </div>

      <div className="flex flex-col w-full lg:pl-52 md:pl-72 p-6 md:p-0 gap-5 md:mt-1 mt-8">
        <Outlet />
        <div className="mt-auto mb-2 fixed bottom-0 right-4 lg:left-56 md:left-[260px] md:block hidden">
          <ActivityLog />
        </div>
      </div>
      <ThemeToggleButton />
    </div>
  );
};

export default DashboardLayout;