"use client";

import React from "react";
import { FaEdit, FaTrash, FaDollarSign } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

export default function ClassTypesTable({ classTypes, onEditClassType, onDeleteClassType }) {
  return (
    <div className="overflow-x-auto px-4 mt-3">
      <table className="w-full table-auto text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 uppercase text-xs">
          <tr>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left">
              Tipo de Classe
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell">
              Faixa Etária
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell">
              Preço
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell">
              Criado Em
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {classTypes.map((type, index) => (
            <tr
              key={type._id}
              className={`transition ${
                index % 2 === 0
                  ? "bg-white dark:bg-neutral-900"
                  : "bg-neutral-50 dark:bg-neutral-800/60"
              } hover:bg-blue-50 dark:hover:bg-neutral-600/60`}
            >
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100">
                {type.title}
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell text-neutral-800 dark:text-neutral-100">
                {type.ageRange || "-"}
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell text-neutral-800 dark:text-neutral-100">
                <span className="flex justify-center items-center gap-1">
                  <FaDollarSign className="text-green-600 dark:text-green-400" />
                  {type.price?.toFixed(2) || "-"}
                </span>
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell text-neutral-800 dark:text-neutral-100">
                <span className="flex items-center gap-1 justify-center">
                  <IoCalendarOutline />
                  {new Date(type.createdAt).toLocaleDateString()}
                </span>
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-center gap-3 text-xl text-neutral-600 dark:text-neutral-300">
                  <FaEdit
                    className="hover:text-yellow-500 transition cursor-pointer"
                    onClick={() => onEditClassType(type._id)}
                  />
                  <FaTrash
                    className="hover:text-red-500 transition cursor-pointer"
                    onClick={() => onDeleteClassType(type._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
