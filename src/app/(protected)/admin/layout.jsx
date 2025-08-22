import SideBarNav from "../components/shared/SideBarNav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <SideBarNav className="w-64 flex-shrink-0" /> {/* or ensure inside it */}
      <div className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
