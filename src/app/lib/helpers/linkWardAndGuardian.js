import { getUserModel } from "@/app/models/User";
import { Types } from "mongoose";
const { ObjectId } = require('mongodb');

const User = await getUserModel();

export async function linkWardAndGuardian(guardianIds = [], wardIds = []) {
  const toObjectIds = (ids = []) =>
    ids.map((id) => new ObjectId(id));

  const guardianOids = toObjectIds(guardianIds);
  const wardOids = toObjectIds(wardIds);

  try {
    await User.updateMany(
      { _id: { $in: guardianOids } },
      { $addToSet: { wardAccounts: { $each: wardOids } } }
    );

    await User.updateMany(
      { _id: { $in: wardOids } },
      { $addToSet: { guardiansAccounts: { $each: guardianOids } } }
    );

    return true;
  } catch (err) {
    console.error("Erro de vinculação entre responsáveis e aluno:", err);
    return false;
  }
}
