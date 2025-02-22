import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddTaskForm = () => {
    const email = 'asdfs@gmail.com';
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }
        const taskData = { title, description, dueDate, email, category: 'todo', createdAt: new Date().toISOString() }

        try {
            const response = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/tasks`, taskData);
            console.log(response.data)
            if (response.data.insertedId) {
                toast.success('task added to the list')
            } else {
                toast.error('something went wrong! please try again later')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="w-full h-full bg-gray-200 rounded-[30px] shadow-2xl p-5 flex flex-col items-center">
            <h2 className="text-2xl font-extrabold text-gray-600 drop-shadow-md">Add A Task</h2>
            <form onSubmit={handleSubmit} className="w-full flex flex-col mt-4">
                <div className="flex flex-row gap-5">
                    {/* Title Input */}
                    <div className="md:w-1/2">
                        <label className="text-gray-900 font-medium">Title</label>
                        <input
                            type="text"
                            maxLength={50}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-2 bg-gray-200 shadow-[inset_0px_0px_12px_rgba(0.2,0.2,0.2,0.5)] rounded-xl mt-1 focus:outline-none font-normal"
                        />
                    </div>

                    {/* Due Date Input */}
                    <div className="md:w-1/2">
                        <label className="text-gray-900 font-medium mt-3">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            required
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-2 bg-gray-200 shadow-[inset_0px_0px_12px_rgba(0.2,0.2,0.2,0.5)] rounded-xl mt-1 focus:outline-none font-normal"
                        />
                    </div>
                </div>

                {/* Description Input */}
                <label className="text-gray-900 font-medium mt-3">Description</label>
                <textarea
                    maxLength={200}
                    value={description}
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 bg-gray-200 shadow-[inset_0px_0px_12px_rgba(0.2,0.2,0.2,0.5)] rounded-xl mt-1 focus:outline-none font-normal"
                ></textarea>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-5 py-3 bg-gray-200 text-gray-600 font-bold uppercase rounded-xl transition shadow-[rgba(0,0,0,0.35)_0px_3px_7px] hover:shadow-[inset_2px_2px_7px_rgba(0,0,0,0.5)]"
                >
                    + Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTaskForm;
