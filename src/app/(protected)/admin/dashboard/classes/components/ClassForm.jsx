"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import saveClassAction from "@/app/lib/classes/saveClassAction";
import FlashMessage from "@/app/(protected)/components/shared/FlashMessage";
import { useRouter } from "next/navigation";

function ClassForm({ classData = {}, onCancel }) {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(true);
  const initialState = { success: false, message: null };

  const [state, action, isPending] = useActionState(saveClassAction, initialState);

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

        {classData._id && <input type="hidden" name="_id" value={classData._id} />}

        <div className="mb-4">
          <label htmlFor="classType" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Tipo de Classe:
          </label>
          <input
            type="text"
            id="classType"
            name="classType"
            defaultValue={classData.classType?._id || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="ID do Tipo de Classe"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="teacher" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Instrutor:
          </label>
          <input
            type="text"
            id="teacher"
            name="teacher"
            defaultValue={classData.teacher?._id || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Professor"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="students" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Alunos:
          </label>
          <input
            type="text"
            id="students"
            name="students"
            defaultValue={classData.students?.map(s => s._id).join(",") || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="IDs dos Alunos (separados por vírgula)"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Data de Início:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            defaultValue={classData.startDate?.split("T")[0] || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Data de Término:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            defaultValue={classData.endDate?.split("T")[0] || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="days" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Dias da Semana:
          </label>
          <input
            type="text"
            id="days"
            name="days"
            defaultValue={classData.schedule?.days?.join(",") || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ex: Monday,Tuesday"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Horário:
          </label>
          <input
            type="text"
            id="time"
            name="time"
            defaultValue={classData.schedule?.time || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ex: 14:00"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="files" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Arquivos:
          </label>
          <input
            type="text"
            id="files"
            name="files"
            defaultValue={classData.files?.map(f => f._id).join(",") || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="IDs dos Arquivos (separados por vírgula)"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Status:
          </label>
          <select
            id="status"
            name="status"
            defaultValue={classData.status || "active"}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="active">Ativo</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

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