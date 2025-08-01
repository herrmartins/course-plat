
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTransition } from "react";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { deleteFile } from "@/app/lib/generalActions/deleteFile";

export default function FilesTable({ files }) {
  const [clientFiles, setClientFiles] = useState(files);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const onEditFile = (id) => {
    router.push(`/admin/dashboard/files/edit/${id.toString()}`);
  };

  const handleDeleteFile = (fileId) => {
    startTransition(async () => {
      const result = await deleteFile({
        _id: fileId,
        redirectTo: pathname,
      });

      if (result.success) {
        setClientFiles(clientFiles.filter((file) => file._id !== fileId));
      } else {
        console.error(result.message);
      }
    });
  };

  return (
    <div className="flex justify-center px-4 mt-3 overflow-x-auto">
      <table className="table-auto text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 uppercase text-xs">
          <tr>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left">
              Título do Arquivo
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell">
              Tipo
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell">
              Tamanho
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell">
              Enviado
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {clientFiles &&
            clientFiles.map((file, index) => (
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
                <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell text-neutral-800 dark:text-neutral-100">
                  {file.mimetype || "-"}
                </td>
                <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell text-neutral-800 dark:text-neutral-100">
                  {file.size ? `${(file.size / 1024).toFixed(2)} KB` : "-"}
                </td>
                <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell text-neutral-800 dark:text-neutral-100">
                  <span className="flex items-center gap-1 justify-center">
                    <IoCalendarOutline />
                    {new Date(file.uploadedAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                  <div className="flex justify-center gap-3 text-xl text-neutral-600 dark:text-neutral-300">
                    <FaEdit
                      className="hover:text-yellow-500 transition cursor-pointer"
                      onClick={() => onEditFile(file._id)}
                    />
                    <FaTrash
                      className={`hover:text-red-500 transition cursor-pointer ${
                        isPending ? "opacity-50 pointer-events-none" : ""
                      }`}
                      onClick={() => handleDeleteFile(file._id)}
                    />
                    {file.url && (
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaDownload className="hover:text-blue-500 transition cursor-pointer" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}