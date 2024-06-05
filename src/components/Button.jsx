export default function Button({children,...props}){
  return (
    <button
      className="px-4 py-2 text-l md:text-base rouded-md bg-blue-900 text-stone-50 hover:bg-blue-800 hover:text-stone-100"
      {...props}
    >
      {children}
    </button>
  );
}
