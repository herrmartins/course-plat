import { getUserModel } from "@/app/models/User";
import { getClassModel } from "@/app/models/Class";
import Link from "next/link";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import WardsTable from "./components/WardsTable";
import PageTitle from "@/app/(protected)/components/shared/PageTitle";
import React from "react";
import { auth } from "@/app/lib/utils/auth";

async function GuardianDashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const UserModel = await getUserModel();

  const loggedUser = await UserModel.findOne({ _id: userId })
    .populate("wardAccounts", "-modifiedAt -createdAt -dateOfBirth")
    .lean();

  const wardIds = loggedUser.wardAccounts.map((ward) => ward._id);
  const ClassModel = await getClassModel();
  const classes = await ClassModel.find({ students: { $in: wardIds } }).lean();

  const hasWards = loggedUser.wardAccounts && loggedUser.wardAccounts.length > 0;

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <PageTitle
        title="Painel do Responsável"
        subTitle="Gerencie seus filhos (ou pupilos), suas turmas e atividades..."
      />

      <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl mx-auto">
        {!hasWards ? (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <p className="mb-4 text-gray-600">Você ainda não registrou nenhum aluno.</p>
            <Link
              href="/dashboard/guardian/register-student"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:opacity-90"
            >
              Registrar aluno
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10 w-full">
            <div className="flex justify-center">
              <SimplePageInnerTitle title="Alunos" />
            </div>
            <WardsTable wards={loggedUser.wardAccounts} />
          </div>
        )}
      </div>
    </main>
  );
}

export default GuardianDashboardPage;
