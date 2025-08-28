
export default function Card({children}) {
    return (
        <div
            className="border rounded-xl p-5 shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:shadow-md transition-shadow">
            {children}
        </div>
    );
}