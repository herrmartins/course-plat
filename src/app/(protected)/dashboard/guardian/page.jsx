import {getUserModel} from "@/app/models/User";
import {HiUserGroup} from "react-icons/hi";
import Link from "next/link";
import {auth} from "@/app/lib/utils/auth";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import WardsTable from "./components/WardsTable";
import PageTitle from "@/app/(protected)/components/shared/PageTitle";

async function GuardianDashboardPage() {
    const session = await auth();
    const userId = session?.user?.id;
    const UserModel = await getUserModel();

    const loggedUser = await UserModel.findOne({_id: userId}).populate("wardAccounts", "-modifiedAt -createdAt -dateOfBirth").lean();

    return (
        <main className="flex-1 p-8 overflow-y-auto">
            <PageTitle title="Painel do Responsável"
                       subTitle="Gerencie seus filhos (ou pupilos), suas turmas e atividades..."></PageTitle>

            <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl mx-auto">
                {!loggedUser.wardAccounts.length && (
                    <div className="flex flex-col items-center justify-center text-center py-10">
                        <Link href="/dashboard/guardian/register-student">
                            <p className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                                + Adicionar Novo Aluno
                            </p>
                        </Link>
                        <HiUserGroup className="text-indigo-500 w-[100px] h-[100px] sm:w-[250px] sm:h-[250px]"/>
                        <p className="mt-6 text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 max-w-md">
                            Você ainda não tem estudantes cadastrados...
                        </p>
                    </div>
                )}

                {loggedUser.wardAccounts.length && (
                    <div className="flex flex-col items-center justify-center text-center py-10">
                        <div className="flex justify-center">
                            <SimplePageInnerTitle title="Alunos"/>
                        </div>
                        <WardsTable wards={loggedUser.wardAccounts}/>
                    </div>
                )}
            </div>
        </main>
    );
}

export default GuardianDashboardPage;
