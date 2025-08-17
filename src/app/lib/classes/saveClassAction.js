"use server";

import { getClassModel } from "@/app/models/Class";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import z from "zod";

const classTypeSchema = z.object({
  _id: z.string({ invalid_type_error: "Classe não encontrada" }).optional(),
  classTitle: z.string({ invalid_type_error: "Título inválido" }),
  classType: z.string({ invalid_type_error: "Tipo de Classe Inválido" }),
  teachers: z.array(z.string({ invalid_type_error: "Professores inválidos" })),
  students: z.array(z.string({ invalid_type_error: "Alunos inválidos" })),
  startDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  endDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  schedule: z
    .object({
      days: z
        .array(z.string({ invalid_type_error: "Dias inválidos" }))
        .optional(),
      time: z.string({ invalid_type_error: "Horário incorreto" }),
    })
    .optional(),
  status: z.string({ invalid_type_error: "Status incorreto" }),
});

export default async function saveClassAction(currentState, formData) {
  const days = formData.getAll("days") || [];
  const time = formData.get("time") || undefined;

  const data = {
    _id: formData.get("_id") || undefined,
    classTitle: formData.get("classTitle") || undefined,
    classType: formData.get("classType") || undefined,
    teachers: formData.getAll("teachers"),
    students: formData.getAll("students"),
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    schedule: {
      days,
      time,
    },
    status: formData.get("status") || undefined,
  };

  const validatedFields = classTypeSchema.safeParse(data);

  if (!validatedFields.success) {
    const validationErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: `Erro: ${JSON.stringify(validationErrors)}`,
      inputs: data,
    };
  }

  const id = formData.get("_id");

  const isBlank = (v) =>
    v == null || v === "" || (Array.isArray(v) && v.length === 0);

  if (
    isBlank(data.classTitle) ||
    isBlank(data.classType) ||
    isBlank(data.teachers) ||
    isBlank(data.startDate) ||
    isBlank(time)
  ) {
    return {
      success: false,
      message:
        "Tipo de classe, título da classe, professor, data de início e horário são obrigatórios.",
      inputs: {
        ...data,
        days,
        time,
      },
    };
  }
  if (
    data?.endDate &&
    data?.startDate &&
    new Date(data?.endDate) < new Date(data?.startDate)
  ) {
    return {
      success: false,
      message: "Data de término não pode ser anterior à data de início.",
      inputs: data,
    };
  }
  // return {
  //   success: false,
  //   message: "ERRO PARA TESTES",
  //   inputs: {
  //     ...data,
  //     days,
  //     time,
  //   },
  // };
  try {
    const Class = await getClassModel();

    if (id) {
      await Class.updateOne({ _id: id }, data, { runValidators: true });
    } else {
      await Class.create(data);
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return {
        success: false,
        message:
          "Erro de validação, verifique se os dados foram escritos corretamente...",
        err,
        inputs: data,
      };
    }
  }

  revalidatePath("/admin/dashboard/classes/");
  redirect("/admin/dashboard/classes", RedirectType.replace);
}
