import Link from "next/link";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import ClassTypesTable from "./ClassTypesTable";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import { getAllClassItems } from "@/app/lib/helpers/getItems";
import { relatedToTitleUrl } from "@/app/lib/helpers/generalUtils";

export default async function ClassTypesPage() {
  const classTypes = await getAllClassItems();

  return (
    <>
      <div className="w-full mt-3">
        <div>
          <PageSectionTitle
            title="Gerenciar Tipos de Turmas"
            className="mx-5"
          />
        </div>
        <div className="flex justify-center">
          <Link href={`/admin/dashboard/${relatedToTitleUrl("classTypes")}/add`}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
              + Adicionar Novo Tipo
            </button>
          </Link>
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex justify-center">
            <SimplePageInnerTitle title="Tipos de Turmas" />
          </div>
          <ClassTypesTable classTypes={classTypes} />
        </div>
      </div>
    </>
  );
}
