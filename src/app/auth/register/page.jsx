import React from "react";
import RegisterForm from "./components/RegisterForm";

function RegisterPage() {
  return (
    <div className="mt-2">
      <div className="flex justify-center">
        <h1 className="text-2xl">Cadastro</h1>
      </div>
      <div className="flex flex-col items-center">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
