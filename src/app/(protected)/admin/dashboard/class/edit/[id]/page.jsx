import React from "react";
import PageSectionTitle from "@/app/(protected)/components/shared/PageSectionTitle";
import ClassForm from "@/app/(protected)/admin/dashboard/class/components/ClassForm";
import {getUsersByRole} from "@/app/lib/users/getUsersByRole";
import {getClassTypes} from "@/app/lib/classes/getClassTypes";
import {getClassModel} from "@/app/models/Class";

async function EditClass({params}) {
    const {id} = await params;

    const teachers = await getUsersByRole(["teacher"]);
    const students = await getUsersByRole(["student"]);
    const classTypes = await getClassTypes();
    const Class = await getClassModel();
    const classData = await Class.findOne({_id: id}).lean();

    if (!classData) {
        return (
            <div className="flex flex-col w-full text-center p-8">
                <PageSectionTitle title="Turma não encontrada..." className="mb-8"/>
                <p className="text-gray-600 dark:text-gray-400">
                    A turma que você está tentando editar não existe ou foi excluída.
                </p>
            </div>
        );
    }
    //TODO usar a função toPlain
    const plainClassData = JSON.parse(JSON.stringify(classData));

    return (
        <div className="flex flex-col w-full">
            <PageSectionTitle title="Adicionar Turma" className="mb-8"/>
            <ClassForm
                classData={plainClassData || null}
                classTypes={classTypes}
                teachers={teachers}
                students={students}
            />
        </div>
    );
}

export default EditClass;
