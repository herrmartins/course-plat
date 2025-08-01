"use server";

import { getFileModel } from "@/app/models/FilesSchema";
import { uploadToCloudinary } from "@/app/lib/utils/cloudinary";
import { auth } from "../utils/auth";
import { getItemById } from "../helpers/getItemById";
import { getClassTypeModel } from "@/app/models/ClassType";

export async function saveFileAction(currentState, formData) {
  const session = await auth();
  if (!session?.user) return { error: "Not authenticated" };

  const title = formData.get("title");
  const description = formData.get("description");
  const file = formData.get("file");
  const relatedToId = formData.get("relatedToId") || null;
  const relatedToType = formData.get("relatedToType") || null;

  const cloudinaryResult = await uploadToCloudinary(file, "iciv/ClassTypes");

  const fileSchema = await getFileModel();
  try {
    const createdFile = await fileSchema.create({
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
      let model = "";
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

      if (model) {
        const fileParent = await getItemById(model, relatedToId);
        if (fileParent) {
          fileParent.files.push(createdFile._id);
          await fileParent.save();
        }
      }
    }

    return { success: true, message: "Arquivo recebido com sucesso!" };
  } catch (err) {
    console.error("❌ File upload failed:", {
      message: err.message,
      name: err.name,
      stack: err.stack,
      errors: err.errors,
    });

    return { success: false, message: "Erro ao enviar o arquivo!" };
  }
}
