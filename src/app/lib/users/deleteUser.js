"use server";

import { deleteById } from "@/app/lib/helpers/deleteById";
import { getUserModel } from "@/app/models/User";
import { revalidatePath } from "next/cache";

export async function deleteUser(formData) {
  const userId = formData.get("userId");
  
  if (!userId) {
    return {
      success: false,
      message: "ID inválido.",
    };
  }

  try {
    const User = await getUserModel();
    /* I'm using this, although for now it is just
    as I transfer deleteOne to a helper function. But
    it is not so simple. The thing is that, if I want
    the deletions to follow a pattern, they will be there
    in the helper function */
    await deleteById(User, userId);
  } catch (e) {
    return {
      success: false,
      message: `Erro ao excluir: ${e}`,
    };
  }

  revalidatePath("/admin/dashboard/users");
  return {
    success: true,
    message: "Usuário excluído com sucesso!",
    redirectTo: "/admin/dashboard/users",
  };
}
