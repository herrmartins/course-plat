import AdminDashboard from "@/app/(protected)/components/AdminDashboard";
import NotAuthorized from "@/app/auth/components/NotAuthorized";
import { auth } from "@/app/lib/utils/auth";

async function AdminDasBoard() {
  const session = await auth();
  if (session.user.roles.includes("admin")) {
    return <AdminDashboard />;
  } else {
    return (
      <>
        <NotAuthorized />
      </>
    );
  }
}

export default AdminDasBoard;
