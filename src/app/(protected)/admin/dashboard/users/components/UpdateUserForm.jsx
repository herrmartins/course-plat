"use client";

import { useState, useActionState, useEffect } from "react";
import updateUserData from "@/app/lib/users/updateUserAction";

const initialState = {
  success: false,
  message: "",
  inputs: {},
};

function UpdateUserForm({ user }) {
  const [state, action, isPending] = useActionState(
    updateUserData,
    initialState
  );

  const [selectedRoles, setSelectedRoles] = useState(
    user?.roles || ["student"]
  );

  useEffect(() => {
    if (user && JSON.stringify(user.roles) !== JSON.stringify(selectedRoles)) {
      setSelectedRoles(user.roles);
    }

  }, [user]);

  useEffect(() => {
    if (state?.inputs && state?.inputs?.roles) {
      if (
        JSON.stringify(state?.inputs?.roles) !== JSON.stringify(selectedRoles)
      ) {
        setSelectedRoles(state?.inputs?.roles);
      }
    }

  }, [state?.inputs]);

  const handleChange = (event) => {
    const options = event.target.options;
    const newSelectedRoles = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        newSelectedRoles.push(options[i].value);
      }
    }
    setSelectedRoles(newSelectedRoles);
  };

  return (
    <div className="mt-3 bg-gray-200 dark:bg-gray-800 p-3 rounded-2xl md:w-150">
      <p
        className={`${state?.success ? "text-green-500" : "text-red-600"} p-3`}
      >
        {state?.message}
      </p>
      <form action={action}>
        <input type="hidden" name="_id" value={user._id} />
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Nome completo
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
            defaultValue={user.fullName || state?.inputs?.fullName}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Nome de usuário
          </label>
          <input
            id="username"
            name="username"
            required
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
            defaultValue={user.username || state?.inputs?.username}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
            defaultValue={user.email || state?.inputs?.email}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Data de nascimento
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            required
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
            defaultValue={
              user.dateOfBirth
                ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                : state?.inputs?.dateOfBirth
            }
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="roles"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Funções
          </label>
          <select
            id="roles"
            name="roles"
            multiple
            required
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={selectedRoles}
            onChange={handleChange}
          >
            <option value="student">Estudante</option>
            <option value="parent">Responsável</option>
            <option value="teacher">Professor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <input
          type="submit"
          value="Atualizar"
          className="px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
          disabled={isPending}
        />
      </form>
    </div>
  );
}

export default UpdateUserForm;
