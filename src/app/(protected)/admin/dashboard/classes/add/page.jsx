import React from "react";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import ClassForm from "@/app/(protected)/admin/dashboard/classes/components/ClassForm";

function AddClass() {
  return (
    <div className="flex flex-col w-full">
      <PageSectionTitle
        title="Adicionar Turma"
        className="mb-8"
      />
      <ClassForm />
    </div>
  );
}

export default AddClass;