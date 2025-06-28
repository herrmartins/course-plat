import React from "react";
import ToggleTheme from "../ToggleTheme";
import Link from "next/link";
import Image from "next/image";

function Header() {
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
          <Link href="/"><span>Home</span></Link>
          <Link href="/auth/login"><span>Login</span></Link>
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
