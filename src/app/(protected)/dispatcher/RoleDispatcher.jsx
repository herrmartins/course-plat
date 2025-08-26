"use client";

import DashboardCard from "@/app/(protected)/components/shared/DashboardCard";

const roleConfig = {
  admin: {
    title: "Administrador",
    description: "Acesse o painel administrativo completo.",
    buttonText: "Entrar como Admin",
    buttonColor: "indigo",
    link: "/admin/dashboard",
  },
  teacher: {
    title: "Professor",
    description: "Gerencie suas turmas e alunos.",
    buttonText: "Entrar como Professor",
    buttonColor: "green",
    link: "/dashboard/teacher",
  },
  parent: {
    title: "Responsável",
    description: "Acompanhe seus filhos e veja o progresso deles.",
    buttonText: "Entrar como Responsável",
    buttonColor: "purple",
    link: "/dashboard/guardian",
  },
  student: {
    title: "Aluno",
    description: "Veja suas aulas, atividades e progresso.",
    buttonText: "Entrar como Aluno",
    buttonColor: "sky",
    link: "/dashboard/student",
  },
};

export default function RoleDispatcher({ userRoles }) {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow-lg">
        Escolha seu destino
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Você possui mais de um papel. Escolha abaixo como deseja acessar:
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl mx-auto">
        {userRoles.map((role) => {
          const cfg = roleConfig[role];
          if (!cfg) return null;
          return (
            <DashboardCard
              key={role}
              title={cfg.title}
              description={cfg.description}
              buttonText={cfg.buttonText}
              buttonColor={cfg.buttonColor}
              link={cfg.link}
            />
          );
        })}
      </div>
    </main>
  );
}
