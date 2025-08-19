import React from "react";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import FileUploadComponent from "@/app/(protected)/admin/dashboard/files/components/FileUploadForm";
import { getItemById } from "@/app/lib/helpers/getItems";
import { getFileModel } from "@/app/models/FilesSchema";

async function EditFile({ params }) {
  const {id} = await params;

  const fileModel = await getFileModel();
  const file = await getItemById(fileModel, id);
    const shapedFile = file
    ? {
        id: file._id.toString() || id,
        title: file.title,
        description: file.description,
        relatedToType: file.relatedToType,
        relatedToId: file.relatedToId.toString(),
        url: file.url
      }
    : null;

  return (
    <>
      <div className="flex flex-col w-full">
        <div>
          <PageSectionTitle title="Adicionar Arquivo" className="mb-8" />
        </div>
        <FileUploadComponent file={shapedFile}/>
      </div>
    </>
  );
}

export default EditFile;
