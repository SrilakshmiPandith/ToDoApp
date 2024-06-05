import { forwardRef, useState } from "react";

const Inp = forwardRef(function Inp(
  { label, isTextArea, isRadio, ...props },
  ref
) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  let content = <input ref={ref} className={classes} {...props} />;
  if (isTextArea) {
    content = <textarea ref={ref} className={classes} {...props} />;
  }

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-blue-700">
        {label}
      </label>
      {content}
    </p>
  );
});

export default Inp;
