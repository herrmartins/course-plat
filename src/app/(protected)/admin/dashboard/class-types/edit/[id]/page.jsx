import { getClassTypeModel } from "@/app/models/ClassType";
import ClassTypeForm from "@/app/(protected)/admin/dashboard/class-types/ClassTypeForm";

export default async function EditClassTypePage({ params }) {
  const id = params.id;

  const ClassType = await getClassTypeModel();
  const classType = await ClassType.findById(id).lean();

  classType._id = classType._id.toString();

  return <ClassTypeForm classType={classType} />;
}
