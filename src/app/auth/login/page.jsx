"use client";
import { useActionState } from "react";
import userLogin from "@/app/lib/userLoginAction";

export default function LoginPage() {
  const initialState = {
    success: false,
    message: "",
  };

  const [state, action, isPending] = useActionState(userLogin, initialState);
  return (
    <div>
      {state.message && (
        <div className="flex justify-center mt-3">
          <p
            className={`${
              state.success ? "text-green-500" : "text-red-600"
            } p-3`}
          >
            {state.message}
          </p>
        </div>
      )}
      <div className="mt-3 flex items-center justify-center px-4 transition-colors">
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-md w-full max-w-sm border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-2xl font-bold text-center text-neutral-800 dark:text-white mb-6">
            Entrar
          </h2>
          <form action={action} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Usuário
              </label>
              <input
                type="text"
                defaultValue={state?.inputs?.username}
                name="username"
                placeholder="Digite seu nome do usuário"
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 
                         bg-neutral-50 dark:bg-neutral-700 
                         text-neutral-800 dark:text-white 
                         placeholder:text-neutral-400 dark:placeholder:text-neutral-500 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 
                         bg-neutral-50 dark:bg-neutral-700 
                         text-neutral-800 dark:text-white 
                         placeholder:text-neutral-400 dark:placeholder:text-neutral-500 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>
            {/* {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            )} */}
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-xl font-semibold transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
