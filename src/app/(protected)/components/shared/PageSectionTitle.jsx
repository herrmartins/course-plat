import React from "react";

function PageSectionTitle({ title, className = "" }) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 m-3">
        {title}
      </h2>
    </div>
  );
}

export default PageSectionTitle;
