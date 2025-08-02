"use server";

import { getClassModel } from "@/app/models/Class";

export default async function saveClassAction(currentState, formData) {
  const id = formData.get("_id");
  const classType = formData.get("classType");
  const teacher = formData.get("teacher");
  const students = formData.get("students")?.split(",").filter(Boolean);
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const days = formData.get("days")?.split(",").filter(Boolean);
  const time = formData.get("time");
  const files = formData.get("files")?.split(",").filter(Boolean);
  const status = formData.get("status");

  const rawData = {
    classType,
    teacher,
    students,
    startDate,
    endDate,
    schedule: { days, time },
    files,
    status,
  };

  function isBlank(value) {
    return value === null || value === "" || (Array.isArray(value) && value.length === 0);
  }

  if (isBlank(classType) || isBlank(teacher) || isBlank(startDate) || isBlank(time)) {
    return {
      success: false,
      message: "Tipo de classe, professor, data de início e horário são obrigatórios.",
      inputs: rawData,
    };
  }

  try {
    const classModel = await getClassModel();
    if (id) {
      await classModel.updateOne(
        { _id: id },
        { classType, teacher, students, startDate, endDate, schedule: { days, time }, files, status }
      );
    } else {
      await classModel.create({
        classType,
        teacher,
        students,
        startDate,
        endDate,
        schedule: { days, time },
        files,
        status,
      });
    }

    return {
      success: true,
      redirectTo: "/admin/dashboard/classes",
    };
  } catch (e) {
    return {
      success: false,
      message: `Erro: ${e.message}`,
      inputs: rawData,
    };
  }
}