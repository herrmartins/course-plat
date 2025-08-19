import { getClassTypeModel } from "@/app/models/ClassType";
import React from "react";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import Link from "next/link";
import FilesTable from "@/app/(protected)/admin/dashboard/components/FilesTable";
import { getFileModel } from "@/app/models/FilesSchema";
import { relatedToTitleUrl } from "@/app/lib/helpers/generalUtils";

async function ClassTypeFilesPage({ params }) {
  const { id: classTypeId } = await params;

  await getFileModel();

  const classTypeModel = await getClassTypeModel();

  try {
    const classType = await classTypeModel
      .findById(classTypeId)
      .populate("files")
      .lean();

    if (!classType) {
      return <div>Class Type not found.</div>;
    }

    const simplifiedFiles = classType.files.map((file) => ({
      ...file,
      _id: file._id.toString(),
      uploadedBy: file.uploadedBy.toString(),
      modifiedAt: file.modifiedAt.toString(),
      relatedToId: file.relatedToId.toString(),
    }));

    return (
      <>
        <div className="w-full mt-3">
          <div>
            <PageSectionTitle
              title={`Gerenciar Arquivos da Classe ${classType.title}`}
              className="mx-5"
            />
          </div>
          <div className="flex justify-center">
            <Link
              href={`/admin/dashboard/files/${relatedToTitleUrl(
                "classTypes"
              )}/${classType._id}/add`}
            >
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                Arquivos do Tipo de Classe
              </button>
            </Link>
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex justify-center">
              <SimplePageInnerTitle title="Arquivos" />
            </div>
          </div>
          <div>
            <FilesTable files={simplifiedFiles}></FilesTable>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.error("Error fetching class type and files:", err);
    return <div>Error loading files.</div>;
  }
}

export default ClassTypeFilesPage;
