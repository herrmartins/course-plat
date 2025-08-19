
import React from "react";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import AddClassTypeForm from "./AddClassTypeForm";

function AddClassType() {
  return (
    <>
      <div className="flex flex-col w-full">
        <div>
          <PageSectionTitle
            title="Gerenciar Tipos de Turmas"
            className="mb-8"
          />
        </div>
        <AddClassTypeForm />
      </div>
    </>
  );
}

export default AddClassType;
