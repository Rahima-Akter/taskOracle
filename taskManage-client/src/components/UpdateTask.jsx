import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
    const data = useLoaderData();
    const navigate = useNavigate()
    const { id } = useParams();
    const [title, setTitle] = useState(data.title || "");
    const [description, setDescription] = useState(data.description || "");
    const [dueDate, setDueDate] = useState(data.dueDate || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description, dueDate }

        try {
            const response = await axios.patch(`${import.meta.env.VITE_LOCAL_HOST}/task-by-id/${id}`, taskData);
            // console.log(response.data)
            if (response.data.modifiedCount) {
                toast.success('task updated successfully');
                navigate('/dashboard')
            } else {
                toast.error('something went wrong! please try again later')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="w-full h-full bg-[#e9dddd] dark:bg-gray-500 rounded-[30px] shadow-2xl p-5 flex flex-col items-center md:mt-0 mt-5">
            <h2 className="text-2xl font-extrabold text-gray-600 dark:text-white drop-shadow-md">Update Task</h2>
            <form onSubmit={handleSubmit} className="w-full flex flex-col mt-4">
                <div className="flex flex-col lg:flex-row gap-5">
                    {/* Title Input */}
                    <div className="lg:w-1/2">
                        <label className="text-gray-900 dark:text-white font-medium">Title</label>
                        <input
                            type="text"
                            maxLength={50}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 shadow-[inset_0px_0px_5px_rgba(0.7,0,0,0.5)] rounded-xl mt-1 focus:outline-none font-semibold"
                        />
                    </div>

                    {/* Due Date Input */}
                    <div className="lg:w-1/2">
                        <label className="text-gray-900 dark:text-white font-medium mt-3">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-2 shadow-[inset_0px_0px_5px_rgba(0.7,0,0,0.5)] rounded-xl mt-1 focus:outline-none font-semibold"
                        />
                    </div>
                </div>

                {/* Description Input */}
                <label className="text-gray-900 dark:text-white font-medium mt-3">Description</label>
                <textarea
                    maxLength={200}
                    value={description}
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 shadow-[inset_0px_0px_5px_rgba(0.7,0,0,0.5)] rounded-xl mt-1 focus:outline-none font-semibold"
                ></textarea>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-5 py-3 bg-gray-200 text-gray-600 font-bold uppercase rounded-xl transition shadow-[rgba(0,0,0,0.35)_0px_3px_7px] hover:shadow-[inset_2px_2px_7px_rgba(0,0,0,0.5)]"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default UpdateTask;
