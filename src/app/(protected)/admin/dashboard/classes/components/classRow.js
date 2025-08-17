import { getUserModel } from "@/app/models/User";
import { getFieldItemByItem } from "@/app/lib/helpers/getItemById"
import { FaEdit, FaTrash } from "react-icons/fa";
import { LuFileStack } from "react-icons/lu";
import Link from "next/link";
import { FaFileCirclePlus } from "react-icons/fa6";

export async function ClassRow({ classData, className }) {
  const User = await getUserModel();

  return (
    <tr className={className}>
      <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100">
        {classData?.classTitle}
      </td>
      <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden md:table-cell text-neutral-800 dark:text-neutral-100">
        {(
          await Promise.all(
            classData.teachers.map((t) =>
              getFieldItemByItem(User, t._id, "fullName")
            )
          )
        ).join(", ")}
      </td>
      <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 hidden lg:table-cell text-neutral-800 dark:text-neutral-100">
        {new Date(classData.startDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100">
        {classData.status}
      </td>
      <td className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100">
        <div className="flex justify-center gap-3 text-xl text-neutral-600 dark:text-neutral-300">
          <Link href={`/admin/dashboard/classes/edit/${classData._id}`}>
            <FaEdit className="hover:text-yellow-500 transition cursor-pointer" />
          </Link>
          <FaTrash className="hover:text-red-500 transition cursor-pointer" />
          <Link href={`/admin/dashboard/classes/files/${classData._id}`}>
            <LuFileStack className="hover:text-yellow-500 transition cursor-pointer" />
          </Link>
          {/* <Link href={`/admin/dashboard/files/ClassTypes/${type._id}/add`}>
          <FaFileCirclePlus className="hover:text-blue-500 transition cursor-pointer" />
        </Link> */}
        </div>
      </td>
    </tr>
  );
}
