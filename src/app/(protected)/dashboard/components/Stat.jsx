export default function Stat({label, value}) {
    return (
        <div
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50 dark:bg-neutral-800/40">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
            <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{value}</p>
        </div>
    );
}