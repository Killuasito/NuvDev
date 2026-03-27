"use client";

import { useEffect, useRef, useState } from "react";
import {
  HiOutlineDatabase,
  HiOutlineLightningBolt,
  HiOutlineChartSquareBar,
  HiOutlineCloudUpload,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { motion } from "framer-motion";

const stats = [
  { value: 15, suffix: "+", label: "Anos de dados migrados", delay: 0 },
  { value: 97, suffix: "%", label: "Uptime garantido", delay: 100 },
  { value: 3, suffix: "x", label: "Mais rápido que o legado", delay: 200 },
  { value: 48, suffix: "h", label: "Primeiro dashboard rodando", delay: 300 },
];

const steps = [
  {
    icon: HiOutlineDatabase,
    step: "01",
    title: "Auditoria do Legado",
    desc: "Mapeamos cada tabela, cada processo e cada dependência do seu sistema atual.",
  },
  {
    icon: HiOutlineCloudUpload,
    step: "02",
    title: "Ponte de Dados",
    desc: "Criamos APIs que leem seus dados legados em tempo real, sem alterar o banco original.",
  },
  {
    icon: HiOutlineChartSquareBar,
    step: "03",
    title: "Dashboard ao Vivo",
    desc: "Em 48 horas, você tem o primeiro painel com indicadores reais no seu celular.",
  },
  {
    icon: HiOutlineLightningBolt,
    step: "04",
    title: "Evolução Contínua",
    desc: "A cada sprint, novas funcionalidades. Em semanas, seu sistema legado se torna moderno.",
  },
];

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="text-4xl lg:text-5xl font-extrabold gradient-text">
      {count}
      {suffix}
    </span>
  );
}

export default function ProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="resultados"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-grid"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-nuvdev-cyan/3 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-nuvdev-cyan text-sm font-semibold tracking-widest uppercase mb-4">
            Prova de Valor
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Como transformamos{" "}
            <span className="gradient-text">15 anos de dados</span> em{" "}
            <span className="text-nuvdev-cyan">1 segundo</span> de decisão
          </h2>
          <p className="text-nuvdev-text-muted text-lg">
            Nosso processo é comprovado, seguro e transparente. Veja como
            funciona na prática.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center bg-nuvdev-card border border-nuvdev-border rounded-2xl p-6 hover:border-nuvdev-cyan/30 transition-colors"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                inView={inView}
              />
              <p className="text-sm text-nuvdev-text-muted mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Connector Arrow (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-10 -right-3 z-20 text-nuvdev-border group-hover:text-nuvdev-cyan transition-colors">
                  <HiOutlineArrowNarrowRight className="text-2xl" />
                </div>
              )}

              <div className="bg-nuvdev-card border border-nuvdev-border rounded-2xl p-5 sm:p-7 h-full hover:border-nuvdev-cyan/30 transition-all duration-300 hover:-translate-y-1">
                {/* Step Number */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-nuvdev-cyan bg-nuvdev-cyan/10 px-3 py-1 rounded-full">
                    PASSO {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-nuvdev-cyan/10 flex items-center justify-center mb-4 group-hover:bg-nuvdev-cyan/20 transition-colors">
                  <step.icon className="text-nuvdev-cyan text-2xl" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-nuvdev-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}