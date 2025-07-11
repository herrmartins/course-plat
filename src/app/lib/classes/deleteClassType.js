"use server";

import { getClassTypeModel } from "@/app/models/ClassType";
import { deleteById } from "@/app/lib/helpers/deleteById";

export async function deleteClassTypeAction({_id}) {
  console.log("TIPO DE CLASSE: ", _id)

  if (!_id) {
    return {
      success: false,
      message: "ID inválido.",
    };
  }

  try {
    const ClassType = await getClassTypeModel();
    /* I'm using this, although for now it is just
    as I transfer deleteOne to a helper function. But
    it is not so simple. The thing is that, if I want
    the deletions to follow a pattern, they will be there
    in the helper function */
    await deleteById(ClassType, _id);

    return {
      success: true,
      message: "Tipo de aula excluído com sucesso!",
      redirectTo: "/admin/dashboard/class-types",
    };
  } catch (e) {
    return {
      success: false,
      message: `Erro ao excluir: ${e}`,
    };
  }
}
