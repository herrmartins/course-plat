"use server";

import { getFileModel } from "@/app/models/FilesSchema";
import { uploadToCloudinary, deleteFromCloudinary } from "@/app/lib/utils/cloudinary";
import { auth } from "../utils/auth";
import { getItemById } from "../helpers/getItemById";
import { getClassTypeModel } from "@/app/models/ClassType";

export async function saveFileAction(currentState, formData) {
  const session = await auth();
  if (!session?.user) return { error: "Not authenticated" };

  const title = formData.get("title");
  const description = formData.get("description");
  const file = formData.get("file") && formData.get("file").size > 0 ? formData.get("file") : null;
  const fileId = formData.get("id");
  const relatedToId = formData.get("relatedToId") || null;
  const relatedToType = formData.get("relatedToType") || null;

  const rawData = {
    title,
    description,
    relatedToId,
    relatedToType,
  };

  if (!title || !description || (!fileId && !file)) {
    return {
      success: false,
      message: "Os campos são obrigatórios!",
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
        message: "Arquivo não encontrado!",
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

    try {
      Object.assign(fileToUpdate, fileDataToSave);
      resultFile = await fileToUpdate.save();
      
      return { success: true, message: "Arquivo atualizado com sucesso!", inputs: {rawData} };
    } catch (err) {
      console.error("❌ File update failed:", {
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
      return {
        success: false,
        message: "Erro ao atualizar o arquivo!",
        inputs: rawData,
      };
    }
  } else {
    if (!file) {
      return {
        success: false,
        message: "Arquivo é obrigatório para novos uploads!",
        inputs: rawData,
      };
    }

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
          case "ClassTypes":
            model = await getClassTypeModel();
            break;
          case "Class":
            model = "";
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

      return { success: true, message: "Arquivo recebido com sucesso!" };
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
  }
}