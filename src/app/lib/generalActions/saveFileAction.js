"use server";

import { getFileModel } from "@/app/models/FilesSchema";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/app/lib/utils/cloudinary";
import { auth } from "@/app/lib/utils/auth";
import { getItemById } from "@/app/lib/helpers/getItems";
import { getClassTypeModel } from "@/app/models/ClassType";
import { getClassModel } from "@/app/models/Class";
import z from "zod";
import { fileZodSchema } from "../schemas/fileZodSchema";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { relatedToTitleUrl } from "../helpers/generalUtils";

export async function saveFileAction(currentState, formData) {
  const session = await auth();
  if (!session?.user) return { error: "Not authenticated" };

  const title = formData.get("title");
  const description = formData.get("description");
  const file =
    formData.get("file") && formData.get("file").size > 0
      ? formData.get("file")
      : null;
  const fileId = formData.get("id");
  const relatedToId = formData.get("relatedToId") || null;
  const relatedToType = formData.get("relatedToType") || null;

  const rawData = {
    title,
    description,
    relatedToId,
    relatedToType,
  };

  if (!title || (!fileId && !file)) {
    return {
      success: false,
      message: "Os campos título e arquivo são obrigatórios!",
      inputs: rawData,
    };
  }

  const fileModel = await getFileModel();
  let resultFile;

  if (fileId) {
    const fileToUpdate = await getItemById(fileModel, fileId);
    if (!fileToUpdate) {
      return {
        success: false,
        message:
          "Arquivo não encontrado, vá para o formulário de adicionar arquivo!",
        inputs: rawData,
      };
    }

    let cloudinaryResult = fileToUpdate.url;
    let mimetype = fileToUpdate.mimetype;
    let size = fileToUpdate.size;

    if (file) {
      try {
        cloudinaryResult = await uploadToCloudinary(file, "iciv/ClassTypes");
        if (!cloudinaryResult) {
          return {
            success: false,
            message: "Erro ao fazer upload do arquivo!",
            inputs: rawData,
          };
        }
        await deleteFromCloudinary(fileToUpdate.url, "iciv/ClassTypes");
        mimetype = file.type;
        size = file.size;
      } catch (err) {
        console.error("❌ File upload failed:", {
          message: err.message,
          name: err.name,
          stack: err.stack,
        });
        return {
          success: false,
          message: "Erro ao fazer upload do arquivo!",
          inputs: rawData,
        };
      }
    }

    const fileDataToSave = {
      title,
      description: description || null,
      url: cloudinaryResult,
      mimetype,
      size,
      uploadedBy: session.user.id,
    };

    const validatedFields = fileZodSchema.safeParse(fileDataToSave);

    if (!validatedFields.success) {
      const validationErrors = z.flattenError(validatedFields.error);

      return {
        success: false,
        message: `Erro: ${validationErrors}`,
        inputs: fileDataToSave,
      };
    }


    // return { success: true, message: "Arquivo recebido com sucesso!" };
    try {
      Object.assign(fileToUpdate, fileDataToSave);
      resultFile = await fileToUpdate.save();

      return {
        success: true,
        message: "Arquivo atualizado com sucesso!",
        inputs: { rawData },
      };
    } catch (err) {
      console.error("❌ File update failed:", {
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
      return {
        success: false,
        message: "Erro ao atualizar o arquivo!",
        inputs: fileDataToSave,
      };
    }
  } else {
    let cloudinaryResult;
    try {
      cloudinaryResult = await uploadToCloudinary(file, "iciv/ClassTypes");
      if (!cloudinaryResult) {
        return {
          success: false,
          message: "Erro ao fazer upload do arquivo!",
          inputs: rawData,
        };
      }
    } catch (err) {
      console.error("❌ File upload failed:", {
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
      return {
        success: false,
        message: "Erro ao enviar o arquivo!",
        inputs: rawData,
      };
    }

    try {
      const createdFile = await fileModel.create({
        title,
        description,
        url: cloudinaryResult,
        mimetype: file.type,
        size: file.size,
        relatedToId,
        relatedToType,
        uploadedBy: session.user.id,
      });

      if (relatedToType) {
        let model;
        switch (relatedToType) {
          case relatedToTitleUrl("classTypes"):
            model = await getClassTypeModel();
            break;
          case relatedToTitleUrl("class"):
            model = await getClassModel();
            break;
          case "Lesson":
            model = "";
            break;
          default:
            break;
        }

        if (model && relatedToId) {
          const fileParent = await getItemById(model, relatedToId);
          if (fileParent) {
            fileParent.files.push(createdFile._id);
            await fileParent.save();
          }
        }
      }

      // return { success: true, message: "Arquivo recebido com sucesso!" };
    } catch (err) {
      console.error("❌ File creation failed:", {
        message: err.message,
        name: err.name,
        stack: err.stack,
        errors: err.errors,
      });
      return {
        success: false,
        message: "Erro ao enviar o arquivo!",
        inputs: rawData,
      };
    }
    const redirectUrl = relatedToType
      ? `/admin/dashboard/${relatedToTitleUrl(relatedToType)}/files/${relatedToId}`
      : "/admin/dashboard/files";
    revalidatePath(redirectUrl);
    redirect(redirectUrl, RedirectType.replace);
  }
}
