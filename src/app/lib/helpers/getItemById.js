export async function getItemById(Model, id) {
  return await Model.findById(id);
}