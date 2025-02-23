import { Tab, Tabs, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';
import ThemeToggleButton from '../context/themeContext/ThemeToggleButton';
import { useTheme } from '../context/themeContext/ThemeProvider';

const Sidebar = () => {
    const { theme } = useTheme()
    return (
        <div className="w-48 bg-gray-200 rounded-3xl shadow-[inset_0px_0px_10px_rgba(0.5,0.5,0.5,0.5)]  border border-gray-200 p-4 flex flex-col items-center h-[95vh] fixed">
            {/* Profile Section */}
            <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center mb-2">
                <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="" />
            </div>
            <Link to="/">
                <h1 className="text-xl font-bold text-gray-800">TaskOracle</h1>
            </Link>
            <p className="text-[10px] text-gray-500">Your Task BUDDY</p>

            {/* Tabs */}
            <div className="flex justify-between w-full mt-2">
                <button className="flex-1 text-center text-xs py-1 bg-gray-300 rounded-l-xl">All</button>
                <button className="flex-1 text-center text-xs py-1 bg-gray-300">New</button>
                <button className="flex-1 text-center text-xs py-1 bg-gray-300 rounded-r-xl">Done</button>
            </div>

            <Tabs>
                <TabList className="flex flex-col gap-2 mt-3">
                    <Tab
                        className="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-lg hover:shadow-none border border-gray-200 text-gray-800 text-center"
                        selectedClassName="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-none hover:shadow-lg border border-gray-200 text-gray-800 text-center"
                    >
                        <Link to="create-task">+ Add Task</Link>
                    </Tab>

                    <Tab
                        className="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-lg hover:shadow-none border border-gray-200 text-gray-800 text-center"
                        selectedClassName="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-none hover:shadow-lg border border-gray-200 text-gray-800 text-center"
                    >
                        <Link to="">Tasks</Link>
                    </Tab>

                    {/* <Tab
                        className="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-lg hover:shadow-none border border-gray-200 text-gray-800 text-center"
                        selectedClassName="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-none hover:shadow-lg border border-gray-200 text-gray-800 text-center"
                    >
                        <Link to="todo">To-Do</Link>
                    </Tab>

                    <Tab
                        className="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-lg hover:shadow-none border border-gray-200 text-gray-800 text-center"
                        selectedClassName="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-none hover:shadow-lg border border-gray-200 text-gray-800 text-center"
                    >
                        <Link to="progress">In-Progress</Link>
                    </Tab>

                    <Tab
                        className="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-lg hover:shadow-none border border-gray-200 text-gray-800 text-center"
                        selectedClassName="w-full py-2 px-8 my-2 -mb-[0.5px] bg-white rounded-full shadow-none hover:shadow-lg border border-gray-200 text-gray-800 text-center"
                    >
                        <Link to="done">Done</Link>
                    </Tab> */}

                </TabList>
            </Tabs>

            <div className='mt-auto'>
                <div className='flex items-center gap-2 mb-3'>
                    <ThemeToggleButton /><span>{theme === "light" ? "Dark Mod?" : "Light Mod?"}</span>
                </div>
                <button className="w-full py-2 px-12 bg-red-600 rounded-full shadow-lg border border-gray-200 text-white">Log Out</button>
            </div>
            <small className='text-[10px] mt-2'>© SRity</small>
        </div >
    );
};

export default Sidebar;