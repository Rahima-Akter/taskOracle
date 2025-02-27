import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HashLoader } from 'react-spinners';
import { IoIosCloseCircle } from "react-icons/io";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useTasks from '../hooks/useTasks';
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { VscDebugStart } from "react-icons/vsc";
import { MdOutlineDoneOutline } from "react-icons/md";

// Drag and Drop imports
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Tasks = () => {
  const [tasks, todoTask, progressTask, doneTask, isLoading, refetch] = useTasks();
  const navigate = useNavigate();
  const [todos, setTodos] = useState(todoTask || []);
  const [progresses, setProgresses] = useState(progressTask || []);
  const [doneTasks, setDoneTasks] = useState(doneTask || []);
  const [detail, setDetail] = useState('');

  const prevTodosRef = useRef();
  const prevProgressesRef = useRef();
  const prevDoneTasksRef = useRef();

  useEffect(() => {
    // Only update state if data has changed (use refs to store previous data)
    if (JSON.stringify(todoTask) !== JSON.stringify(prevTodosRef.current)) {
      setTodos(todoTask);
      prevTodosRef.current = todoTask;
    }

    if (JSON.stringify(progressTask) !== JSON.stringify(prevProgressesRef.current)) {
      setProgresses(progressTask);
      prevProgressesRef.current = progressTask;
    }

    if (JSON.stringify(doneTask) !== JSON.stringify(prevDoneTasksRef.current)) {
      setDoneTasks(doneTask);
      prevDoneTasksRef.current = doneTask;
    }
  }, [todoTask, progressTask, doneTask]);

  const handleModal = (id) => {
    const singleDetail = tasks.find(detail => detail._id === id);
    setDetail(singleDetail);
    document.getElementById('my_modal_5').showModal();
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
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deletedTodo = todos.filter(deleted => deleted._id !== id);
          setTodos(deletedTodo);
          const deletedProgress = progresses.filter(deleted => deleted._id !== id);
          setProgresses(deletedProgress);
          const deletedDone = doneTasks.filter(deleted => deleted._id !== id);
          setDoneTasks(deletedDone);

          const { data } = await axios.delete(`${import.meta.env.VITE_LOCAL_HOST}/delete-single-task/${id}`);
          if (data.insertedId) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInProgress = async (id, category) => {
    const { data } = await axios.patch(`${import.meta.env.VITE_LOCAL_HOST}/${category}/${id}`);
    if (data.modifiedCount) {
      toast.success(`Task moved to ${category}`);
      refetch();
    } else {
      toast.error('something went wrong! please try again');
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    // If dropped outside the list or no move (same index)
    if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
      return;
    }

    const movedTaskId = result.draggableId;
    let newCategory = destination.droppableId;

    // Reorganize the tasks in the UI
    const updatedTodos = [...todos];
    const updatedProgresses = [...progresses];
    const updatedDoneTasks = [...doneTasks];

    let movedTask;

    // Handle reordering within the same category (source === destination)
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "todo") {
        movedTask = updatedTodos.splice(source.index, 1)[0];
        updatedTodos.splice(destination.index, 0, movedTask); // Reorder within the same category
      } else if (source.droppableId === "in-progress") {
        movedTask = updatedProgresses.splice(source.index, 1)[0];
        updatedProgresses.splice(destination.index, 0, movedTask); // Reorder within the same category
      } else if (source.droppableId === "done") {
        movedTask = updatedDoneTasks.splice(source.index, 1)[0];
        updatedDoneTasks.splice(destination.index, 0, movedTask); // Reorder within the same category
      }
    } else {
      // If tasks are moved to different categories
      if (source.droppableId === "todo") {
        movedTask = updatedTodos.splice(source.index, 1)[0];
        if (newCategory === "in-progress") updatedProgresses.splice(destination.index, 0, movedTask);
        if (newCategory === "done") updatedDoneTasks.splice(destination.index, 0, movedTask);
      } else if (source.droppableId === "in-progress") {
        movedTask = updatedProgresses.splice(source.index, 1)[0];
        if (newCategory === "todo") updatedTodos.splice(destination.index, 0, movedTask);
        if (newCategory === "done") updatedDoneTasks.splice(destination.index, 0, movedTask);
      } else if (source.droppableId === "done") {
        movedTask = updatedDoneTasks.splice(source.index, 1)[0];
        if (newCategory === "todo") updatedTodos.splice(destination.index, 0, movedTask);
        if (newCategory === "in-progress") updatedProgresses.splice(destination.index, 0, movedTask);
      }
    }

    // Update the states with the new task order
    setTodos(updatedTodos);
    setProgresses(updatedProgresses);
    setDoneTasks(updatedDoneTasks);

    // Optionally refetch tasks from the backend
    try {
      await axios.patch(`${import.meta.env.VITE_LOCAL_HOST}/update-categories/${movedTaskId}`, { category: newCategory });
      toast.success('Task moved successfully!');
    } catch (error) {
      console.error("Error updating task category:", error);
      toast.error('An error occurred while moving the task.');
    }
  };


  if (isLoading) return <div className='flex justify-center items-center text-cyan-400 mt-44'>
    <HashLoader size={70} color='#0fcfd5' />
  </div>

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-lg">
        {/* Todo */}
        <Droppable droppableId="todo">
          {(provided) => (
            <div className="bg-[#eaeadd] dark:bg-gray-500 rounded-lg shadow-lg px-4 pt-5 pb-8 gap-1 flex flex-col items-center" ref={provided.innerRef} {...provided.droppableProps}>
              <h1 className="text-center font-bold text-black dark:text-white text-xl mb-2">To-Do</h1>
              {
                todos.length === 0 ? <p className="font-bold text-black text-lg text-center mt-5">NO TASK TO SHOW</p> :
                  todos.map((todo, index) => (
                    <Draggable key={todo._id} draggableId={todo._id} index={index}>
                      {(provided) => (
                        <div className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-950 dark:text-white shadow-lg lg:px-2 px-4 lg:py-2 py-3 w-full flex flex-row justify-between items-center"
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p className={`${new Date().setHours(0, 0, 0, 0) > new Date(todo.dueDate).setHours(0, 0, 0, 0) ? "text-red-500" : ""} lg:text-sm text-lg`}>{todo.title.slice(0, 18)}</p>
                          <div className="flex items-center space-x-2 text-lg">
                            <FaEye onClick={() => handleModal(`${todo._id}`)} />
                            <FaRegEdit onClick={() => navigate(`/dashboard/update/${todo._id}`)} />
                            <AiOutlineDelete onClick={() => handleDelete(`${todo._id}`)} />
                            <VscDebugStart onClick={() => handleInProgress(`${todo._id}`, "in-progress")} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* In Progress */}
        <Droppable droppableId="in-progress">
          {(provided) => (
            <div className="bg-[#eaeadd] dark:bg-gray-500 rounded-lg shadow-lg px-4 py-5 flex flex-col items-center gap-1" ref={provided.innerRef} {...provided.droppableProps}>
              <h1 className="text-center font-bold text-black dark:text-white text-xl mb-2">In-Progress</h1>
              {
                progresses.length === 0 ? <p className="font-bold text-black text-lg text-center mt-5">NO TASK TO SHOW</p> :
                  progresses.map((progress, index) => (
                    <Draggable key={progress._id} draggableId={progress._id} index={index}>
                      {(provided) => (
                        <div className="bg-white hover:bg-gray-100 dark:hover:bg-gray-950 dark:bg-gray-800 dark:text-white shadow-lg lg:px-2 px-4 lg:py-1 py-3 w-full flex flex-row justify-between items-center"
                          ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p className={`${new Date().setHours(0, 0, 0, 0) > new Date(progress.dueDate).setHours(0, 0, 0, 0) ? "text-red-500" : ""}`}>{progress.title.slice(0, 18)}</p>
                          <div className="flex items-center space-x-2 text-lg">
                            <FaEye onClick={() => handleModal(`${progress._id}`)} />
                            <FaRegEdit onClick={() => navigate(`/dashboard/update/${progress._id}`)} />
                            <AiOutlineDelete onClick={() => handleDelete(`${progress._id}`)} />
                            <MdOutlineDoneOutline onClick={() => handleInProgress(`${progress._id}`, "done")} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Done */}
        <Droppable droppableId="done">
          {(provided) => (
            <div className="bg-[#eaeadd] dark:bg-gray-500 rounded-lg shadow-lg px-6 py-5 flex flex-col gap-1 items-center" ref={provided.innerRef} {...provided.droppableProps}>
              <h1 className="text-center font-bold text-black dark:text-white text-xl mb-2">Done</h1>
              {
                doneTasks.length === 0 ? <p className="font-bold text-black text-lg text-center mt-5">NO TASK TO SHOW</p> :
                  doneTasks.map((done, index) => (
                    <Draggable key={done._id} draggableId={done._id} index={index}>
                      {(provided) => (
                        <div className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-950 dark:text-white shadow-lg lg:px-2 px-4 lg:py-1 py-3 w-full flex flex-row justify-between items-center" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>{done.title.slice(0, 18)}</p>
                          <div className="flex items-center space-x-2 gap-1 text-lg">
                            <FaEye onClick={() => handleModal(`${done._id}`)} />
                            <FaRegEdit onClick={() => navigate(`/dashboard/update/${done._id}`)} />
                            <AiOutlineDelete onClick={() => handleDelete(`${done._id}`)} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-middle backdrop-blur-lg">
        <div className="modal-box relative bg-white">
          <div className='text-black text-center bg-[#eaeadd] w-full h-full rounded-lg py-2 px-4 space-y-2'>
            <h2 className='font-bold text-black lg:text-2xl text-xl capitalize'>{detail.title}</h2>
            <p className='font-normal'>{detail.description}</p>
            <p className='font-bold'>Due Date: <span className={`text-sm ${new Date().setHours(0, 0, 0, 0) > new Date(detail.dueDate).setHours(0, 0, 0, 0) ? "text-red-500" : "text-black"}`}>{detail.dueDate}</span></p>
          </div>
          <form method="dialog">
            <button className="absolute border-none text-2xl cursor-pointer top-4 right-4 text-black"><IoIosCloseCircle /></button>
          </form>
        </div>
      </dialog>
    </DragDropContext>
  );
};

export default Tasks;
