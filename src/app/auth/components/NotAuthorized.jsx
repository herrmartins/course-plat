"use client";

import { useRouter } from "next/navigation";

export default function NotAuthorized({
  message = "Você não tem acesso a esta página.",
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
      <button
        onClick={() => router.back()}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
      >
        Voltar
      </button>
    </div>
  );
}
