import connectDB from "@/app/config/mongodb";
import { getClassModel } from "@/app/models/Class";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();

  try {
    const Class = await getClassModel();
    const classes = await Class.find({})
      .populate("classType")
      .populate("teacher")
      .populate("students")
      .populate("files")
      .lean();

    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error("Erro na API /api/classes:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar aulas.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}