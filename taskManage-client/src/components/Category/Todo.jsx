import TodoCard from '../CategoryCards/TodoCard';

const Todo = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:max-h-[390px] overflow-y-auto rounded-3xl'>
            <TodoCard/>
            <TodoCard/>
            <TodoCard/>
            <TodoCard/>
            <TodoCard/>
            <TodoCard/>
            <TodoCard/>
            <TodoCard/>
        </div>
    );
};

export default Todo;