import React from "react";
import { auth } from "@/auth";
import StudentDashboard from "./Dashboard";
import { getUserModel } from "@/app/models/User";

async function StudentDashboardPage() {
  const session = await auth();
  if (!session) redirect("/auth/login");
  const User = await getUserModel();
  const user = await User.findOne({_id: session.user.id}).lean();

  return (
    <>
    <p>{JSON.stringify(session)}</p>
      <StudentDashboard />
    </>
  );
}

export default StudentDashboardPage;
