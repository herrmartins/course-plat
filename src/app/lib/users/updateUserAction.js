"use server";

import { getUserModel } from "@/app/models/User";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isBlank } from "@/app/lib/utils/formUtils";

export default async function updateUserData(currentState, formData) {
  const userId = formData.get("_id");
  const fullName = formData.get("fullName");
  const username = formData.get("username");
  const email = formData.get("email");
  const roles = formData.getAll("roles");
  const dateOfBirth = formData.get("dateOfBirth");

  const rawData = {
    id: userId,
    fullName: fullName,
    username: username,
    email: email,
    roles: roles,
    dateOfBirth: dateOfBirth,
  };

  if (isBlank(fullName) || isBlank(username) || isBlank(email)) {
    return {
      success: false,
      message: "Nome, nome do usuário e email são campos obrigatórios...",
      inputs: rawData,
    };
  }

  try {
    const User = await getUserModel();
    let userFound = await User.findOne({ _id: userId });

    if (userFound) {
      userFound = await User.findOneAndUpdate(
        { _id: userId },
        {
          fullName,
          username,
          email,
          dateOfBirth,
          roles
        },
        { new: true }
      );
    } else {
      return {
        success: false,
        message: `Erro ao atualizar o usuário...`,
        inputs: rawData,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: `Erro: ${err}`,
      inputs: rawData,
    };
  }
  revalidatePath("/admin/dashboard/users");
  redirect("/admin/dashboard/users");
}
