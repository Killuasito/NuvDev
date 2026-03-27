"use client";

import {
  HiOutlineDesktopComputer,
  HiOutlineExclamationCircle,
  HiOutlineEmojiSad,
  HiOutlineLockClosed,
  HiOutlineCloud,
  HiOutlineDeviceMobile,
  HiOutlineLightningBolt,
  HiOutlineSparkles,
} from "react-icons/hi";
import { GiDinosaurRex } from "react-icons/gi";
import { MdRocketLaunch } from "react-icons/md";
import { motion } from "framer-motion";

const painPoints = [
  {
    icon: HiOutlineDesktopComputer,
    title: "Preso ao Desktop",
    desc: "Só funciona naquela máquina velha do escritório, com Windows XP.",
  },
  {
    icon: HiOutlineExclamationCircle,
    title: "Travamentos Diários",
    desc: "O sistema cai no pior momento: quando o cliente está esperando.",
  },
  {
    icon: HiOutlineEmojiSad,
    title: "Zero Integrações",
    desc: "Não conversa com nada: nem WhatsApp, nem nota fiscal eletrônica.",
  },
  {
    icon: HiOutlineLockClosed,
    title: "Dados Presos",
    desc: "15 anos de dados valiosos trancados em um banco de dados obsoleto.",
  },
];

const solutions = [
  {
    icon: HiOutlineCloud,
    title: "100% na Nuvem",
    desc: "Acesse de qualquer lugar, a qualquer hora, com segurança total.",
  },
  {
    icon: HiOutlineDeviceMobile,
    title: "Mobile First",
    desc: "Dashboards e relatórios no seu celular, em tempo real.",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Ultra Rápido",
    desc: "Respostas em milissegundos. Sem travamento, sem espera.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Inteligente",
    desc: "Integração com WhatsApp, IA, automações e muito mais.",
  },
];

export default function ContrastSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section id="problema" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-nuvdev-darker/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-nuvdev-cyan text-sm font-semibold tracking-widest uppercase mb-4">
            O Diagnóstico
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Seu sistema é um{" "}
            <span className="text-nuvdev-danger">dinossauro</span> ou uma{" "}
            <span className="gradient-text">máquina do futuro</span>?
          </h2>
          <p className="text-nuvdev-text-muted text-lg">
            Veja a diferença entre continuar com o legado e dar o próximo passo
            com a NuvDev.
          </p>
        </motion.div>

        {/* Contrast Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Pain Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-1 bg-linear-to-b from-nuvdev-danger/20 to-transparent rounded-2xl blur-xl" />
            <div className="relative bg-nuvdev-card border border-red-500/20 rounded-2xl p-5 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-nuvdev-danger/10 flex items-center justify-center">
                  <GiDinosaurRex className="text-nuvdev-danger text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-nuvdev-danger">
                    O Software Dinossauro
                  </h3>
                  <p className="text-sm text-nuvdev-text-muted">
                    Lento • Desktop • Travado
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                {painPoints.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4 group"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-nuvdev-danger/10 flex items-center justify-center group-hover:bg-nuvdev-danger/20 transition-colors">
                      <item.icon className="text-nuvdev-danger text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-nuvdev-text-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solution Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-1 bg-linear-to-b from-nuvdev-cyan/20 to-transparent rounded-2xl blur-xl" />
            <div className="relative bg-nuvdev-card border border-nuvdev-cyan/20 rounded-2xl p-5 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-nuvdev-cyan/10 flex items-center justify-center">
                  <MdRocketLaunch className="text-nuvdev-cyan text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-nuvdev-cyan">
                    A Solução NuvDev
                  </h3>
                  <p className="text-sm text-nuvdev-text-muted">
                    Cloud • Mobile • Inteligente
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                {solutions.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-4 group"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-nuvdev-cyan/10 flex items-center justify-center group-hover:bg-nuvdev-cyan/20 transition-colors">
                      <item.icon className="text-nuvdev-cyan text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-nuvdev-text-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-nuvdev-text-muted mb-4">
            A boa notícia?{" "}
            <strong className="text-white">
              Você não precisa jogar seu sistema fora.
            </strong>
          </p>
          <a
            href="#servicos"
            className="inline-flex items-center gap-2 text-nuvdev-cyan font-semibold hover:underline"
          >
            Veja como fazemos a transição de forma segura
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}