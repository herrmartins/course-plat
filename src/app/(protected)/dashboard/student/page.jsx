import {auth} from "@/auth";
import StudentDashboard from "@/app/(protected)/dashboard/student/Dashboard"
import {getUserModel} from "@/app/models/User";
import {redirect} from "next/navigation";
import {getClassModel} from "@/app/models/Class";
import {toPlain} from "@/app/lib/helpers/toPlain";
import PageTitle from "@/app/(protected)/components/shared/PageTitle";

async function StudentDashboardPage() {
    const session = await auth();
    if (!session) redirect("/auth/login");
    const UserModel = await getUserModel();
    const ClassModel = await getClassModel();

    const user = await UserModel.findOne({_id: session.user.id}).lean();

    const userClasses = await ClassModel.find({students: user._id}).lean();
    const plainUserClasses = toPlain(userClasses);

    console.log("USER CLASSES: ", plainUserClasses);

    return (
        <>
            <PageTitle title="Painel do Estudante" subTitle="Administre suas turmas, faça as tarefas, acesse o link da aula"/>
            <StudentDashboard classes={plainUserClasses}/>
        </>
    );
}

export default StudentDashboardPage;
