"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function FilesTable({ files }) {
  const [clientFiles, setClientFiles] = useState(files);

  const handleDeleteFile = async (fileId) => {
    /* try {
      // Assume deleteFileAction exists
      await deleteFileAction({ _id: fileId });
      setClientFiles((prev) => prev.filter((f) => f._id !== fileId));
    } catch (err) {
      console.error("Erro deletando o arquivo", err);
    } */
  };

  return (
    <div className="flex justify-center px-4 mt-3 overflow-x-auto">
      <table className="table-auto text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 uppercase text-xs">
          <tr>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left">
              Título
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {clientFiles.map((file, index) => (
            <tr
              key={file._id}
              className={`transition ${
                index % 2 === 0
                  ? "bg-white dark:bg-neutral-900"
                  : "bg-neutral-50 dark:bg-neutral-800/60"
              } hover:bg-blue-50 dark:hover:bg-neutral-600/60`}
            >
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100">
                {file.title}
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-center gap-3 text-xl text-neutral-600 dark:text-neutral-300">
                  <FaEdit
                    className="hover:text-yellow-500 transition cursor-pointer"
                    onClick={() => {/* Edit logic */}}
                  />
                  <FaTrash
                    className="hover:text-red-500 transition cursor-pointer"
                    onClick={() => handleDeleteFile(file._id)}
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