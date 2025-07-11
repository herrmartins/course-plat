import connectDB from "@/app/config/mongodb";
import { getUserModel } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();

  try {
    const UserSchema = await getUserModel();
    const users = await UserSchema.find({}).lean();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Erro na API /api/users:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar os usuários.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
