export default function Row({label, value}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
            <span className="text-neutral-800 dark:text-neutral-200">{value || "—"}</span>
        </div>
    );
}