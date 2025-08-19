import ClassTypeForm from "@/app/(protected)/admin/dashboard/classTypes/ClassTypeForm";
import { getTypeClassAsPlainObject } from "@/app/lib/helpers/getItems";

export default async function EditClassTypePage({ params }) {
  const awaitedParams = await params;
  const id = awaitedParams.id;

  const classType = await getTypeClassAsPlainObject(id);

  classType._id = classType._id.toString();

  return <ClassTypeForm classType={classType} />;
}
