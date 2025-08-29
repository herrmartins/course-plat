"use client";

import {useActionState, useEffect, useState} from 'react';
import {saveClassLink} from '@/app/lib/classes/saveClassLinkAction';
import {FaRegEdit} from "react-icons/fa";
import {IoMdAdd} from "react-icons/io";

export default function ClassLinkButton({cls}) {
    const initialState = {success: false, message: null};
    const [localCls, setLocalCls] = useState(cls);
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [state, formAction, isPending] = useActionState(saveClassLink, initialState);

    useEffect(() => {
        if (state?.success) {
            setLocalCls({...localCls, link: state.link});
            setIsAddingLink(false);
        }
    }, [state]);

    const handleButtonClick = () => {
        setIsAddingLink(!isAddingLink);
    };

    return (
        <div>
            {isAddingLink ? (
                <form action={formAction} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <input type="hidden" name="id" value={localCls.id}/>
                        <input
                            type="url"
                            name="link"
                            placeholder="Cole o link da aula aqui"
                            className="flex-1 border rounded-xl p-3 text-sm bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-800 dark:text-neutral-200"
                            defaultValue={localCls?.link || ''}
                        />
                        <button
                            type="submit"
                            disabled={isPending}
                            className="border rounded-xl p-3 text-sm bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600 hover:bg-blue-400 dark:hover:bg-blue-500 hover:shadow-md transition-shadow text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                    {state?.message && (
                        <p className={`text-sm ${state?.success ? 'text-green-500' : 'text-red-500'}`}>
                            {state?.message}
                        </p>
                    )}
                </form>
            ) : (
                <button
                    onClick={() => setIsAddingLink(!isAddingLink)}
                    className="w-full h-full border rounded-xl p-3 text-sm bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:shadow-md transition-shadow text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2"
                >
                    {localCls.link ? <FaRegEdit/> : <IoMdAdd/>}
                    <span className="font-medium">{localCls.link ? "Editar Link" : "Adicionar Link"}</span>
                </button>
            )}
        </div>
    );
}