"use client";
import React from "react";
import Link from "next/link";

import {
    ClipboardDocumentListIcon,
    CloudArrowUpIcon,
    UserGroupIcon,
    CheckBadgeIcon,
    MegaphoneIcon,
    PencilSquareIcon,
    PaperAirplaneIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    FolderOpenIcon,
    DocumentArrowDownIcon,
    PlayCircleIcon,
} from "@heroicons/react/24/outline";

export default function ClassDetail({clsData = {}, filesData = []}) {
    const cls = {
        id: clsData.id || "CLS-2025-ENG-A1",
        classTitle: clsData.classTitle || "Inglês — A1 Noite",
        teachers: clsData.teachers || ["Fulano de tal"],
        status: clsData.status || "Em andamento",
        schedule: clsData.schedule || {days: ["Seg", "Qua"], time: "19:00–20:30"},
        nextSession:
            clsData.nextSession || {
                date: "2025-08-27",
                topic: "Present Simple — Rotinas",
                room: "Sala 204",
            },
        stats: clsData.stats || {
            students: 18,
            attendanceRate: 0.92,
            avgScore: 8.1,
            pendingSubmissions: 5,
        },
        materials: filesData || [],
        recentActivity: clsData.recentActivity || [
            {when: "Hoje 09:20", text: "3 alunos enviaram tarefa — 'Daily routine (texto curto)'"},
            {when: "Ontem 21:05", text: "Você postou 'Aviso: trazer workbook assinado'"},
            {when: "Ontem 20:40", text: "Presenças registradas (16/18)"},
        ],
    };

    const statusColors = {
        "Ativa":
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900",
        "Concluída":
            "bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800",
        Pausada:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900",
    };

    function formatBR(dateISO) {
        const d = new Date(dateISO);
        return d.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    const onAssignTask = () => alert("Atribuir Tarefa — mock");
    const onUploadMaterial = () => alert("Upload de Material — mock");
    const onTakeAttendance = () => alert("Registrar Presenças — mock");
    const onStartClass = () => alert("Iniciar Aula — mock");
    const onPostAnnouncement = () => alert("Postar Aviso — mock");
    const onCreateQuiz = () => alert("Criar Quiz — mock");
    const onViewSubmissions = () => alert("Ver Entregas — mock");
    const onManageStudents = () => alert("Gerenciar Alunos — mock");
    const onExportRoster = () => alert("Exportar Lista — mock");
    const onScheduleSession = () => alert("Agendar Sessão — mock");
    const onMessageClass = () => alert("Enviar Mensagem à Turma — mock");
    const onDownloadAll = () => alert("Baixar tudo — mock");

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div
                className="border rounded-xl p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {cls.classTitle}
                        </h1>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {Array.isArray(cls.teachers) ? cls.teachers.join(", ") : String(cls.teachers)} • {Array.isArray(cls.schedule?.days) ? cls.schedule.days.join(", ") : ""} • {cls.schedule?.time}
                        </p>
                    </div>
                    <span
                        className={`text-xs px-2 py-1 rounded-full border ${
                            statusColors[cls.status] ||
                            "bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800"
                        }`}
                        title="Status da turma"
                    >
            {cls.status}
          </span>
                </div>

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    <ActionBtn icon={<ClipboardDocumentListIcon className="w-5 h-5"/>} label="Atribuir Tarefa"
                               onClick={onAssignTask}/>
                    <Link href={`/files/class/${cls.id}/add`}>
                        <ActionBtn icon={<CloudArrowUpIcon className="w-5 h-5"/>} label="Upload Material" />
                    </Link>
                    <ActionBtn icon={<CheckBadgeIcon className="w-5 h-5"/>} label="Presenças"
                               onClick={onTakeAttendance}/>
                    <ActionBtn icon={<PencilSquareIcon className="w-5 h-5"/>} label="Criar Quiz"
                               onClick={onCreateQuiz}/>
                    <ActionBtn icon={<MegaphoneIcon className="w-5 h-5"/>} label="Postar Aviso"
                               onClick={onPostAnnouncement}/>
                    <ActionBtn icon={<PlayCircleIcon className="w-5 h-5"/>} label="Iniciar Aula"
                               onClick={onStartClass}/>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <SectionHeader title="Próxima sessão" icon={<CalendarDaysIcon className="w-5 h-5"/>}/>
                        <div className="mt-4 text-sm space-y-2">
                            <Row label="Data" value={formatBR(cls.nextSession.date)}/>
                            <Row label="Tópico" value={cls.nextSession.topic}/>
                            <Row label="Sala" value={cls.nextSession.room}/>
                        </div>
                        <div className="mt-5 flex gap-3">
                            <Button onClick={onScheduleSession} variant="secondary"
                                    icon={<CalendarDaysIcon className="w-5 h-5"/>}>
                                Agendar / Editar
                            </Button>
                            <Button onClick={onMessageClass} icon={<PaperAirplaneIcon className="w-5 h-5"/>}>
                                Mensagem à turma
                            </Button>
                        </div>
                    </Card>

                    <Card>
                        <SectionHeader title="Materiais da turma" icon={<FolderOpenIcon className="w-5 h-5"/>}/>
                        <ul className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
                            {!!filesData?.length && (
                                <ul>
                                    {filesData.map((m, idx) => (
                                        <li key={m._id || idx} className="py-3 flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-neutral-800 dark:text-neutral-200">{m.name || m.title}</p>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    {m.size ? `${(m.size / 1024).toFixed(1)} KB` : 'Tamanho desconhecido'}
                                                </p>
                                            </div>
                                            <button
                                                className="text-sm px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition"
                                                onClick={() => window.open(m.url, '_blank')}
                                            >
                                                Abrir
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!filesData?.length && (
                                <p className="mt-4 grid grid-cols-2 gap-3 text-sm">Não há materiais disponíveis...</p>
                            )}
                        </ul>
                        <div className="mt-4 flex gap-3">
                            <Link href={`/files/class/${cls.id}/add`}>
                                <Button icon={<CloudArrowUpIcon className="w-5 h-5"/>}>
                                    Upload novo
                                </Button>
                            </Link>

                            {/*<Button onClick={onDownloadAll} variant="secondary"*/}
                            {/*        icon={<DocumentArrowDownIcon className="w-5 h-5"/>}>*/}
                            {/*    Baixar tudo*/}
                            {/*</Button>*/}
                        </div>
                    </Card>

                    <Card>
                        <SectionHeader title="Atividade recente" icon={<ChartBarIcon className="w-5 h-5"/>}/>
                        <ul className="mt-4 space-y-3">
                            {cls.recentActivity.map((a, i) => (
                                <li key={i} className="text-sm">
                                    <span className="text-neutral-500 dark:text-neutral-400">{a.when} — </span>
                                    <span className="text-neutral-800 dark:text-neutral-200">{a.text}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <SectionHeader title="Visão rápida" icon={<UserGroupIcon className="w-5 h-5"/>}/>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <Stat label="Alunos" value={cls.stats.students}/>
                            <Stat label="Presenças" value={`${Math.round(cls.stats.attendanceRate * 100)}%`}/>
                            <Stat label="Média notas" value={cls.stats.avgScore.toFixed(1)}/>
                            <Stat label="Pendentes" value={cls.stats.pendingSubmissions}/>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Button onClick={onManageStudents} variant="secondary"
                                    icon={<UserGroupIcon className="w-5 h-5"/>}>
                                Gerenciar alunos
                            </Button>
                            <Button onClick={onExportRoster} variant="secondary"
                                    icon={<DocumentArrowDownIcon className="w-5 h-5"/>}>
                                Exportar lista
                            </Button>
                            <Button onClick={onViewSubmissions} variant="secondary"
                                    icon={<ClipboardDocumentListIcon className="w-5 h-5"/>}>
                                Ver entregas
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function Card({children}) {
    return (
        <div
            className="border rounded-xl p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:shadow-md transition-shadow">
            {children}
        </div>
    );
}

function SectionHeader({title, icon}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-neutral-700 dark:text-neutral-200">{icon}</span>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{title}</h2>
        </div>
    );
}

function Row({label, value}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
            <span className="text-neutral-800 dark:text-neutral-200">{value || "—"}</span>
        </div>
    );
}

function Stat({label, value}) {
    return (
        <div
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50 dark:bg-neutral-800/40">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
            <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{value}</p>
        </div>
    );
}

function Button({children, onClick, icon, variant = "primary"}) {
    const base =
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow transition-shadow";
    const styles =
        variant === "secondary"
            ? "border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            : "bg-blue-600 hover:bg-blue-700 text-white";
    return (
        <button className={`${base} ${styles}`} onClick={onClick}>
            {icon}
            {children}
        </button>
    );
}

function ActionBtn({icon, label, onClick}) {
    return (
        <button
            onClick={onClick}
            className="w-full h-full border rounded-xl p-3 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:shadow-md transition-shadow text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2"
            title={label}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
}
