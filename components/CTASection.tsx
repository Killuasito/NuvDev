"use client";

import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { motion } from "framer-motion";

const WHATSAPP_LINK =
  "https://wa.me/5511932482402?text=Olá!%20Gostaria%20de%20agendar%20uma%20consultoria%20gratuita%20com%20a%20NuvDev.";

export default function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-nuvdev-darker/60" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-nuvdev-cyan/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-nuvdev-indigo/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="bg-nuvdev-card/50 backdrop-blur-sm border border-nuvdev-border rounded-3xl p-6 sm:p-10 lg:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-nuvdev-cyan text-sm font-semibold tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Pronto para evoluir?
          </motion.span>
          <motion.h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Seu concorrente já está{" "}
            <span className="gradient-text">modernizando</span>.
            <br />E você?
          </motion.h2>
          <motion.p
            className="text-nuvdev-text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Agende uma <strong className="text-white">consultoria gratuita</strong>{" "}
            de 30 minutos. Vamos analisar seu sistema atual, identificar os
            gargalos e mostrar exatamente como transformar sua operação —{" "}
            <strong className="text-nuvdev-cyan">sem risco e sem compromisso</strong>.
          </motion.p>

          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 sm:gap-3 bg-linear-to-r from-nuvdev-cyan-dark to-nuvdev-cyan text-white font-bold text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 rounded-full shadow-2xl shadow-nuvdev-cyan/25 hover:shadow-nuvdev-cyan/40 transition-all hover:scale-105 animate-pulse-glow w-full sm:w-auto justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaWhatsapp className="text-2xl group-hover:rotate-12 transition-transform" />
            Agendar Minha Consultoria Gratuita
          </motion.a>

          <motion.p
            className="text-sm text-nuvdev-text-muted mt-6 flex items-center justify-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <HiOutlineLightningBolt className="text-nuvdev-cyan text-base shrink-0" />
            Resposta em menos de 2 horas • Sem robô, fala direto com o time
            técnico
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}