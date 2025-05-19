"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavItems = () => {
    const baseItems = [
      { href: "/#about", label: "Sobre" },
      { href: "/#services", label: "Serviços" },
      { href: "/#portfolio", label: "Portfólio" },
      { href: "/#contact", label: "Contato" },
    ];

    if (user) {
      return [...baseItems, { href: "/dashboard", label: "Meus Orçamentos" }];
    }

    return baseItems;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-[#0a0d14]/90 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 
              bg-clip-text text-transparent hover:from-blue-400 hover:via-blue-600 hover:to-blue-500 
              transition-all duration-500 transform hover:scale-110 hover:-rotate-2
              hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          >
            NuvDev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getNavItems().map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group py-2"
              >
                {item.label}
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 
                  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                />
              </Link>
            ))}

            <div className="pl-8 border-l border-white/10">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/quote"
                    className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium 
                    transition-all bg-blue-600 rounded-lg hover:bg-blue-500 group"
                  >
                    <span
                      className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 
                    bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
                    />
                    <span className="relative">Solicitar Orçamento</span>
                  </Link>
                  {user.email === "tififerreira@gmail.com" && (
                    <Link
                      href="/admin/dashboard"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="bg-blue-600/10 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/20
                      hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden 
                    text-white font-medium transition-all bg-blue-600 rounded-lg hover:bg-blue-500 group"
                >
                  <span
                    className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 
                    bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
                  />
                  <span className="relative">Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button with improved animation */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 transform 
              ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <div
              className={`w-6 h-0.5 bg-gray-300 transition-all duration-300
              ${isOpen ? "opacity-0" : "opacity-100"}`}
            />
            <div
              className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 transform
              ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Navigation with improved animation */}
        <div
          className={`md:hidden fixed left-0 right-0 top-[72px] bg-[#0a0d14]/95 backdrop-blur-xl 
          border-t border-white/5 transition-all duration-500 ease-in-out
          ${
            isOpen
              ? "translate-y-0 opacity-100 h-[calc(100vh-72px)]"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-6 py-8 space-y-6">
            {getNavItems().map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg text-gray-300 hover:text-blue-400 transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="pt-6 mt-6 border-t border-gray-800/50 space-y-4">
                <Link
                  href="/quote"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white px-4 py-3 
                    rounded-lg hover:bg-blue-500 transition-all duration-300"
                >
                  Solicitar Orçamento
                </Link>
                {user.email === "tififerreira@gmail.com" && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-blue-600/10 text-blue-400 px-4 py-3 
                      rounded-lg hover:bg-blue-600/20 transition-all duration-300"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-blue-600/10 text-blue-400 px-4 py-3 rounded-lg 
                    border border-blue-500/20 hover:bg-blue-600/20
                    transition-all duration-300"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-blue-600 text-white px-4 py-3 
                  rounded-lg hover:bg-blue-500 transition-all duration-300 mt-6"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
