import Link from "next/link";
import React from "react";

function DashboardCard({ title, description, buttonText, buttonColor, link }) {
  const buttonClasses = `w-full text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50
    ${
      buttonColor === "indigo"
        ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
        : ""
    }
    ${
      buttonColor === "green"
        ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
        : ""
    }
    ${
      buttonColor === "purple"
        ? "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
        : ""
    }
  `;

  const titleClasses = `text-2xl font-semibold mb-4
    ${buttonColor === "indigo" ? "text-indigo-700 dark:text-indigo-300" : ""}
    ${buttonColor === "green" ? "text-green-700 dark:text-green-300" : ""}
    ${buttonColor === "purple" ? "text-purple-700 dark:text-purple-300" : ""}
  `;

  return (
    <div className="max-w-120 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className={titleClasses}>{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4 break-words">
        {description}
      </p>
      <Link href={link}>
        <button className={`${buttonClasses} cursor-pointer`}>{buttonText}</button>
      </Link>
    </div>
  );
}

export default DashboardCard;
