import TodoCard from '../CategoryCards/TodoCard';
import axios from "axios"
import { useEffect, useState } from "react";
import { HashLoader } from 'react-spinners'
import { IoIosCloseCircle } from "react-icons/io";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast'
import useTasks from '../../hooks/useTasks';

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [detail, setDetail] = useState('')
    const [tasks, isLoading, refetch] = useTasks();

    useEffect(() => {
        const filter = tasks.filter(todo => todo.category === 'todo')
        setTodos(filter)
    }, [tasks])

    const handleModal = (id) => {
        const singleDetail = tasks.find(detail => detail._id === id)
        setDetail(singleDetail)
        document.getElementById('my_modal_5').showModal()
    }

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const deleted = todos.filter(deleted => deleted._id !== id)
                    setTodos(deleted)
                    const { data } = await axios.delete(`${import.meta.env.VITE_LOCAL_HOST}/delete-single-task/${id}`)
                    if (data.insertedId) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const handleInProgress = async (id) => {
        const { data } = await axios.patch(`${import.meta.env.VITE_LOCAL_HOST}/in-progress/${id}`)
        if (data.modifiedCount) {
            toast.success('Task is in progress')
            refetch()
        } else {
            toast.error('something went wrong! please try again')
        }
    }

    if (isLoading) return <div className='flex justify-center items-center text-cyan-400 mt-44'><HashLoader size={70} color='#0fcfd5' /></div>

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 lg:max-h-[390px] overflow-y-auto rounded-3xl overflow-x-hidden'>

                {
                    todos.length === 0 ? <div className='col-span-5 mt-2'>
                        <img src="https://media.tenor.com/PKVtuCZ-gXcAAAAM/inanimate-insanity-ii.gif" className='w-[92%] h-[85%] rounded-lg mx-auto' alt="" />
                    </div> : (
                        todos.map(todo => <TodoCard key={todo._id} todo={todo} handleModal={handleModal} handleDelete={handleDelete} handleInProgress={handleInProgress} />)
                    )
                }

            </div>

            {/*  modal */}
            <dialog id="my_modal_5" className="modal modal-middle backdrop-blur-lg">
                <div className="modal-box relative">
                    <div className='text-black text-center bg-[#eaeadd] w-full h-full rounded-lg py-2 px-4 space-y-2'>
                        <h2 className='font-bold text-black text-2xl capitalize'>{detail.title}</h2>
                        <p className='font-normal'>{detail.description}</p>
                        <p className='font-bold text-lg'>Due Date: <span className='text-sm'>{detail.dueDate}</span></p>
                    </div>

                    <form method="dialog">
                        <button className="absolute border-none text-2xl cursor-pointer top-4 right-4"><IoIosCloseCircle /></button>
                    </form>

                </div>
            </dialog>

        </>
    );
};

export default Todo;