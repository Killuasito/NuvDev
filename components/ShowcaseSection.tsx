"use client";

import { motion } from "framer-motion";
import { HiOutlineCheckCircle } from "react-icons/hi";
import SystemAnimation from "./SystemAnimation";

const highlights = [
  "Migração sem parar sua operação",
  "Primeiro dashboard no celular em 48h",
  "Integrações com WhatsApp, NF-e e ERP",
];

export default function ShowcaseSection() {
  return (
    <section className="relative py-12 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nuvdev-darker/40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-nuvdev-cyan/4 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-nuvdev-cyan text-sm font-semibold tracking-widest uppercase mb-4">
              Veja a transformação
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              De código parado para{" "}
              <span className="gradient-text">plataforma moderna</span>
            </h2>
            <p className="text-nuvdev-text-muted text-lg leading-relaxed mb-8">
              Em semanas, não anos. Modernizamos seu sistema de dentro pra
              fora, sem travar sua operação. Seu time continua trabalhando
              enquanto a mágica acontece.
            </p>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-nuvdev-text-muted"
                >
                  <HiOutlineCheckCircle className="text-nuvdev-cyan text-lg shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right: animation card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            {/* Glow behind the card */}
            <div className="absolute -inset-2 bg-nuvdev-cyan/8 rounded-3xl blur-2xl" />

            <div className="relative bg-nuvdev-card/60 backdrop-blur-sm border border-nuvdev-border rounded-2xl p-6 lg:p-8 overflow-hidden">
              {/* Header bar */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-nuvdev-border/50">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[11px] text-nuvdev-text-muted font-mono">
                  simulação · ao vivo
                </span>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-nuvdev-cyan/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-nuvdev-cyan animate-pulse" />
                  loop
                </span>
              </div>

              <SystemAnimation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
