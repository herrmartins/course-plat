"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
  try {
    await signOut({ redirect: false });

    redirect("/auth/login");
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      error.message.includes("NEXT_REDIRECT")
    ) {
      throw error;
    }

    throw new Error("Falha ao fazer logout. Tente novamente.");
  }
}
