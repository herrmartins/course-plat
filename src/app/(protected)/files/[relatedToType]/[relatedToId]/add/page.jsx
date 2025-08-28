import React from "react";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import FileUploadComponent from "@/app/(protected)/admin/dashboard/files/components/FileUploadForm";

async function AddFileClass({ params }) {
  const { relatedToType, relatedToId } = await params;
  console.log("Rel type: ", relatedToType)

  return (
    <>
      <div className="flex flex-col w-full">
        <div>
          <PageSectionTitle title="Adicionar Arquivo" className="mb-8" />
        </div>

        <FileUploadComponent relType={relatedToType} relId={relatedToId} />
      </div>
    </>
  );
}

export default AddFileClass;
