"use server";

import { getClassTypeModel } from "@/app/models/ClassType";

export default async function saveClassTypeAction(currentState, formData) {
  const id = formData.get("_id");
  const title = formData.get("title");
  const description = formData.get("description");
  const ageRange = formData.get("ageRange");
  const price = formData.get("price");

  const rawData = {
    title,
    description,
    ageRange,
    price,
  };

  function isBlank(value) {
    return value === null || value.trim() === "";
  }

  if (isBlank(title) || isBlank(price)) {
    return {
      success: false,
      message: "Título e preço são campos obrigatórios...",
      inputs: rawData,
    };
  }

  try {
    const classTypeModel = await getClassTypeModel();
    if (id) {
      await classTypeModel.updateOne(
        { _id: id },
        { title, description, ageRange, price }
      );
    } else {
      await classTypeModel.create({
        title,
        description,
        ageRange,
        price,
      });
    }
    
    return {
      success: true,
      redirectTo: "/admin/dashboard/class-types",
    };
  } catch (e) {
    return {
      success: false,
      message: `Erro: ${e}`,
      inputs: rawData,
    };
  }
}
