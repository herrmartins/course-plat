import connectDB from "@/app/config/mongodb";
import { getFileModel } from "@/app/models/FilesSchema";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const relatedToType = searchParams.get("relatedToType");
  const relatedToId = searchParams.get("relatedToId");

  if (!relatedToType || !relatedToId) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar os arquivos. Não foram passados o tipo de relação ou id...",
        error: error.message,
      },
      { status: 500 }
    );
  }

  try {
    const FileModel = await getFileModel();
    const files = await FileModel.find({ relatedToType, relatedToId }).lean();

    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error("Erro na API /api/files/[relatedToType]/[realtedToId]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar os arquivos.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
