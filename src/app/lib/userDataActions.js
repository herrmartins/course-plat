"use server";

import { getUserModel } from "../models/User";
import bcrypt from "bcryptjs";

export default async function saveUserData(currentState, formData) {
  const fullName = formData.get("fullName");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const dateOfBirth = formData.get("dateOfBirth");

  const rawData = {
    fullName: fullName,
    username: username,
    email: email,
    dateOfBirth: dateOfBirth,
  };

  const passwordHash = await bcrypt.hash(password, 10);

  function isBlank(value) {
    return value === null || value.trim() === "";
  }

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
    console.log("PASSWORD COM ERRO")
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
      role: "parent",
      canLogin: true,
    });

    return {
      success: true,
      message: "Usuário criado com sucesso..."
    };
  } catch (err) {
    return {
      success: false,
      message: `Erro: ${err}`,
      inputs: rawData,
    };
  }
}
