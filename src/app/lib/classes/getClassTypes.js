import { getClassTypeModel } from "@/app/models/ClassType";


export async function getClassTypes() {
  try {
    const ClassType = await getClassTypeModel();
    const classTypes = await ClassType.find({});
    const plainClassTypes = JSON.parse(JSON.stringify(classTypes));

    return plainClassTypes;
  } catch (error) {
    console.error("Falha ao buscar os usuários diretamente do DB:", error);
    return [];
  }
}