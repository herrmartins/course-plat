import { getUserModel } from "@/app/models/User";

export async function getUsersByRole(userRoles) {
  try {
    const User = await getUserModel();
    const users = await User.find({
      roles: { $in: userRoles },
    });

    const plainUsers = JSON.parse(JSON.stringify(users));

    return plainUsers;
  } catch (error) {
    console.error("Falha ao buscar os usuários no DB:", error);
    return [];
  }
}
