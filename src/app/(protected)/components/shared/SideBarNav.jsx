"use client";
import React from "react";
import { useState } from "react";
import SidebarNavItem from "@/app/(protected)/components/shared/SideBarNavItem";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { relatedToTitleUrl } from "@/app/lib/helpers/generalUtils";

function SideBarNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <aside
      className={`w-min-64 bg-white dark:bg-gray-800 shadow-md p-6 
          ${isSidebarOpen ? "block" : "hidden"} 
          md:block // Sempre visível em md e maiores
        `}
    >
      <Link href="/admin/dashboard">
        <h2 className="flex text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 gap-2">
          <FaHome className="text-3xl" />
          Admin
        </h2>
      </Link>
      <nav>
        <ul>
          <SidebarNavItem
            href={`/admin/dashboard/${relatedToTitleUrl("classTypes")}`}
            iconName="addType"
          >
            Gerenciar Tipos de Turma
          </SidebarNavItem>
          <SidebarNavItem href="/admin/dashboard/class" iconName="addClass">
            Gerenciar Turmas
          </SidebarNavItem>
          <SidebarNavItem href="/admin/dashboard/users" iconName="manageUsers">
            Gerenciar Usuários & Papéis
          </SidebarNavItem>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBarNav;
