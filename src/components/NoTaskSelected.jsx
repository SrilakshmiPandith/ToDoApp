import tasklist  from '../assets/todo.png';
import Button from './Button';

export default function NoTaskSelected({onAddTask}){
    return(
        <div className="mt-24 text-center w-2/3 px-8 lg:grow-0 flex-grow">
            <img src={tasklist} alt="empty task list" className="w-16 h-16 object-contain mx-auto" />
            <h2 className="text-xl font-bold text-stone-500 my-4">No Task Selected</h2>
            <p className="text-stone-400 mb-4">Select a task or create a new task</p>
            <p className="mt-8">
                <Button onClick={onAddTask}>Create new task</Button>
            </p>
        </div>
    );
}