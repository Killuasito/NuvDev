"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaCogs,
  FaFileInvoiceDollar,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminNavigation() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: FaTachometerAlt,
    },
    {
      label: "Projetos",
      href: "/admin/projects",
      icon: FaProjectDiagram,
    },
    {
      label: "Serviços",
      href: "/admin/services",
      icon: FaCogs,
    },
    {
      label: "Orçamentos",
      href: "/admin/quotes",
      icon: FaFileInvoiceDollar,
    },
  ];

  return (
    <nav className="bg-[#0f1218] w-64 min-h-screen p-6 border-r border-gray-800">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center mb-8 pb-6 border-b border-gray-800">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
              bg-clip-text text-transparent hover:from-blue-300 hover:to-blue-500 
              transition-all duration-300"
          >
            Admin Panel
          </Link>
        </div>

        <div className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                      group hover:bg-white/5 relative overflow-hidden
                      ${
                        isActive
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0
                      transition-opacity duration-300 opacity-0 group-hover:opacity-10`}
                    />
                    <item.icon
                      className={`w-5 h-5 mr-3 transition-transform duration-300
                      group-hover:scale-110 ${isActive ? "text-blue-400" : ""}`}
                    />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 
                        bg-blue-500 rounded-r-full"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <button
            onClick={() => logout()}
            className="flex items-center w-full px-4 py-3 text-gray-400 
              rounded-lg hover:bg-white/5 hover:text-gray-200
              transition-all duration-200 group"
          >
            <FaSignOutAlt
              className="w-5 h-5 mr-3 transition-transform duration-300 
              group-hover:rotate-180"
            />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
