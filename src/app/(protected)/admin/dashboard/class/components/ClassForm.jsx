"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import saveClassAction from "@/app/lib/classes/saveClassAction";
import FlashMessage from "@/app/(protected)/components/shared/FlashMessage";
import UsersMultiSelect from "./UsersMultiSelect";
import DaysMultiSelect from "./DaysMultiSelect";
import FormCheckbox from "./FormCheckbox";

function ClassForm({
  classData = {},
  onCancel,
  classTypes = [],
  teachers = [],
  students = [],
}) {
  const initialState = { success: false, message: null };

  const [state, action, isPending] = useActionState(
    saveClassAction,
    initialState
  );
  const [showMessage, setShowMessage] = useState(false);

  const initialData = classData
    ? {
        ...classData,
        classType:
          typeof classData.classType === "object"
            ? String(classData.classType?._id ?? "")
            : String(classData.classType ?? ""),
        startDate: classData.startDate?.split("T")[0],
        endDate: classData.endDate?.split("T")[0],
      }
    : {};

  const [inputs, setInputs] = useState(state?.inputs || initialData || []);

  useEffect(() => {
    if (state?.inputs) {
      setInputs((prev) => ({
        ...prev,
        ...state.inputs,
        classType: String(state.inputs.classType ?? ""),
      }));
    }
  }, [state?.inputs]);

  useEffect(() => {
    if (state.message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowMessage(false);
    }
  }, [state.message]);

  const onRemoveUser = (userId, inputName) => {
    const usersToFilter =
      inputName === "teachers" ? inputs.teachers : inputs.students;

    const filteredUsers = usersToFilter.filter((user) => user !== userId);

    setInputs({ ...inputs, [inputName]: filteredUsers });
  };

  const onRemoveDay = (day) => {
    const daysToFilter = inputs?.schedule?.days;
    const filteredDays = daysToFilter.filter((d) => d !== day);

    setInputs({
      ...inputs,
      schedule: {
        ...inputs.schedule,
        days: filteredDays,
      },
    });
  };

  const onClassTypeChange = (e) => {
    const value = String(e.target.value);
    const ct = classTypes.find(x => String(x._id) === e.target.value);
    setInputs((prev) => {
      const next = { ...prev, classType: value, price: ct?.price ?? "" };
      return next;
    });
  };

  return (
    <div className="mb-20">
      <form
        action={action}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-lg mx-auto"
      >
        {isPending && <p>Carregando...</p>}

        {classData._id && (
          <input type="hidden" name="_id" value={classData._id} />
        )}
        {state?.message && showMessage && (
          <div className="max-w-screen-xl mx-auto w-full">
            <FlashMessage
              message={state?.message}
              type={state.success ? "success" : "error"}
            />
          </div>
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
              value={inputs?.classType || ""}
              onChange={onClassTypeChange}
              className="shadow appearance-none border rounded w-full py-2 pl-3 pr-10 ..."
            >
              <option value="" disabled>
                Selecione o tipo de classe
              </option>
              {classTypes.map((ct) => {
                const id = typeof ct._id === "string" ? ct._id : String(ct._id);
                return (
                  <option key={id} value={id}>
                    {ct.name || ct.title || ct.label || id}
                  </option>
                );
              })}
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
          <label
            htmlFor="title"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Título:
          </label>
          <input
            type="text"
            id="classTitle"
            name="classTitle"
            defaultValue={inputs?.classTitle || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Classe 1 Semestre 2025 Starters 1"
          />
        </div>

        <div className="mb-4">
          <UsersMultiSelect
            label="Professores"
            inputName="teachers"
            users={teachers}
            defaultSelectedIds={(inputs?.teachers || []).map((t) =>
              typeof t === "string" ? t : t._id
            )}
            onRemove={onRemoveUser}
          />
        </div>

        <div className="mb-4">
          <UsersMultiSelect
            label="Alunos"
            inputName="students"
            users={students}
            defaultSelectedIds={(inputs?.students || []).map((s) =>
              typeof s === "string" ? s : s._id
            )}
            onRemove={onRemoveUser}
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
            defaultValue={inputs?.startDate || ""}
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
            defaultValue={inputs?.endDate || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <DaysMultiSelect
            defaultSelectedDays={inputs?.schedule?.days || []}
            onRemove={onRemoveDay}
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
            defaultValue={inputs?.schedule?.time || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ex: 14:00"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Mensalidade:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            defaultValue={inputs?.price || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
            placeholder="Ex: 50,00"
          />
        </div>

          <div className="mb-4">
              <label
                  htmlFor="link"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              >
                  Link:
              </label>
              <input
                  type="text"
                  id="link"
                  name="link"
                  defaultValue={inputs?.link || ""}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
              />
          </div>

        <div className="mb-4">
          {!classData._id && (
            <FormCheckbox
              name="inheritFiles"
              label="Herdar arquivos do tipo de turma"
              description="Ao se criar a classe, herdam-se os arquivos daquele tipo de classe."
              checked={!!inputs?.inheritFiles}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  inheritFiles: e.target.checked,
                }))
              }
            />
          )}
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
