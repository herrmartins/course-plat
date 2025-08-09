"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import saveClassAction from "@/app/lib/classes/saveClassAction";
import FlashMessage from "@/app/(protected)/components/shared/FlashMessage";
import { useRouter } from "next/navigation";
import UsersMultiSelect from "./StudentsMultiSelect";
import DaysMultiSelect from "./DaysMultiSelect";

function ClassForm({
  classData = {},
  onCancel,
  classTypes = [],
  teachers = [],
  students = [],
}) {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(true);
  const initialState = { success: false, message: null };

  const [state, action, isPending] = useActionState(
    saveClassAction,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.message]);

  useEffect(() => {
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state?.success, state?.redirectTo, router]);

  return (
    <div className="w-full">
      {state?.message && showMessage && (
        <div className="max-w-screen-xl mx-auto w-full">
          <FlashMessage
            message={state?.message}
            type={state.success ? "success" : "error"}
          />
        </div>
      )}

      <form
        action={action}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-lg mx-auto"
      >
        {isPending && <p>Carregando...</p>}

        {classData._id && (
          <input type="hidden" name="_id" value={classData._id} />
        )}

        <div className="mb-4">
          <label
            htmlFor="classType"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Tipo de Classe:
          </label>

          <div className="relative">
            <select
              id="classType"
              name="classType"
              required
              defaultValue={
                classData.classType?._id || state?.inputs?.classType || ""
              }
              className="shadow appearance-none border rounded w-full py-2 pl-3 pr-10
                 text-gray-700 dark:text-gray-200 leading-tight
                 focus:outline-none focus:shadow-outline
                 dark:bg-gray-700 dark:border-gray-600
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 cursor-pointer"
            >
              <option value="" disabled>
                Selecione o tipo de classe
              </option>

              {classTypes.map((ct) => (
                <option key={ct._id} value={ct._id}>
                  {ct.name || ct.title || ct.label || ct._id}
                </option>
              ))}
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {classTypes.length === 0 && (
            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
              Nenhum tipo de classe cadastrado ainda.
            </p>
          )}
        </div>

        <div className="mb-4">
          <UsersMultiSelect
            label="Professores"
            inputName="teachers"
            users={teachers}
            defaultSelectedIds={
              (
                classData.teachers ||
                (state?.inputs?.teachers
                  ? state.inputs.teachers
                  : []) ||
                []
              ).map((t) => (typeof t === "string" ? t : t._id))
            }
          />
        </div>

        <div className="mb-4">
          <UsersMultiSelect
            label="Alunos"
            inputName="students"
            users={students}
            defaultSelectedIds={
              (
                classData.students ||
                (state?.inputs?.students
                  ? state.inputs.students
                  : []) ||
                []
              ).map((s) => (typeof s === "string" ? s : s._id))
            }
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Data de Início:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            defaultValue={
              classData.startDate?.split("T")[0] ||
              state?.inputs?.startDate ||
              ""
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Data de Término:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            defaultValue={
              classData.endDate?.split("T")[0] || state?.inputs?.endDate || ""
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <DaysMultiSelect
            defaultSelectedDays={
              classData.schedule?.days || state?.inputs?.schedule?.days || []
            }
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Horário:
          </label>
          <input
            type="text"
            id="time"
            name="time"
            defaultValue={classData.schedule?.time || state?.inputs?.time || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ex: 14:00"
          />
        </div>

        <input type="hidden" name="status" value="active" />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClassForm;
