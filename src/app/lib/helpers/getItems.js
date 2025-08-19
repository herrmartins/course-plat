import { getClassModel } from "@/app/models/Class";
import { getClassTypeModel } from "@/app/models/ClassType";

export async function getItemById(Model, id) {
  return await Model.findById(id);
}

function convertClassTypeToPlain(item) {
  if (!item) return item;
  if (Array.isArray(item)) return item.map(convertClassTypeToPlain);

  const { createdAt, modifiedAt, __v, ...rest } = item;

  return {
    ...rest,
    _id: item._id ? item._id.toString() : item._id,
    files: item.files
      ? item.files.map((fileId) => fileId.toString())
      : item.files,
  };
}

export async function getAllClassItems(query = {}) {
  try {
    const ClassTypeModel = await getClassTypeModel();
    const classTypes = await ClassTypeModel.find(query)
      .select("-createdAt -modifiedAt -__v")
      .lean();

    return classTypes.map(convertClassTypeToPlain);
  } catch (error) {
    console.error("Error fetching class types:", error);
    throw new Error("Failed to fetch class types");
  }
}

export async function getTypeClassAsPlainObject(id) {
  const ClassType = await getClassTypeModel();
  const classType = await ClassType.findOne({ _id: id }).lean();

  return convertClassTypeToPlain(classType);
}

export async function getFieldItemByItem(Model, id, field) {
  const document = await Model.findById(id).select(field);
  return document ? document[field] : null;
}
