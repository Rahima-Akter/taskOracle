/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const DoneCard = ({done, handleModal, handleDelete}) => {
    const navigate = useNavigate()
    return (
        <div className="bg-[#a0bebb] rounded-3xl shadow-lg p-4 flex flex-col items-center w-52">

            {/* Task Name Placeholder */}
            <div className="w-full bg-[#6a8f8b] rounded-full py-1 mt-2">
                <p className="text-white text-lg font-bold text-center capitalize -mt-1">done</p>
            </div>

            {/* Task Details */}
            <div className="w-full flex justify-center items-center mt-2">
                <div onClick={()=> handleModal(`${done._id}`)} className="w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center mr-3 border-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100">
                    <span className="text-sm">🔍</span>
                </div>
                <div onClick={()=> handleDelete (`${done._id}`)} className="w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center mr-3 border-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100">
                    <span className="text-sm">⛔</span>
                </div>
                <div className="w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center mr-3 border-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100">
                    <span className="text-sm">↺</span>
                </div>
                {/* <div className="flex-1 h-8 bg-white rounded-xl shadow-[rgba(0,0,0,0.35)_0px_5px_15px]"></div> */}
            </div>

            {/* Task List */}
            <div className="w-full bg-white rounded-xl shadow-[rgba(0,0,0,0.35)_0px_5px_15px] p-3 mt-2 mb-4">
                <h2 className="font-bold text-black">{done?.title}</h2>
                <ul className="mt-1 text-gray-600 text-xs">
                    <p>{done?.description.slice(0, 20)}...</p>
                </ul>
                <h2 className="text-xs font-bold text-black mt-2">Due Date: <span>{done?.dueDate}</span></h2>
            </div>

            {/* Add Task Button */}
            <button onClick={()=> navigate('/dashboard')} className="w-full text-sm font-bold mt-auto py-1 bg-[#6a8f8b] text-white rounded-lg shadow-[rgba(5,0,5px,0.25)_0px_5px_1px] hover:shadow-white"
            >+ Add a New Task</button>
        </div>
    );
};

export default DoneCard;