"use server";

import { getClassTypeModel } from "@/app/models/ClassType";
import { deleteById } from "@/app/lib/helpers/deleteById";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { relatedToTitleUrl } from "../helpers/generalUtils";

export async function deleteClassTypeAction(currentState, formData ) {
  const id = formData.get("_id");

  if (!id) {
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
    await deleteById(ClassType, id);

    revalidatePath(`/admin/dashboard/${relatedToTitleUrl("classTypes")}`);
    redirect(`/admin/dashboard/${relatedToTitleUrl("classTypes")}`, RedirectType.replace);

  } catch (e) {
    return {
      success: false,
      message: `Erro ao excluir: ${e}`,
    };
  }
}
