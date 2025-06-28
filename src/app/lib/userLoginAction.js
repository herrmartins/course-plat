"use server";

import { isBlank } from "./utils/formUtils";
import { signIn } from "./utils/auth";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function userLogin(currentState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  const rawData = {
    username: username,
  };

  if (isBlank(username) || isBlank(password)) {
    return {
      success: false,
      message: "Nome do usuário e senha são obrigatórios para fazer login...",
      inputs: rawData,
    };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/auth/dispatcher",
    });
  } catch (error) {
    /* Totalmente contraintuitivo, mas é como o server action do Next funciona
    Como o redirect vai ser executado no servidor, vai dar pau e tem que "lançado"
    para que não dê pau "de fato...". */
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      error.message.includes("NEXT_REDIRECT")
    ) {
      throw error;
    }

    if (
      error &&
      typeof error === "object" &&
      error.type === "CredentialsSignin"
    ) {
      return { success: false, message: "Credenciais inválidas." };
    }

    return {
      success: false,
      message: `Um erro inesperado ocorreu: ${error.message || String(error)}`,
    };
  }
}
