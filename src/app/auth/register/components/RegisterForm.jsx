"use client";
import { useState, useActionState } from "react";
import saveUserData from "@/app/lib/userDataActions";

const initialState = {
  success: false,
  message: "",
};

function RegisterForm() {
  const [state, action, isPending] = useActionState(saveUserData, initialState);

  return (
    <div className="mt-3 bg-gray-200 dark:bg-gray-800 p-3 rounded-2xl md:w-150">
      <p className={`${state.success ? 'text-green-500' : 'text-red-600'} p-3`}>{state.message}</p>
      <form action={action}>
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
            defaultValue={state?.inputs?.fullName}
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
            defaultValue={state?.inputs?.username}
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
            required
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
            defaultValue={state?.inputs?.email}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
                       bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Confirmar senha
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-600
               bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-white
               focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            defaultValue={state?.inputs?.dateOfBirth}
          />
        </div>

        <input
          type="submit"
          value="Cadastrar"
          className="px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default RegisterForm;
