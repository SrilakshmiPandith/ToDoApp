import { RxHamburgerMenu } from "react-icons/rx";
import Button from "./Button";
import { useState } from "react";

export default function NavBar({
  onAddTask,
  tasks,
  onSelectTask,
  selectedTaskId,
}) {
  const [active, setActive] = useState(" ");
  function handleSet(type) {
    console.log(type);
    setActive(type);
  }

  const types = ["New", "In-progress", "Completed"];
  const typeCount = {
    New: tasks.filter((task) => task.status === "New").length,
    "In-progress": tasks.filter((task) => task.status === "In-progress").length,
    Completed: tasks.filter((task) => task.status === "Completed").length,
  };

  let content = <p className="text-white text-l px-2 py-1">Please select any task type to see the list of tasks</p>

  let filteredTasks = tasks.filter((task) => {
    return task.status === active;
    })
    if(filteredTasks.length===0 && active!==" "){
        content = <p className="text-white text-l px-2 py-1">No Tasks found under the task type <em>{active}</em>, please add/update existing tasks.</p>
    }
    if(filteredTasks.length!==0){
        content=filteredTasks.map((task)=>{
            let cssClasses =
                    "w-[86%] text-left ml-8 px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-blue-900";
                  if (task.id === selectedTaskId) {
                    cssClasses += " bg-blue-900 text-stone-200";
                  } else {
                    cssClasses += " text-stone-100";
                  }
            return(<ul key={Math.random()}>
                        <li key={task.id} className="">
                          <button
                            onClick={() => onSelectTask(task.id)}
                            className={cssClasses}
                          >
                            {task.title}
                          </button>
                        </li>
            </ul>
        )})
    }
  return (
    <div className="px-8 py-4">
      <Button onClick={onAddTask}>+ Add Task</Button>
      <div className="sticky top-0 z-10">
      <ul className="flex justify-between py-2">
        {types.map((type, index) => {
          let classes =
            "w-full text-left text-white px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-blue-900";
          if (type === active) {
                 classes += " bg-blue-900 text-stone-200";
               }
          return (
            <div key={type} className="sticky top-0 z-10">
              <li key={type}>
                <button className={classes} onClick={() => handleSet(type)}>
                <div className="flex justify-between">
                  <span className="mr-px">{type}</span>
                  <p className="pl-2 ml-px bg-stone-200 w-10 rounded-md text-blue-900 font-bold">{typeCount[type]}</p>
                  </div>
                </button>
                
              </li>
            </div>
          );
        })}
      </ul>
      <nav className="h-20 w-full overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-blue-900">
        {content}
      </nav>
      </div>
    </div>
  );
}
