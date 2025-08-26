import React from "react";

function PageTitle({title, subTitle = "", className = ""}) {
    return (
        <div className={`${className}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow-lg">
                {title}
            </h2>

            {!!subTitle && (
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    {subTitle}
                </p>
            )}
        </div>
    );
}

export default PageTitle;
