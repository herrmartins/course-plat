import { deleteUser } from "@/app/lib/users/deleteUser";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

export default function WardsTable({ wards }) {

  return (
    <div className="flex justify-center px-4 mt-3 overflow-x-auto">
      <table className="table-auto text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 uppercase text-xs">
          <tr>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left">
              Nome Completo
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell">
              Nome de Usuário
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell">
              Email
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell">
              Data de Nascimento
            </th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell">
              Funções
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
          {wards.map((ward, index) => (
            <tr
              key={ward._id}
              className={`transition ${
                index % 2 === 0
                  ? "bg-white dark:bg-neutral-900"
                  : "bg-neutral-50 dark:bg-neutral-800/60"
              } hover:bg-blue-50 dark:hover:bg-neutral-600/60`}
            >
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100">
                  <Link href={`/dashboard/guardian/${ward._id}`}>
                      {ward.fullName}
                  </Link>
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell text-neutral-800 dark:text-neutral-100">
                {ward.username}
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell text-neutral-800 dark:text-neutral-100">
                {ward.email || "-"}
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell text-neutral-800 dark:text-neutral-100">
                <span className="flex items-center gap-1 justify-center">
                  <IoCalendarOutline />
                  {new Date(ward.dateOfBirth).toLocaleDateString()}
                </span>
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell text-neutral-800 dark:text-neutral-100">
                {ward.roles.join(", ") || "-"}
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell text-neutral-800 dark:text-neutral-100">
                <span className="flex items-center gap-1 justify-center">
                  <IoCalendarOutline />
                  {new Date(ward.createdAt).toLocaleDateString()}
                </span>
              </td>
              <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-center gap-3 text-xl text-neutral-600 dark:text-neutral-300">
                  <Link href={`/admin/dashboard/users/edit/${ward._id}`}>
                    <FaEdit className="hover:text-yellow-500 transition cursor-pointer" />
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="userId" value={ward._id.toString()} />
                    <button
                      type="submit"
                      className="p-0 border-none bg-transparent"
                      aria-label={`Excluir usuário ${ward.username}`}
                    >
                      <FaTrash className="hover:text-red-500 transition cursor-pointer" />
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
