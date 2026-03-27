"use client";

import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#problema", label: "O Problema" },
  { href: "#servicos", label: "Serviços" },
  { href: "#diferencial", label: "Diferencial" },
  { href: "#resultados", label: "Resultados" },
];

const WHATSAPP_LINK =
  "https://wa.me/5511932482402?text=Olá!%20Gostaria%20de%20agendar%20uma%20consultoria%20gratuita%20com%20a%20NuvDev.";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-nuvdev-darker/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-nuvdev-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#inicio"
            className="flex items-center gap-2 group"
            aria-label="NuvDev - Ir para o início"
          >
            <Image
              src="/NuvDev.png"
              alt="NuvDev logo"
              width={40}
              height={40}
              className="group-hover:drop-shadow-[0_0_8px_rgba(0,188,212,0.6)] transition-all"
              priority
            />
            <span className="text-xl font-bold">
              <span className="text-white">Nuv</span>
              <span className="gradient-text">Dev</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-nuvdev-text-muted hover:text-nuvdev-cyan transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-nuvdev-cyan after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-linear-to-r from-nuvdev-cyan-dark to-nuvdev-cyan text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-nuvdev-cyan/30 transition-all hover:scale-105"
            >
              <FaWhatsapp className="text-base" />
              Consultoria Grátis
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-nuvdev-text-muted hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-nuvdev-text-muted hover:text-white hover:bg-nuvdev-card px-4 py-3 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-nuvdev-cyan-dark to-nuvdev-cyan text-white font-semibold px-5 py-3 rounded-full mt-3 mx-4"
            >
              <FaWhatsapp className="text-lg" />
              Consultoria Grátis
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}