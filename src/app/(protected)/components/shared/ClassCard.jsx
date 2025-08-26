"use client";

import {ClientDateComponent} from "@/app/(protected)/components/shared/ClientDateComponent";

export function ClassCardComponent({ classes }) {
  const list = Array.isArray(classes) ? classes : classes ? [classes] : [];

  if (!list.length) {
    return (
      <div className="text-gray-600 dark:text-gray-300 italic">
        Nenhuma turma encontrada.
      </div>
    );
  }

  const formatDays = (days) => {
    if (!Array.isArray(days) || !days.length) return "—";
    return days.join(", ");
  };

  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((cls) => {
        const teachers = Array.isArray(cls?.teachers) ? cls.teachers : [];
        const teacherNames = teachers
          .map((t) => t?.fullName || t?.email)
          .filter(Boolean)
          .join(", ");

        const status = cls?.status || "active";
        const price = typeof cls?.price === "number" ? cls.price : null;

        return (
          <div
            key={String(cls?._id || `${cls?.classTitle}-${cls?.startDate}`)}
            className="border rounded-xl p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {cls?.classTitle || "Turma"}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {teacherNames || "Professor não definido"}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full border ${statusColors[status] || "bg-neutral-100 text-neutral-800 border-neutral-200"}`}
                title="Status da turma"
              >
                {status}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Início</span>
                <span className="text-neutral-800 dark:text-neutral-200"><ClientDateComponent date={cls?.startDate}/></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Término</span>
                <span className="text-neutral-800 dark:text-neutral-200"><ClientDateComponent date={cls?.endDate}/></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Horário</span>
                <span className="text-neutral-800 dark:text-neutral-200">
                  {cls?.schedule?.time || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Dias</span>
                <span className="text-neutral-800 dark:text-neutral-200 text-right">
                  {formatDays(cls?.schedule?.days)}
                </span>
              </div>
              {price !== null && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 dark:text-neutral-400">Mensalidade</span>
                  <span className="text-neutral-800 dark:text-neutral-200">R$ {price.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}