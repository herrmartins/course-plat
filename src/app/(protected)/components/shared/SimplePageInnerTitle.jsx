import React from "react";

function SimplePageInnerTitle({ title }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 tracking-tight relative inline-block">
        {title}
        <span className="block h-1 w-10 mt-2 bg-blue-600 rounded"></span>
      </h2>
    </div>
  );
}

export default SimplePageInnerTitle;
