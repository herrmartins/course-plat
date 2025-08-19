import Link from "next/link";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import { getClassModel } from "@/app/models/Class";
import ClassesTable from "./components/ClassesTable";

export default async function ClassesPage() {
  const Classes = await getClassModel();
  const classes = await Classes.find({}).lean();

  return (
    <>
      <div className="w-full mt-3">
        <div>
          <PageSectionTitle title="Gerenciar Turmas" className="mx-5" />
        </div>
        <div className="flex justify-center">
          <Link href="/admin/dashboard/class/add">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
              + Adicionar Nova Turma
            </button>
          </Link>
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex justify-center">
            <SimplePageInnerTitle title="Turmas" />
          </div>
          <ClassesTable classes={classes} />
        </div>
      </div>
    </>
  );
}
