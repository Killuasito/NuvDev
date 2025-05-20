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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

export default function AdminNavigation() {
  const [isOpen, setIsOpen] = useState(true);
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
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 right-4 z-40 bg-[#0f1218] p-2 rounded-lg border border-gray-800"
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>

      <nav
        className={`
        fixed lg:static top-[72px] left-0 z-30
        bg-[#0f1218] w-64 h-[calc(100vh-72px)] lg:min-h-screen p-6 border-r border-gray-800
        transition-transform duration-300 lg:transition-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isOpen ? "shadow-2xl lg:shadow-none" : ""}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
                bg-clip-text text-transparent hover:from-blue-300 hover:to-blue-500 
                transition-all duration-300"
            >
              Admin Panel
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FaTimes className="w-5 h-5" />
            </button>
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

      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[72px] bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
