import React from "react";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import ClassForm from "@/app/(protected)/admin/dashboard/class/components/ClassForm";
import { getUsersByRole } from "@/app/lib/users/getUsersByRole";
import { getClassTypes } from "@/app/lib/classes/getClassTypes";

async function AddClass() {
  const teachers = await getUsersByRole(["teacher"]);
  const students = await getUsersByRole(["student"]);
  const classTypes = await getClassTypes();

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8">
      <PageSectionTitle title="Adicionar Turma" className="mb-8" />
      <ClassForm
        classTypes={classTypes}
        teachers={teachers}
        students={students}
      />
    </div>
  );
}

export default AddClass;
