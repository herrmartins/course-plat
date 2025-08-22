"use client";

import { deleteClassTypeAction } from "@/app/lib/classes/deleteClassType";
import { useActionState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaDollarSign } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LuFileStack } from "react-icons/lu";
import { relatedToTitleUrl } from "@/app/lib/helpers/generalUtils";

export default function ClassTypesTable({ classTypes }) {
  const initialState = { success: false, message: null };
  const [state, action, isPending] = useActionState(
    deleteClassTypeAction,
    initialState
  );
  return (
    <div className="flex justify-center px-4 mt-3 overflow-x-auto">
      <div>{state?.message && <p>${state?.message}</p>}</div>
      <table
        className="table-auto text-sm border border-neutral-200 dark:border-neutral-700 
                    rounded-lg overflow-hidden shadow-sm"
      >
        <thead className="bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 uppercase text-xs">
          <tr>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left">
              Tipo de Turma
            </th>
            <th
              className="px-4 py-2 border-b border-neutral-200 dark:border-ne
                    onClick={() => onEditClassType(type._id)}utral-700 hidden md:table-cell"
            >
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
                  <Link
                    href={`/admin/dashboard/${relatedToTitleUrl(
                      "classTypes"
                    )}/edit/${type._id.toString()}`}
                  >
                    <FaEdit className="hover:text-yellow-500 transition cursor-pointer" />
                  </Link>
                  {/* TODO: alterar o delete, esse componente será do servidor; tirar router.push */}
                  <form action={action}>
                    <input
                      type="hidden"
                      name="_id"
                      value={type._id || "nada"}
                    />
                    <button type="submit">
                      <FaTrash className="hover:text-red-500 transition" />
                    </button>
                  </form>

                  <Link
                    href={`/admin/dashboard/${relatedToTitleUrl(
                      "classTypes"
                    )}/files/${type._id}`}
                  >
                    <LuFileStack className="hover:text-yellow-500 transition cursor-pointer" />
                  </Link>
                  <Link
                    href={`/admin/dashboard/files/${relatedToTitleUrl(
                      "classTypes"
                    )}/${type._id}/add`}
                  >
                    <FaFileCirclePlus className="hover:text-blue-500 transition cursor-pointer" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
