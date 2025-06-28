"use server";

import { isBlank } from "./utils/formUtils";
import { signIn } from "./utils/auth";
import { redirect } from "next/navigation";

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
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      error.message.includes("NEXT_REDIRECT")
    ) {
      throw error;
    }

    if (error && typeof error === 'object' && error.type === "CredentialsSignin") {
      return { success: false, message: "Invalid credentials." };
    }

    return {
      success: false,
      message: `An unexpected error occurred: ${
        error.message || String(error)
      }`,
    };
  }
}
