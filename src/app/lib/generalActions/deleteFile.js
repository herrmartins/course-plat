"use server";

import { getFileModel } from "@/app/models/FilesSchema";
import { deleteById } from "@/app/lib/helpers/deleteById";
import { revalidatePath } from "next/cache"; // Replace redirect with revalidatePath
import { deleteFromCloudinary } from "../utils/cloudinary";
import { getItemById } from "../helpers/getItems";

export async function deleteFile({ _id, redirectTo }) {
  if (!_id) {
    return {
      success: false,
      message: "ID inválido.",
    };
  }

  try {
    const FileModel = await getFileModel();
    const file = await getItemById(FileModel, _id);

    await deleteById(FileModel, _id);
    await deleteFromCloudinary(file.url, "iciv/ClassTypes");
  } catch (e) {
    return {
      success: false,
      message: `Erro ao excluir arquivo: ${e.message}`,
    };
  }
  
  if (redirectTo) {
    revalidatePath(redirectTo);
  }

  return {
    success: true,
    message: "Arquivo excluído com sucesso!",
    redirectTo: redirectTo,
  };
}