"use client";

import { FaWhatsapp } from "react-icons/fa";
import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineChartBar,
} from "react-icons/hi";
import { motion } from "framer-motion";

const WHATSAPP_LINK =
  "https://wa.me/5511932482402?text=Olá!%20Gostaria%20de%20agendar%20uma%20consultoria%20gratuita%20com%20a%20Elephens.";

const badges = [
  { icon: HiOutlineShieldCheck, label: "Zero Risco" },
  { icon: HiOutlineClock, label: "Resultados em Semanas" },
  { icon: HiOutlineChartBar, label: "ROI Comprovado" },
];

// Deterministic floating particles — fixed positions to avoid hydration mismatch
const PARTICLES = [
  { x: "8%",  y: "15%", size: 2, dur: 6,  delay: 0    },
  { x: "20%", y: "72%", size: 1, dur: 8,  delay: 1.2  },
  { x: "35%", y: "30%", size: 2, dur: 7,  delay: 0.5  },
  { x: "50%", y: "80%", size: 1, dur: 9,  delay: 2    },
  { x: "62%", y: "18%", size: 2, dur: 6,  delay: 1.8  },
  { x: "75%", y: "55%", size: 1, dur: 11, delay: 0.3  },
  { x: "88%", y: "35%", size: 2, dur: 8,  delay: 3    },
  { x: "15%", y: "48%", size: 1, dur: 9,  delay: 2.5  },
  { x: "42%", y: "62%", size: 2, dur: 7,  delay: 1    },
  { x: "92%", y: "70%", size: 1, dur: 10, delay: 0.8  },
  { x: "55%", y: "42%", size: 2, dur: 8,  delay: 4    },
  { x: "78%", y: "88%", size: 1, dur: 6,  delay: 1.5  },
];

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Slowly drifting orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-125 h-125 bg-nuvdev-cyan/5 rounded-full blur-[120px]"
          animate={{ x: [0, 40, -25, 0], y: [0, -30, 40, 0], scale: [1, 1.12, 0.94, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-nuvdev-indigo/6 rounded-full blur-[120px]"
          animate={{ x: [0, -35, 20, 0], y: [0, 25, -35, 0], scale: [1, 0.92, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-2/3 left-1/2 w-75 h-75 bg-nuvdev-cyan/3 rounded-full blur-[100px]"
          animate={{ x: [0, 30, -15, 0], y: [0, -20, 15, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-nuvdev-cyan"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              opacity: 0.25,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.45, 0.15] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}

        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-nuvdev-cyan/15 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-nuvdev-card/80 border border-nuvdev-border rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-2 h-2 bg-nuvdev-cyan rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-nuvdev-text-muted">
              Especialistas em Modernização e Criação de Sistemas
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Seu negócio cresceu,
            <br />
            <span className="gradient-text">mas seu software</span>
            <br />
            parou no tempo?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base sm:text-xl lg:text-2xl text-nuvdev-text-muted max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Modernizamos o seu sistema de forma{" "}
            <strong className="text-white">segura e incremental</strong>, sem
            parar sua operação. Dashboards mobile, integração com WhatsApp e
            nuvem —{" "}
            <strong className="text-nuvdev-cyan">
              em Cotia e região.
            </strong>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 sm:gap-3 bg-linear-to-r from-nuvdev-cyan-dark to-nuvdev-cyan text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl shadow-nuvdev-cyan/25 hover:shadow-2xl hover:shadow-nuvdev-cyan/40 transition-all animate-pulse-glow w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaWhatsapp className="text-2xl group-hover:rotate-12 transition-transform" />
              Agendar Consultoria Gratuita
            </motion.a>
            <motion.a
              href="#servicos"
              className="inline-flex items-center gap-2 text-nuvdev-text-muted hover:text-white border border-nuvdev-border hover:border-nuvdev-cyan/50 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all hover:bg-nuvdev-card w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Conhecer Soluções
              <span className="text-lg">→</span>
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {badges.map((badge, i) => (
              <motion.div
                key={badge.label}
                className="flex items-center gap-2 text-nuvdev-text-muted"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              >
                <badge.icon className="text-nuvdev-cyan text-xl" />
                <span className="text-sm font-medium">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-nuvdev-text-muted">Scroll</span>
          <div className="w-5 h-8 border-2 border-nuvdev-border rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-nuvdev-cyan rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}