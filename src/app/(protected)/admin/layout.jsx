import SideBarNav from "../components/shared/SideBarNav";
export default function AdminLayout({ children }) {
  return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <SideBarNav />
        {children}
      </div>
  );
}
