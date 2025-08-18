"use server";

import { getClassModel } from "@/app/models/Class";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import z from "zod";
import { classSchema } from "@/app/lib/schemas/classSchema";
import { getUserModel } from "@/app/models/User";
import { getClassTypeModel } from "@/app/models/ClassType";
import { DAYS } from "@/app/lib/utils/days";
import { getItemById } from "../helpers/getItemById";

export default async function saveClassAction(currentState, formData) {
  console.log("DADOS: ", ...formData)
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

  const validatedFields = classSchema.safeParse(data);

  if (!validatedFields.success) {
    const validationErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: `Erro: ${JSON.stringify(validationErrors)}`,
      inputs: data,
    };
  } else {
    const { teachers, students, classType, startDate, endDate, schedule } =
      validatedFields.data;

    try {
      const User = await getUserModel();
      const [teachersExist, studentsExist] = await Promise.all([
        User.find({ _id: { $in: teachers } }),
        User.find({ _id: { $in: students } }),
      ]);

      if (teachers.length !== teachersExist.length) {
        return {
          success: false,
          message: "Erro: um ou mais professores não foram encontrados.",
          inputs: validatedFields.data,
        };
      }

      if (students.length !== studentsExist.length) {
        return {
          success: false,
          message: "Erro: um ou mais alunos não foram encontrados.",
          inputs: validatedFields.data,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Erro ao verificar professores/alunos. ${error}`,
      };
    }
    const ClassTypeModel = await getClassTypeModel();
    try {
      const classTypeExists = await getItemById(ClassTypeModel, classType);
      if (!classTypeExists) {
        return {
          success: false,
          message: "O tipo de turma selecionado não existe.",
          inputs: validatedFields.data,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Erro ao verificar o tipo de turma.",
      };
    }

    if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
      return {
        success: false,
        message: "A data de término não pode ser anterior à data de início.",
        inputs: validatedFields.data,
      };
    }
    const {days} = schedule;

    if (!days.every((day) => DAYS.includes(day))) {
      return {
        success: false,
        message: "Erro ao processar os dias das aulas.",
        inputs: validatedFields.data,
      };
    }

  }

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
    const id = formData.get("_id");

    if (id) {
      await Class.updateOne({ _id: id }, data, { runValidators: true });
    } else {
      await Class.create(data);
    }
  } catch (err) {
    return {
      success: false,
      message: `Erro ao criar ou alterar turma ${err}`,
      err,
      inputs: data,
    };
  }

  revalidatePath("/admin/dashboard/class/");
  redirect("/admin/dashboard/class", RedirectType.replace);
}
