export default function SectionHeader({title, icon}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-neutral-700 dark:text-neutral-200">{icon}</span>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{title}</h2>
        </div>
    );
}