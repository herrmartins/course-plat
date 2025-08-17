import { ClassRow } from "@/app/(protected)/admin/dashboard/classes/components/classRow";

export default function ClassesTable({classes}) {

  return (
    <div className="flex justify-center px-4 mt-3 overflow-x-auto">
      <table className="table-auto text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 uppercase text-xs">
          <tr>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left">Título</th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left hidden md:table-cell">Professores</th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left hidden lg:table-cell">Início</th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left">Status</th>
            <th className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <ClassRow 
              key={classItem._id} 
              classData={classItem}
              className={`transition ${
                index % 2 === 0
                  ? "bg-white dark:bg-neutral-900"
                  : "bg-neutral-50 dark:bg-neutral-800/60"
              } hover:bg-blue-50 dark:hover:bg-neutral-600/60`}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}