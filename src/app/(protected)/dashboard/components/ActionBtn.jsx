export default function ActionBtn({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full h-full border rounded-xl p-3 text-sm bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:shadow-md transition-shadow text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2"
            title={label}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
}