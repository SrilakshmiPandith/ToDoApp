import { useRef } from "react";
import Inp from "./Inp";
import Modal from "./Modal";

export default function NewTask({ onAdd, onCancel }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const statusNew = useRef();
  const statusInprogress = useRef();
  const statusCompleted = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;
    const newStatus = statusNew.current.checked;
    const inprogStatus = statusInprogress.current.checked;
    const completeStatus = statusCompleted.current.checked;

    let status = "New";
    if (inprogStatus) {
      status = "In-progress";
    } else if (completeStatus) {
      status = "Completed";
    } else if (newStatus) {
      status = "New";
    }

    //console.log(status);

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
      status: status,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCap="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Please check if you forgot to enter any value
        </p>
        <p className="text-stone-600 mb-4">
          Please provide valid value in every input field
        </p>
      </Modal>
      <div className="w-[35rem] mt-16 lg:grow-0 flex-grow px-8">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-blue-800 text-stone-50 hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Inp type="text" ref={title} label="Title" />
          <Inp ref={description} label="Description" isTextArea />
          <Inp type="date" ref={dueDate} label="Due Date" />
          <label className="text-sm font-bold uppercase text-blue-700">
            Status
          </label>
          <form className="flex flex-row gap-1">
            <input
              ref={statusNew}
              type="radio"
              name="status"
              id="new"
              value="new"
              defaultChecked="true"
            />
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
          </form>
        </div>
      </div>
    </>
  );
}
