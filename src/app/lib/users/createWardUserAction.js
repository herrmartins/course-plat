"use server";

import { getUserModel } from "@/app/models/User";
import bcrypt from "bcryptjs";
import { linkWardAndGuardian } from "@/app/lib/helpers/linkWardAndGuardian";
import { isBlank } from "@/app/lib/utils/formUtils";

export default async function saveUserData(currentState, formData) {
  const fullName = formData.get("fullName") || "";
  const username = formData.get("username") || "";
  const email = formData.get("email") || "";
  const password = formData.get("password") || "";
  const confirmPassword = formData.get("confirmPassword") || "";
  const dateOfBirth = formData.get("dateOfBirth") || "";
  const guardianId = formData.get("guardianId") || "";

  const rawData = {
    fullName: fullName,
    username: username,
    email: email,
    dateOfBirth: dateOfBirth,
  };

  const passwordHash = await bcrypt.hash(password, 10);

  if (
    isBlank(fullName) ||
    isBlank(username) ||
    isBlank(email) ||
    isBlank(password)
  ) {
    return {
      success: false,
      message:
        "Nome, nome do usuário, email e senha são campos obrigatórios...",
      inputs: rawData,
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Senhas não conferem...",
      inputs: rawData,
    };
  }

  try {
    const User = await getUserModel();    

    const newUser = await User.create({
      fullName,
      username,
      email,
      passwordHash,
      dateOfBirth,
      roles: ["student"],
    });

    let linkingResult = false;

    if (newUser && newUser._id && !!guardianId)
      linkingResult = await linkWardAndGuardian([guardianId], [newUser._id]);

    /* if (true) {
      console.log("(DEBUG) NOVO USÁRIO: ", newUser)
      await newUser.deleteOne();
      return {
        success: false,
        message: `Erro ao vincular responsável e aluno, cancelando operação`,
        inputs: rawData,
      };
    } */

    if (!linkingResult) {
      await newUser.deleteOne();
      return {
        success: false,
        message: `Erroao vincular responsável e aluno, cancelando operação`,
        inputs: rawData,
      };
    }

    return {
      success: true,
      message: "Usuário criado com sucesso...",
    };
  } catch (err) {
    return {
      success: false,
      message: `Erro: ${err}`,
      inputs: rawData,
    };
  }
}
