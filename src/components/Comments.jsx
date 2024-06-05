import NewComment from "./NewComment";

export default function Comments({ comments, onAdd, onDelete }) {
  return (
    <section>
      <h2 className="text-2xl font-bold uppercase text-blue-700 mb-4 mt-4">
        Comments
      </h2>
      <NewComment onAdd={onAdd} />
      {comments.length === 0 && (
        <p className="text-stone-800 my-4">
          This task does not have any comments yet.
        </p>
      )}
      {comments.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {comments.map((comment) => (
            <li key={comment.id} className="flex justify-between my-4">
              <span>{comment.text}</span>
              <button className="text-stone-700 hover:text-red-500" onClick={()=>{onDelete(comment.id)}}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
