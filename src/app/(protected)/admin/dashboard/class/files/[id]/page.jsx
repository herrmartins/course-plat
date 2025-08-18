import React from "react";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import Link from "next/link";
import FilesTable from "@/app/(protected)/admin/dashboard/components/FilesTable";
import { getFileModel } from "@/app/models/FilesSchema";
import { getClassModel } from "@/app/models/Class";

async function ClassFilesPage({ params }) {
  const { id: classId } = await params;

  await getFileModel();

  const ClassModel = await getClassModel();

  try {
    const theClass = await ClassModel
      .findById(classId)
      .populate("files")
      .lean();

    if (!theClass) {
      return <div>Class Type not found.</div>;
    }
    
    const plainFiles = theClass.files.map((file) => ({
      ...file,
      _id: file._id.toString(),
      uploadedBy: file.uploadedBy.toString(),
      modifiedAt: file.modifiedAt.toString(),
      relatedToId: file.relatedToId.toString()
    }));

    return (
      <>
        <div className="w-full mt-3">
          <div>
            <PageSectionTitle
              title={`Gerenciar Arquivos da Turma ${theClass.classTitle}`}
              className="mx-5"
            />
          </div>
          <div className="flex justify-center">
            <Link
              href={`/admin/dashboard/files/Class/${theClass._id}/add`}
            >
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                Arquivos da Turma
              </button>
            </Link>
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex justify-center">
              <SimplePageInnerTitle title="Arquivos" />
            </div>
          </div>
          <div>
            <FilesTable files={plainFiles}></FilesTable>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.error("Error fetching class type and files:", err);
    return <div>Error loading files.</div>;
  }
}

export default ClassFilesPage;
