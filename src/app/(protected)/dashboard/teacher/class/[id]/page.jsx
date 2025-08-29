import MainSection from "@/app/(protected)/components/shared/Main";
import ClassDetail from "@/app/(protected)/components/teacher/ClassDetail";
import {getClassModel} from "@/app/models/Class";
import {getFileModel} from "@/app/models/FilesSchema";
import {getUserModel} from "@/app/models/User";
import {toPlain} from "@/app/lib/helpers/toPlain";

export default async function TeacherClassPage({params}) {
    const {id} = await params || {};
    const ClassModel = await getClassModel();
    await getFileModel();
    await getUserModel();

    const classData = await ClassModel.findById(id)
        .populate(
            [
                {
                    path: "files",
                    select: "title url size description uploadedAt mimetype"
                },
                {
                    path: "students",
                    select: "fullName"
                },
                {
                    path: "teachers",
                    select: "fullName"
                }
            ])
        .lean();

    const plainClassData = toPlain(classData);

    const rawFiles = Array.isArray(plainClassData?.files) ? plainClassData.files : [];
    const files = rawFiles.map((f) => ({
        name: f?.title || f?.name || "Arquivo",
        size: f?.size,
        type: f?.mimetype || "",
    }));

    // TODO: Replace with real DB fetches. For now, keep hardcoded mock data using the id param.
    // TODO: take off the ai generated inexisting params
    const cls = {
        id: id || "",
        classTitle: plainClassData?.classTitle || "",
        teachers: plainClassData?.teachers.map(t => t.fullName) || [],
        status: plainClassData?.status,
        schedule: {days: plainClassData?.schedule?.days || [], time: plainClassData?.schedule?.time || []},
        nextSession: {date: "2025-08-27", topic: "Present Simple — Rotinas", room: "Sala 204"},
        stats: {students: plainClassData?.students?.length || 0, attendanceRate: 0.92, avgScore: 8.1, pendingSubmissions: 5},
        link: plainClassData?.link,
        materials: [
            {name: "Slides Aula 03 - Present Simple.pdf", size: "2.1 MB"},
            {name: "Workbook — Unidade 1 (exercícios).pdf", size: "1.4 MB"},
            {name: "Leitura curta — Daily Routines.txt", size: "8 KB"},
        ],
        recentActivity: [
            {when: "Hoje 09:20", text: "3 alunos enviaram tarefa — 'Daily routine (texto curto)'"},
            {when: "Ontem 21:05", text: "Você postou 'Aviso: trazer workbook assinado'"},
            {when: "Ontem 20:40", text: "Presenças registradas (16/18)"},
        ],
    };

    return (
        <MainSection>
            <ClassDetail clsData={cls} filesData={files}/>
        </MainSection>
    );
}