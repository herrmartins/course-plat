"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import saveClassTypeAction from "@/app/lib/classes/saveClassTypeAction";
import FlashMessage from "@/app/(protected)/components/shared/FlashMessage";
import { useRouter } from "next/navigation";

function ClassTypeForm({ classType = {}, onCancel }) {
  const router = useRouter();

  const [showMessage, setShowMessage] = useState(true);
  const initialState = {
    success: false,
    message: null,
  };

  const [state, action, isPending] = useActionState(
    saveClassTypeAction,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

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

        {classType._id && (
          <input type="hidden" name="_id" value={classType._id} />
        )}

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={classType.title || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ex: Aula de Gramática Avançada"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Descrição:
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={classType.description || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            rows="3"
            placeholder="Detalhes sobre o conteúdo da aula..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="ageRange" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Faixa Etária:
          </label>
          <input
            type="text"
            id="ageRange"
            name="ageRange"
            defaultValue={classType.ageRange || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ex: 8-12 anos, Adultos, etc."
          />
        </div>

        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Preço:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            defaultValue={classType.price || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ex: 50.00"
          />
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

export default ClassTypeForm;
