import React from "react";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import FileUploadComponent from "@/app/(protected)/admin/dashboard/files/components/FileUploadForm";

function AddFileClass() {
  return (
    <>
      <div className="flex flex-col w-full">
        <div>
          <PageSectionTitle
            title="Adicionar Arquivo"
            className="mb-8"
          />
        </div>
        <FileUploadComponent />
      </div>
    </>
  );
}

export default AddFileClass;
