"use server";

import { getClassModel } from "@/app/models/Class";

export default async function saveClassAction(currentState, formData) {
  console.log([...formData.entries()])
  const id = formData.get("_id");

  const classType = formData.get("classType");
  const teachers = formData.getAll("teachers");
  const students = formData.getAll("students");

  const startDate = formData.get("startDate") || null;
  const endDate = formData.get("endDate") || null;

  const daysStr = formData.get("days");
  const days = daysStr
    ? daysStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const time = formData.get("time") || null;

  const filesStr = formData.get("files");
  const files = filesStr
    ? filesStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const status = formData.get("status") || "active";

  const rawData = {
    classType,
    teachers,
    students,
    startDate,
    endDate,
    schedule: { days, time },
    files,
    status,
  };

  console.log("Raw data:", rawData)

  const isBlank = (v) =>
    v == null || v === "" || (Array.isArray(v) && v.length === 0);

  if (
    isBlank(classType) ||
    isBlank(teachers) ||
    isBlank(startDate) ||
    isBlank(time)
  ) {
    return {
      success: false,
      message:
        "Tipo de classe, professor, data de início e horário são obrigatórios.",
      inputs: rawData,
    };
  }
  if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
    return {
      success: false,
      message: "Data de término não pode ser anterior à data de início.",
      inputs: rawData,
    };
  }

  try {
    const Class = await getClassModel();
    const payload = {
      classType,
      teachers,
      students,
      startDate,
      endDate,
      schedule: { days, time },
      files,
      status,
    };

    if (id) {
      await Class.updateOne({ _id: id }, payload, { runValidators: true });
    } else {
      console.log("Vou salvar...")
      await Class.create(payload);
      console.log("Salvei...")
    }
    console.log("To aqui..", payload)
    return { success: true, redirectTo: "/admin/dashboard/classes" };
  } catch (err) {
    console.log("Erro: ", err)
    if (err.name === "ValidationError") {
      return {
        success: false,
        message: "Erro de validação, verifique se os dados foram escritos corretamente...",
        fieldErrors: Object.fromEntries(
          Object.entries(err.errors).map(([field, e]) => [field, e.message])
        ),
        inputs: rawData,
      };
    }
    return { success: false, message: `Erro: ${err.message}`, inputs: rawData };
  }
}
