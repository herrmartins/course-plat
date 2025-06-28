import LoginForm from "./LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginWrapper() {
  const session = await auth();
  // Temos que verificar as roles
  if (session) redirect('/student/dashboard');
  return (
    <>
      <LoginForm />
    </>
  );
}
