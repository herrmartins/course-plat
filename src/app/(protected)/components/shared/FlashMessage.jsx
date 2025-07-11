"use client";

import React from 'react';

function FlashMessage({ message, type = 'info' }) {
  if (!message) {
    return null;
  }

  let baseClasses = "px-4 py-3 rounded relative mb-4";
  let textClasses = "";
  let bgClasses = "";
  let borderClasses = "";
  let icon = null;

  switch (type) {
    case 'success':
      textClasses = "text-green-700 dark:text-green-300";
      bgClasses = "bg-green-100 dark:bg-green-900/50";
      borderClasses = "border border-green-400 dark:border-green-700";
      // icon = <CheckCircleIcon className="h-5 w-5 mr-2" />; // Exemplo com Heroicons
      break;
    case 'error':
      textClasses = "text-red-700 dark:text-red-300";
      bgClasses = "bg-red-100 dark:bg-red-900/50";
      borderClasses = "border border-red-400 dark:border-red-700";
      // icon = <XCircleIcon className="h-5 w-5 mr-2" />; // Exemplo com Heroicons
      break;
    case 'warning':
      textClasses = "text-yellow-700 dark:text-yellow-300";
      bgClasses = "bg-yellow-100 dark:bg-yellow-900/50";
      borderClasses = "border border-yellow-400 dark:border-yellow-700";
      // icon = <ExclamationTriangleIcon className="h-5 w-5 mr-2" />; // Exemplo com Heroicons
      break;
    case 'info':
    default:
      textClasses = "text-blue-700 dark:text-blue-300";
      bgClasses = "bg-blue-100 dark:bg-blue-900/50";
      borderClasses = "border border-blue-400 dark:border-blue-700";
      // icon = <InformationCircleIcon className="h-5 w-5 mr-2" />; // Exemplo com Heroicons
      break;
  }

  return (
    <div className={`${baseClasses} ${textClasses} ${bgClasses} ${borderClasses}`} role="alert">
      <div className="flex items-center">
        {icon}
        <strong className="font-bold mr-1">
          {type.charAt(0).toUpperCase() + type.slice(1)}:
        </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
}

export default FlashMessage;