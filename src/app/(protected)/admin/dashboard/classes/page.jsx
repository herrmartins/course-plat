import Link from "next/link";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";

async function getClassTypes() {
  const res = await fetch("http://localhost:3000/api/classes", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Falha ao buscar turmas:", res.statusText);
    return [];
  }
  return res.json();
}

export default async function ClassesPage() {
  return (
    <>
      <div className="w-full mt-3">
        <div>
          <PageSectionTitle
            title="Gerenciar Turmas"
            className="mx-5"
          />
        </div>
        <div className="flex justify-center">
          <Link href="/admin/dashboard/classes/add">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
              + Adicionar Nova Turma
            </button>
          </Link>
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex justify-center">
            <SimplePageInnerTitle title="Turmas" />
          </div>
        </div>
      </div>
    </>
  );
}
