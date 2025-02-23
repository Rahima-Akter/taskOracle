import { Outlet } from "react-router-dom";
import ActivityLog from "../components/ActivityLog";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="w-full min-h-screen bg-[#ccd0c8] dark:bg-[#68777f] p-6 flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full pl-52 gap-5 mt-1">
        <div className="">
          <Outlet />
        </div>
        <div className="mt-auto mb-2 fixed bottom-0 right-4 left-56">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;