"use client"
import { logoutAction } from "@/app/lib/logoutAction";

function LogoutBtn() {
  const handleLogout = async () => {
    await logoutAction();
  };
  return (
    <div onClick={handleLogout} className="cursor-pointer">
      <span>Logout</span>
    </div>
  );
}

export default LogoutBtn;
