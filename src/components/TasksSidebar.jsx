import Button from "./Button";
import { useEffect, useState } from "react";


export default function TasksSidebar({
  onAddTask,
  tasks,
  onSelectTask,
  selectedTaskId,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  // const [typeCount, setTypeCount] = useState({New:0, "In-progress":0, Completed:0});
  const [open, SetOpen] = useState(false);
  function handleClick(index) {
    setActiveIndex(index === activeIndex ? -1 : index);
  }

  const types = ["New", "In-progress", "Completed"];
  const typeCount = {
    New: tasks.filter((task) => task.status === "New").length,
    "In-progress": tasks.filter((task) => task.status === "In-progress").length,
    Completed: tasks.filter((task) => task.status === "Completed").length,
  };
  // useEffect(()=>{
  //   let count=JSON.parse(JSON.stringify(typeCount));
  //   if(tasks && tasks.length){
      
  //     tasks.forEach(task => count[task.status]++);
  //   }
  //   setTypeCount(count);
  // },[tasks]);
  return (
    <>
    <aside className="hidden h-dvh md:flex flex-col px-8 py-16 bg-blue-600 text-red-100 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Tasks
      </h2>
      <div>
        <Button onClick={onAddTask}>+ Add Task</Button>
      </div>
      <ul>
        {types.map((type, index) => {
          let classes =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-blue-900";
          if (index === activeIndex) {
            classes += " bg-blue-900 text-stone-200";
          }
          return (
            <li key={type}>
              <button className={classes} onClick={() => handleClick(index)}>
                <div className="flex justify-between">
                  {type}
                  <p className="pl-2 bg-stone-200 w-10 rounded-md text-blue-900 font-bold">{typeCount[type]}</p>
                </div>
              </button>
              {tasks
                .filter((task) => {
                  return task.status === type;
                })
                .map((task) => {
                  let cssClasses =
                    "w-[86%] text-left ml-8 px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-blue-900";
                  if (task.id === selectedTaskId) {
                    cssClasses += " bg-blue-900 text-stone-200";
                  } else {
                    cssClasses += " text-stone-100";
                  }
                  return (
                    <ul key={Math.random()}>
                      {index === activeIndex && (
                        <li key={task.id}>
                          <button
                            onClick={() => onSelectTask(task.id)}
                            className={cssClasses}
                          >
                            {task.title}
                          </button>
                        </li>
                      )}
                    </ul>
                  );
                })}
            </li>
          );
        })}
      </ul>
    </aside>
    </>
  );
}
