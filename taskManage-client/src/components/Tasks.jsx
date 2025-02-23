/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { IoIosCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useTasks from "../hooks/useTasks";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useDrag, useDrop } from "react-dnd"; // Import hooks for drag-and-drop

const Tasks = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [progresses, setProgresses] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [detail, setDetail] = useState("");
    const [tasks, isLoading, refetch] = useTasks();

    useEffect(() => {
        const filter = tasks.filter((todo) => todo.category === "todo");
        setTodos(filter);
        const progress = tasks.filter((todo) => todo.category === "in-progress");
        setProgresses(progress);
        const done = tasks.filter((todo) => todo.category === "done");
        setDoneTasks(done);
    }, [tasks]);

    const handleModal = (id) => {
        const singleDetail = tasks.find((detail) => detail._id === id);
        setDetail(singleDetail);
        document.getElementById("my_modal_5").showModal();
    };

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const deletedTodo = todos.filter((deleted) => deleted._id !== id);
                    setTodos(deletedTodo);
                    const deletedProgress = progresses.filter(
                        (deleted) => deleted._id !== id
                    );
                    setProgresses(deletedProgress);
                    const deletedDone = doneTasks.filter((deleted) => deleted._id !== id);
                    setDoneTasks(deletedDone);

                    const { data } = await axios.delete(
                        `${import.meta.env.VITE_LOCAL_HOST}/delete-single-task/${id}`
                    );
                    if (data.insertedId) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                        refetch();
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleInProgress = async (id, category) => {
        const { data } = await axios.patch(
            `${import.meta.env.VITE_LOCAL_HOST}/${category}/${id}`
        );
        if (data.modifiedCount) {
            toast.success(`Task is in ${category}`);
            refetch();
        } else {
            toast.error("something went wrong! please try again");
        }
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "ITEM",
        drop: (item) => handleInProgress(item._id, item.category),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    if (isLoading)
        return (
            <div className="flex justify-center items-center text-cyan-400 mt-44">
                <HashLoader size={70} color="#0fcfd5" />
            </div>
        );

    const TaskItem = ({ task, category }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "ITEM",
            item: { _id: task._id, category },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }));

        return (
            <div
                ref={drag}
                className="items bg-white dark:text-white dark:bg-[#3e5262] shadow-lg px-2 py-1 w-full flex flex-row justify-between items-center"
            >
                <p>{task.title}</p>
                <div className="flex items-center gap-3">
                    <FaEye onClick={() => handleModal(`${task._id}`)} className="cursor-pointer hover:text-gray-500" />
                    <FaRegEdit onClick={() => navigate(`/dashboard/update/${task._id}`)} className="cursor-pointer hover:text-gray-500" />
                    <AiOutlineDelete onClick={() => handleDelete(`${task._id}`)} className="cursor-pointer hover:text-gray-500" />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div
                ref={drop}
                className="min-h-[370px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 rounded-lg"
            >
                {/* To-Do Section */}
                <div className="bg-[#eaeadd] rounded-lg shadow-lg px-4 py-5 flex flex-col items-center">
                    <h1 className="text-center font-bold text-red-500 text-xl mb-2">To-Do</h1>
                    <div className="flex flex-col gap-2 w-full">
                        {todos.map((todo) => (
                            <TaskItem key={todo._id} task={todo} category="todo" />
                        ))}
                    </div>
                </div>

                {/* In-Progress Section */}
                <div className="bg-[#F4A8A3] rounded-lg shadow-lg px-4 py-5 flex flex-col items-center">
                    <h1 className="text-center font-bold text-white text-xl mb-2">In-Progress</h1>
                    <div className="flex flex-col gap-2 w-full">
                        {progresses.map((progress) => (
                            <TaskItem key={progress._id} task={progress} category="in-progress" />
                        ))}
                    </div>
                </div>

                {/* Done Section */}
                <div className="bg-[#a0bebb] min-h-full rounded-lg shadow-lg px-6 py-5 flex flex-col items-center">
                    <h1 className="text-center font-bold text-white text-xl mb-2">Done</h1>
                    <div className="flex flex-col gap-2 w-full">
                        {doneTasks.map((done) => (
                            <TaskItem key={done._id} task={done} category="done" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <dialog id="my_modal_5" className="modal modal-middle backdrop-blur-lg">
                <div className="modal-box relative">
                    <div className="text-black text-center bg-[#eaeadd] w-full h-full rounded-lg py-2 px-4 space-y-2">
                        <h2 className="font-bold text-black text-2xl capitalize">{detail.title}</h2>
                        <p className="font-normal">{detail.description}</p>
                        <p className="font-bold text-lg">
                            Due Date: <span className="text-sm">{detail.dueDate}</span>
                        </p>
                    </div>

                    <form method="dialog">
                        <button className="absolute border-none text-2xl cursor-pointer top-4 right-4">
                            <IoIosCloseCircle />
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Tasks;
