export async function getItemById(Model, id) {
  return await Model.findById(id);
}

export async function getFieldItemByItem(Model, id, field) {
  const document = await Model.findById(id).select(field);
  return document ? document[field] : null;
}
