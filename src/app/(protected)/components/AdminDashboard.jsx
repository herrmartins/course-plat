import DashboardCard from "./shared/DashboardCard";
import { relatedToTitleUrl } from "@/app/lib/helpers/generalUtils";

function AdminDashboard() {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow-lg">
        Dashboard Administrativo
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Gerencie os tipos de classes, como "Starters" etc.
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl mx-auto">
        <DashboardCard
          title="Tipos de Turmas"
          description="Gerencie os tipos de turmas, como 'Starters' etc."
          buttonText="Gerenciar"
          buttonColor="indigo"
          link={`/admin/dashboard/${relatedToTitleUrl("classTypes")}`}
        />

        <DashboardCard
          title="Turmas"
          description="Gerencie as turmas ativas atualmente, bem como as arquivadas."
          buttonText="Gerenciar"
          buttonColor="green"
          link="/admin/dashboard/class"
        />

        <DashboardCard
          title="Usuários & Papéis"
          description="Configure permissões e gerencie contas de professores e alunos."
          buttonText="Gerenciar Usuários"
          buttonColor="purple"
          link="/admin/dashboard/users"
        />
      </div>
    </main>
  );
}

export default AdminDashboard;
