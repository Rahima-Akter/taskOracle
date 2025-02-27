import { Tab, Tabs, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Sidebar = () => {
    const { logOut, user } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div className="lg:w-48 md:w-64 w-56 bg-gray-200 dark:bg-gray-500 dark:border-none md:rounded-3xl shadow-[inset_0px_0px_10px_rgba(0.5,0.5,0.5,0.5)]  border border-gray-200 p-4 pt-6 flex flex-col items-center md:h-[95vh] h-screen fixed z-40">
            {/* Profile Section */}
            <div className="w-20 h-20 rounded-full bg-gray-400 ring-2 dark:ring-white ring-gray-500 flex items-center justify-center mb-2">
                {
                    user.photoURL ? <img src={user?.photoURL} className="w-full h-full object-cover rounded-full" alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" className="w-full h-full object-cover rounded-full" alt="" />
                }
            </div>
            <Link to="/">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">TaskOracle</h1>
            </Link>
            <p className="text-[10px] text-gray-500 dark:text-gray-200">Your Task BUDDY</p>

            {/* Tabs */}
            <div className="flex justify-between w-full mt-2">
                <button className="flex-1 text-center text-xs py-1 bg-gray-300 rounded-l-xl">All</button>
                <button className="flex-1 text-center text-xs py-1 bg-gray-300">New</button>
                <button className="flex-1 text-center text-xs py-1 bg-gray-300 rounded-r-xl">Done</button>
            </div>


            <div className='flex flex-col gap-1 mt-3'>
                <NavLink to="create-task"
                    className={({ isActive }) => `w-full py-2 px-8 my-2 -mb-[0.5px] rounded-full ${isActive ? "bg-white dark:bg-gray-500 font-bold dark:text-white shadow-none hover:shadow-lg dark:hover:shadow-white border border-gray-200 text-gray-800 text-center" : "bg-white shadow-lg hover:shadow-none border border-gray-200 text-gray-800 text-center"}`}
                >
                    + Add Task
                </NavLink>

                <NavLink to=""
                    end
                    className={({ isActive }) => `w-full py-2 px-8 my-2 -mb-[0.5px] rounded-full ${isActive ? "bg-white dark:bg-gray-500 font-bold dark:text-white shadow-none hover:shadow-lg dark:hover:shadow-white border border-gray-200 text-gray-800 text-center" : "bg-white shadow-lg hover:shadow-none border border-gray-200 text-gray-800 text-center"}`}
                >
                    Tasks
                </NavLink>
            </div>


            <div className='mt-auto'>
                <button onClick={() => { logOut(); navigate("/") }} className="w-full py-2 px-12 bg-white rounded-full shadow-lg border border-gray-200 text-black text-sm">Log Out</button>
            </div>
            <small className='text-[10px] mt-2'>© SRiTY</small>
        </div >
    );
};

export default Sidebar;