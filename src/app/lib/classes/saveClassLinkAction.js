'use server'

import {getClassModel} from "@/app/models/Class";

export async function saveClassLink(prevState, formData) {

    const link = formData.get('link');
    const classId = formData.get('id');

    if (!link || !link.startsWith("http")) {
        return {success: false, message: "URL inválida."};
    }

    try {
        const ClassModel = await getClassModel();
        const studentsClass = await ClassModel.findOne({_id: classId});

        if (!studentsClass) {
            return { success: false, message: "Turma não encontrada." };
        }
        await ClassModel.findByIdAndUpdate(
            classId,
            { link },
            { new: true }
        );

    } catch (e) {
        return {
            success: false,
            message: `Erro ao salvar novo link, ${e.message}`,
            inputs: {
                link: link,
                classId: classId
            },
        };
    }

    return {success: true, message: "Link salvo com sucesso!", link};

}