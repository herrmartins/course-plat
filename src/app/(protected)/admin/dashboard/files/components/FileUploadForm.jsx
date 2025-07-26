"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { saveFileAction } from "@/app/lib/generalActions/saveFileAction";
import { relatedToTitle } from "@/app/lib/helpers/generalUtils";

const initialState = {
  success: false,
  message: null,
};

export default function FileUploadComponent({ relType, relId }) {
  const [state, formAction, isPending] = useActionState(
    saveFileAction,
    initialState
  );
  const [showMessage, setShowMessage] = useState(false);

  const [type] = useState(relType);
  const [id] = useState(relId);

  useEffect(() => {
    if (state?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state?.message]);

  return (
    <form
      action={formAction}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Enviar Arquivo{" "}
        {relType && relId && <span>para {relatedToTitle(relType)}</span>}
      </h2>
      {type && id && (
        <>
          <input type="hidden" name="relatedToType" value={type} />
          <input type="hidden" name="relatedToId" value={id} />
        </>
      )}

      {showMessage && state?.message && (
        <p
          className={`mb-4 text-sm font-medium text-center ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Arquivo:
        </label>
        <input
          type="file"
          name="file"
          required
          className="w-full text-sm text-gray-700 dark:text-gray-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Título*:
        </label>
        <input
          type="text"
          name="title"
          className="w-full border rounded px-3 py-2 text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
          placeholder="Título"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Descrição:
        </label>
        <input
          type="text"
          name="description"
          className="w-full border rounded px-3 py-2 text-gray-800 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
          placeholder="Descrição opcional..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {isPending ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
