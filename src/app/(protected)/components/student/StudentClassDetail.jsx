"use client";
import {useState} from "react";
import Link from "next/link";

export default function StudentClassDetail({clsData = {}, filesData = []}) {
    const cls = {
        id: clsData.id || "",
        classTitle: clsData.classTitle || "SEM TÍTULO",
        teachers: clsData.teachers || ["SEM PROFESSOR"],
        status: clsData.status || "Ativa",
        schedule: clsData.schedule || {days: ["Seg", "Qua"], time: "19:00–20:30"},
        nextSession: clsData.nextSession || {date: "2025-08-27", topic: "Present Simple — Rotinas", room: "Sala 204"},
        stats: clsData.stats || {myAttendance: "88%", myAvgScore: 8.7, tasksDue: 2},
        materials: filesData || [],
        recentActivity: clsData.recentActivity || [
            {when: "Hoje 08:40", text: "Novo material postado: 'Slides Aula 03'"},
            {when: "Ontem 21:10", text: "Aviso do professor: trazer workbook"},
            {when: "Ontem 20:35", text: "Presença registrada"},
        ],
    };

    // TODO: Retirar, provavelmente não será utilizado
    function formatBR(dateISO) {
        const d = new Date(dateISO);
        return d.toLocaleDateString("pt-BR", {day: "2-digit", month: "2-digit", year: "numeric"});
    }

    const onConfirmPresence = () => alert("Confirmar presença — mock");
    const onMessageTeacher = () => alert("Enviar mensagem ao professor — mock");
    /*const onViewTasks = () => alert("Ver tarefas — mock");
    const onViewGrades = () => alert("Ver notas — mock");*/

    return (
        <div className="max-w-6xl mx-auto p-6">
            <header className="border rounded-xl p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{cls.classTitle}</h1>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Professores: {Array.isArray(cls.teachers) ? cls.teachers.join(", ") : String(cls.teachers)} · {Array.isArray(cls.schedule?.days) ? cls.schedule.days.join(", ") : ""} · {cls.schedule?.time}
                        </p>
                    </div>
                    <span
                        className="text-xs px-2 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900">
            {cls.status}
          </span>
                </div>
            </header>

            <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/*<div className="border rounded-xl p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">Próxima sessão</h2>
                        <div className="mt-4 text-sm space-y-2">
                          <Row label="Data" value={formatBR(cls.nextSession.date)} />
                          <Row label="Tópico" value={cls.nextSession.topic} />
                          <Row label="Sala" value={cls.nextSession.room} />
                        </div>
                        <div className="mt-5 flex gap-3">
                          <Button onClick={onConfirmPresence}>Confirmar presença</Button>
                          <Button variant="secondary" onClick={onMessageTeacher}>Enviar mensagem</Button>
                        </div>
                      </div>*/}

                    <div
                        className="border rounded-xl p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">Materiais
                            da turma</h2>
                        <div className="mt-4">
                            {!!cls.materials?.length && (
                                <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                    {cls.materials.map((m, idx) => (
                                        <li key={m._id || idx} className="py-3 flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-neutral-800 dark:text-neutral-200">{m.name || m.title}</p>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">{m.size ? `${(m.size / 1024).toFixed(1)} KB` : 'Tamanho desconhecido'}</p>
                                            </div>
                                            <a
                                                className="text-sm px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition"
                                                href={m.url}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Baixar
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!cls.materials?.length && <p className="text-sm">Ainda não há materiais disponíveis…</p>}
                        </div>
                    </div>

                    {/*<div className="border rounded-xl p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
            <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">Atividade recente</h2>
            <ul className="mt-4 space-y-3">
              {cls.recentActivity.map((a, i) => (
                <li key={i} className="text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">{a.when} — </span>
                  <span className="text-neutral-800 dark:text-neutral-200">{a.text}</span>
                </li>
              ))}
            </ul>
          </div>*/}
                </div>

                <aside className="space-y-6">
                    <div
                        className="border rounded-xl p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
                        <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">Visão
                            Geral</h2>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <Stat label="Minhas presenças" value={cls.stats.myAttendance}/>
                            <Stat label="Média" value={Number(cls.stats.myAvgScore).toFixed(1)}/>
                            <Stat label="Tarefas pendentes" value={cls.stats.tasksDue}/>
                            <Stat label="Professores" value={Array.isArray(cls.teachers) ? cls.teachers.length : 1}/>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center justify-between">
                                <Link href={cls?.link || "#"}>
                                  <span
                                      className="text-sm px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition">
                                      {cls.link && (<span>Entrar na Aula</span>) || (<span>Adicionar Link</span>)}
                                  </span>
                                </Link>
                            </div>
                        </div>
                        {/*<div className="mt-5 flex flex-wrap gap-3">
                              <Button variant="secondary" onClick={onViewTasks}>Ver tarefas</Button>
                              <Button variant="secondary" onClick={onViewGrades}>Ver notas</Button>
                            </div>*/}
                    </div>
                </aside>
            </section>
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

function Button({children, onClick, variant = "primary"}) {
    const base = "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow transition-shadow";
    const styles =
        variant === "secondary"
            ? "border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            : "bg-blue-600 hover:bg-blue-700 text-white";
    return (
        <button className={`${base} ${styles}`} onClick={onClick}>
            {children}
        </button>
    );
}
