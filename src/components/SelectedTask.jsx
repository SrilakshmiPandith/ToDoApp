import { useRef } from "react";
import Comments from "./Comments";

export default function SelectedTask({ task, onDelete, onUpdate, onAddComment, onDeleteComment, comments}) {
    const statusNew = useRef();
  const statusInprogress = useRef();
  const statusCompleted = useRef();
    
  function handleUpdate(){
    const newStatus = statusNew.current.checked;
    const inprogStatus = statusInprogress.current.checked;
    const completeStatus = statusCompleted.current.checked;

    let status = "New";
    if(inprogStatus){
        status = "In-progress";
    }else if(completeStatus){
        status = "Completed";
    }else if(newStatus){
        status = "New";
    }
    onUpdate(task.id,status);

  }

  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  let commentsArr = comments.filter((comment) => comment.taskId===task.id);
  //console.log(commentsArr);
  return (
    <div className="w-[35rem] mt-16 px-8 lg:grow-0 flex-grow">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            {task.title}
          </h1>
          <p className="text-stone-600 whitespace-pre-wrap">Status: {task.status}</p>
          <button
            className="px-6 py-2 rounded-md bg-blue-800 text-stone-50 hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button className="text-stone-600 hover:text-stone-950"
          onClick = {onDelete}>
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{task.description}</p>
      </header>
      <h2 className="text-2xl font-bold uppercase text-blue-700 mb-4">Change Status</h2>
        <span className="flex flex-row gap-1">
        <input ref={statusNew} type="radio" name="status" id="new" value="new" />
        <label>New</label>
        <input
          ref={statusInprogress}
          type="radio"
          name="status"
          id="inprogress"
          value="inprogress"
        />
        <label>In-progress</label>
        <input
          ref={statusCompleted}
          type="radio"
          name="status"
          id="completed"
          value="completed"
        />
        <label>Completed</label>
      </span>
      <Comments onAdd={onAddComment} onDelete={onDeleteComment} comments={commentsArr} />
    </div>
  );
}
