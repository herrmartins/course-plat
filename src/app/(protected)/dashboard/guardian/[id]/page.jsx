import { getClassModel } from "@/app/models/Class";
import { getUserModel } from "@/app/models/User";
import SimplePageInnerTitle from "@/app/(protected)/components/shared/SimplePageInnerTitle";
import { ClassCardComponent } from "@/app/(protected)/components/shared/ClassCardsComponent";
import {toPlain} from "@/app/lib/helpers/toPlain";

async function GuardianDashboardPage({params}) {
    const {id} = await params;

    await getUserModel();

    const ClassModel = await getClassModel();
    const classesRaw = await ClassModel.find({ students: id })
        .populate([{ path: "teachers", select: "fullName email" }, { path: "students", select: "fullName" }])
        .select("classTitle classType teachers startDate endDate schedule status price")
        .lean();
    const classes = toPlain(classesRaw);
    console.log("Student classes", classes);

    return (<>
            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow-lg">
                    Painel do Responsável
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Gerencie as turmas e atividades dos alunos sob sua responsabilidade
                </p>
                <div className="flex flex-col mt-3">
                    <div>
                        <SimplePageInnerTitle title="Turmas atuais"/>
                    </div>
                    <div>
                        <ClassCardComponent classes={classes.filter(c => c.status === 'active')}/>
                    </div>
                </div>

                <div className="flex flex-col mt-3">
                    <SimplePageInnerTitle title="Turmas arquivadas"/>
                    <div>
                        <ClassCardComponent classes={classes.filter(c => c.status !== 'active')}/>
                    </div>
                </div>
            </main>
        </>);
}

export default GuardianDashboardPage;
