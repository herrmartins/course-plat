import React from "react";
import ToggleTheme from "../ToggleTheme";
import Link from "next/link";
import Image from "next/image";
import LogoutBtn from "./LogoutBtn";
import { auth } from "@/auth";

async function Header() {
  const session = await auth();
  return (
    <>
      <div className="flex flex-col items-center">
        {/* <Link href="/">
          <Image
            src="/logobig.jpg"
            alt="Inglês com idéias vivas"
            width={500}
            height={100}
          />
        </Link> */}
        <div className="flex gap-2">
          <Link href="/">
            <span>Home</span>
          </Link>
          {!session && (
            <Link href="/auth/login">
              <span>Login</span>
            </Link>
          )}
          {session && (
            <LogoutBtn />
          )}
        </div>
        <div className="mt-2">
          <ToggleTheme />
          <Link
            href="/auth/register"
            className="dark:bg-sky-600 dark:hover:bg-sky-700 bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-6 rounded-xl transition"
          >
            {" "}
            Cadastro
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
