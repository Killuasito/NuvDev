"use client";

import {
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";

const WHATSAPP_LINK =
  "https://wa.me/5511932482402?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20Elephens.";

const footerLinks = {
  servicos: [
    { label: "Modernização Incremental", href: "#servicos" },
    { label: "Dashboards de Indicadores", href: "#servicos" },
    { label: "Automação de Processos", href: "#servicos" },
    { label: "Chatbots de Vendas", href: "#servicos" },
  ],
  empresa: [
    { label: "Sobre a Elephens", href: "#diferencial" },
    { label: "Nosso Processo", href: "#resultados" },
    { label: "Blog", href: "#" },
    { label: "Carreiras", href: "#" },
  ],
};

const socialLinks = [
  { icon: FaWhatsapp, href: WHATSAPP_LINK, label: "WhatsApp" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative bg-nuvdev-darker border-t border-nuvdev-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <a href="#inicio" className="flex items-center gap-2 mb-5">
              <Image
                src="/Elephens.png"
                alt="Elephens logo"
                width={56}
                height={56}
              />
              <span className="text-xl font-bold">
                <span className="text-white">Ele</span>
                <span className="gradient-text">phens</span>
              </span>
            </a>
            <p className="text-sm text-nuvdev-text-muted leading-relaxed mb-6">
              Software House especializada em modernização de sistemas legados.
              Transformamos tecnologia antiga em vantagem competitiva.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-nuvdev-card border border-nuvdev-border flex items-center justify-center text-nuvdev-text-muted hover:text-nuvdev-cyan hover:border-nuvdev-cyan/50 transition-all"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Serviços
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-nuvdev-text-muted hover:text-nuvdev-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-nuvdev-text-muted hover:text-nuvdev-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Contato
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-nuvdev-text-muted hover:text-nuvdev-cyan transition-colors"
                >
                  <FaWhatsapp className="text-lg shrink-0" />
                  (11) 93248-2402
                </a>
              </li>
              <li>
                <a
                  href="mailto:aquasferium@gmail.com"
                  className="flex items-center gap-3 text-sm text-nuvdev-text-muted hover:text-nuvdev-cyan transition-colors"
                >
                  <HiOutlineMail className="text-lg shrink-0" />
                  aquasferium@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-nuvdev-text-muted">
                  <HiOutlineLocationMarker className="text-lg shrink-0 mt-0.5" />
                  <span>
                    Cotia, SP — Brasil
                    <br />
                    <span className="text-xs">
                      Atendemos Cotia, Granja Viana, Carapicuíba, Osasco e
                      região
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-nuvdev-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-nuvdev-text-muted">
            © {new Date().getFullYear()} Elephens. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-nuvdev-text-muted hover:text-nuvdev-cyan transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-xs text-nuvdev-text-muted hover:text-nuvdev-cyan transition-colors"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}