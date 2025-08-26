import Link from "next/link";

const BTN = {
  indigo:  "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
  green:   "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  purple:  "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
  blue:    "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  sky:     "bg-sky-600 hover:bg-sky-700 focus:ring-sky-500",
  red:     "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  yellow:  "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 text-black",
  orange:  "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500",
  pink:    "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500",
  rose:    "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500",
  cyan:    "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500",
  teal:    "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500",
  lime:    "bg-lime-600 hover:bg-lime-700 focus:ring-lime-500 text-black",
  emerald: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
};

const TITLE = {
  indigo:  "text-indigo-700 dark:text-indigo-300",
  green:   "text-green-700 dark:text-green-300",
  purple:  "text-purple-700 dark:text-purple-300",
  blue:    "text-blue-700 dark:text-blue-300",
  sky:     "text-sky-700 dark:text-sky-300",
  red:     "text-red-700 dark:text-red-300",
  yellow:  "text-yellow-700 dark:text-yellow-300",
  orange:  "text-orange-700 dark:text-orange-300",
  pink:    "text-pink-700 dark:text-pink-300",
  rose:    "text-rose-700 dark:text-rose-300",
  cyan:    "text-cyan-700 dark:text-cyan-300",
  teal:    "text-teal-700 dark:text-teal-300",
  lime:    "text-lime-700 dark:text-lime-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
};


export default function DashboardCard({ title, description, buttonText, buttonColor = "indigo", link }) {
  const btn = BTN[buttonColor] ?? BTN.indigo;
  const titleClr = TITLE[buttonColor] ?? TITLE.indigo;

  return (
    <div className="max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className={`text-2xl font-semibold mb-4 ${titleClr}`}>{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4 break-words">{description}</p>

      <Link
        href={link}
        className={`w-full inline-flex justify-center text-white font-bold py-3 px-4 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-300 ${btn}`}
      >
        {buttonText}
      </Link>
    </div>
  );
}
