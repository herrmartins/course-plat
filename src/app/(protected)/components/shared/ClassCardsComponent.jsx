"use client";

import {ClassCard} from "@/app/(protected)/components/shared/ClassCard";

export function ClassCardComponent({classes, hrefBase}) {
    const list = Array.isArray(classes) ? classes : classes ? [classes] : [];

    if (!list.length) {
        return (
            <div className="text-gray-600 dark:text-gray-300 italic">
                Nenhuma turma encontrada.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((cls) => (
                    <ClassCard
                        key={String(cls?._id || `${cls?.classTitle}-${cls?.startDate}`)}
                        cls={cls}
                        href={hrefBase && cls?._id ? `${hrefBase}/${cls._id}` : undefined}
                    />
            ))}
        </div>
    );
}