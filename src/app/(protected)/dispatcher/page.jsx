import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RoleDispatcher from "@/app/(protected)/dispatcher/RoleDispatcher";
import NotAuthorized from "@/app/auth/components/NotAuthorized";

async function DispatcherPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.roles) {
    console.log(
      "PostLoginDispatcher: Session or roles missing. Redirecting to login."
    );
    redirect("/auth/login");
  }

  const userRoles = session.user.roles;

  if (userRoles.length > 1) {
    return (
      <>
        <RoleDispatcher userRoles={userRoles} />
      </>
    );
  }

  if (userRoles.includes("admin")) {
    redirect("/admin/dashboard");
  }
  if (userRoles.includes("teacher")) {
    redirect("/dashboard/teacher");
  }
  if (userRoles.includes("parent")) {
    redirect("/dashboard/guardian");
  }
  if (userRoles.includes("student")) {
    redirect("/dashboard/student");
  }

  return (
    <>
      <NotAuthorized />
    </>
  );
}

export default DispatcherPage;
