import connectDB from "@/app/config/mongodb";
import { getClassTypeModel } from "@/app/models/ClassType";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();

  try {
    const ClassType = await getClassTypeModel();
    const classTypes = await ClassType.find({}).lean();

    return NextResponse.json(classTypes, { status: 200 });
  } catch (error) {
    console.error("Erro na API /api/classtypes:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar tipos de classe.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
