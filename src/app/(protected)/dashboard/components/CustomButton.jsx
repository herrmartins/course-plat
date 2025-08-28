export default function CustomButton({children, onClick, icon, variant = "primary"}) {
    const base =
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow transition-shadow";
    const styles =
        variant === "secondary"
            ? "border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            : "bg-blue-600 hover:bg-blue-700 text-white";
    return (
        <button className={`${base} ${styles}`} onClick={onClick}>
            {icon}
            {children}
        </button>
    );
}