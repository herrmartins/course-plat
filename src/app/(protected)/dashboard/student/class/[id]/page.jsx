import MainSection from "@/app/(protected)/components/shared/Main";
import {getClassModel} from "@/app/models/Class";
import {getFileModel} from "@/app/models/FilesSchema";
import {getUserModel} from "@/app/models/User";
import {toPlain} from "@/app/lib/helpers/toPlain";
import StudentClassDetail from "@/app/(protected)/components/student/StudentClassDetail";
import {retrieveFiles} from "@/app/lib/helpers/retriveFiles";

export default async function StudentClassPage({ params }) {
  const { id } = await params || {};

  const ClassModel = await getClassModel();
  await getFileModel();
  await getUserModel();

  const classData = await ClassModel.findById(id)
    .populate([
      { path: "files", select: "title url size description uploadedAt mimetype" },
      { path: "students", select: "fullName" },
      { path: "teachers", select: "fullName" },
    ])
    .lean();

  const plainClassData = toPlain(classData) || {};

  const rawFiles = Array.isArray(plainClassData?.files) ? plainClassData.files : [];
  const files = retrieveFiles(rawFiles)

  const cls = {
    id: id || "",
    classTitle: plainClassData?.classTitle,
    teachers: (plainClassData?.teachers).map(t => t.fullName),
    status: "Ativa",
    schedule: { days: plainClassData?.schedule?.days || [], time: plainClassData?.schedule?.time || "" },
    nextSession: { date: "2025-08-27", topic: "Present Simple — Rotinas", room: "Sala 204" },
    stats: { myAttendance: "88%", myAvgScore: 8.7, tasksDue: 2 },
    materials: files,
    recentActivity: [
      { when: "Hoje 08:40", text: "Novo material postado: 'Slides Aula 03'" },
      { when: "Ontem 21:10", text: "Aviso do professor: trazer workbook" },
      { when: "Ontem 20:35", text: "Presença registrada" },
    ],
  };

  return (
    <MainSection>
      <StudentClassDetail clsData={cls} filesData={files} />
    </MainSection>
  );
}
