import Button from "./Button";
import { useState } from "react";

export default function NewComment({ onAdd }) {
  const [enteredComment, setEnteredComment] = useState('');

  function handleChange(event) {
    setEnteredComment(event.target.value);
  }

  function handleClick() {
    if(enteredComment.trim()===''){
        return;
    }
    onAdd(enteredComment);
    setEnteredComment('');
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredComment}
      />
      <button
        className="px-4 py-2 text-xs md:text-base rouded-md bg-blue-900 text-stone-50 hover:bg-blue-800 hover:text-stone-100"
        onClick={handleClick}
      >
        Add Comment
      </button>
    </div>
  );
}
