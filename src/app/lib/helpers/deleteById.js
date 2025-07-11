export async function deleteById(Model, id) {
  await Model.deleteOne({ _id: id });
}