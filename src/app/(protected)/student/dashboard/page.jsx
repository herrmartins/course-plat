import React from "react";
import { auth } from "@/auth";
import Dashboard from "./Dashboard";
import { getUserModel } from "@/app/models/User";

async function DashboardWrapper() {
  const session = await auth();
  if (!session) redirect("/auth/login");
  const User = await getUserModel();
  const user = await User.findOne({_id: session.user.id}).lean();

  return (
    <>
    <p>{JSON.stringify(session)}</p>
      <Dashboard />
    </>
  );
}

export default DashboardWrapper;
