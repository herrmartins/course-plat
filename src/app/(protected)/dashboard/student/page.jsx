import React from "react";
import { auth } from "@/auth";
import StudentDashboard from "@/app/(protected)/dashboard/student/Dashboard"
import { getUserModel } from "@/app/models/User";
import {redirect} from "next/navigation";

async function StudentDashboardPage() {
  const session = await auth();
  if (!session) redirect("/auth/login");
  const User = await getUserModel();
  const user = await User.findOne({_id: session.user.id}).lean();

  return (
    <>
      <StudentDashboard />
    </>
  );
}

export default StudentDashboardPage;
