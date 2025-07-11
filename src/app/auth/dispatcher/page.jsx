import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function DispatcherPage() {
  const session = await auth();  

  if (!session || !session.user || !session.user.roles) {
    console.log(
      "PostLoginDispatcher: Session or roles missing. Redirecting to login."
    );
    redirect("/auth/login");
  }

  const userRoles = session.user.roles;

  if (userRoles.includes("admin")) {
    redirect("/admin/dashboard");
  } else if (userRoles.includes("teacher")) {
    redirect("/teacher/dashboard");
  } else if (userRoles.includes("parent") && userRoles.length === 1) {
    redirect("/parent/dashboard");
  } else if (userRoles.includes("student") && userRoles.length === 1) {
    redirect("/student/dashboard");
  } else {
    redirect("/");
  }

  return <div>DISPATCHER</div>;
}

export default DispatcherPage;
