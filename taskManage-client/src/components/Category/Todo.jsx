import TodoCard from '../CategoryCards/TodoCard';
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useContext, useState } from "react";
import { HashLoader } from 'react-spinners'
import { AuthContext } from '../../providers/AuthProvider'
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Todo = () => {
    const [detail, setDetail] = useState('')
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_LOCAL_HOST}/tasks/${user?.email}`)
            return data;
        }
    });

    const todos = tasks.filter(todo => todo.category === 'todo')

    const handleModal = (id) => {
        const singleDetail = tasks.find(detail => detail._id === id)
        setDetail(singleDetail)
        document.getElementById('my_modal_5').showModal()
    }

    if (isLoading) return <div className='flex justify-center items-center text-cyan-400 mt-44'><HashLoader size={70} color='#0fcfd5' /></div>

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:max-h-[390px] overflow-y-auto rounded-3xl'>

                {
                    todos.length === 0 ? <p>no item to show</p> : (
                        todos.map(todo => <TodoCard key={todo._id} todo={todo} handleModal={handleModal} />)
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