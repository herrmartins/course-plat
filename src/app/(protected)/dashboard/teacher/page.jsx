import React from "react";
import { auth } from "@/auth";
import { getUserModel } from "@/app/models/User";
import {redirect} from "next/navigation";
import PageTitle from "@/app/(protected)/components/shared/PageTitle";
import MainSection from "@/app/(protected)/components/shared/Main";
import {getClassModel} from "@/app/models/Class";
import {toPlain} from "@/app/lib/helpers/toPlain";
import {ClassCardComponent} from "@/app/(protected)/components/shared/ClassCard";

async function TeacherDashboardPage() {
    const session = await auth();
    if (!session) redirect("/auth/login");
    const UserModel = await getUserModel();
    const user = await UserModel.findOne({_id: session.user.id}).lean();

    const ClassModel = await getClassModel();
    const teachersClasses = await ClassModel.find({teachers: user._id}).lean();
    const plainClassObjects = toPlain(teachersClasses)

    return (
        <MainSection>
            <PageTitle title="Painel do Professor" subTitle="Administre suas turmas, atribua tarefas, notas etc."/>
            <ClassCardComponent classes={plainClassObjects}/>
        </MainSection>
    );
}

export default TeacherDashboardPage;
