"use client";

import {
  HiOutlineOfficeBuilding,
  HiOutlineTruck,
  HiOutlineShoppingCart,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
  HiOutlineClock,
} from "react-icons/hi";
import { motion } from "framer-motion";

const sectors = [
  {
    icon: HiOutlineOfficeBuilding,
    title: "Indústrias",
    desc: "ERPs legados, controle de produção e rastreabilidade precisam evoluir para competir. Modernizamos sem parar a linha.",
  },
  {
    icon: HiOutlineTruck,
    title: "Logística & Distribuição",
    desc: "Roteirização, tracking e integração com transportadoras. Chega de planilha e telefone para rastrear entrega.",
  },
  {
    icon: HiOutlineShoppingCart,
    title: "Comércio & Varejo",
    desc: "PDV integrado, e-commerce, WhatsApp como canal de vendas. Seu comércio local com tecnologia de gigante.",
  },
];

const advantages = [
  {
    icon: HiOutlineLocationMarker,
    title: "Atendimento Presencial",
    desc: "Reuniões presenciais em Cotia, Granja Viana e região. Nada de suporte genérico de call center.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Entendemos seu Ecossistema",
    desc: "Conhecemos os desafios reais de empresas da região: infraestrutura, fornecedores locais e cultura de negócio.",
  },
  {
    icon: HiOutlineClock,
    title: "Resposta Rápida",
    desc: "Problemas críticos? Estamos a minutos de distância. Suporte local com agilidade de startup.",
  },
];

export default function LocalSection() {
  return (
    <section
      id="diferencial"
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-nuvdev-darker/50" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-nuvdev-cyan/3 rounded-full blur-[150px]" />

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
            Diferencial Local
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Somos de <span className="gradient-text">Cotia</span> e entendemos o
            seu mercado
          </h2>
          <p className="text-nuvdev-text-muted text-lg">
            Tecnologia de ponta com o diferencial de quem conhece a realidade
            local. Não somos uma fábrica de software genérica — somos seu
            parceiro estratégico na região.
          </p>
        </motion.div>

        {/* Sectors */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.title}
              className="group gradient-border rounded-2xl p-7 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-nuvdev-cyan/10 flex items-center justify-center mb-5 group-hover:bg-nuvdev-cyan/20 transition-colors">
                <sector.icon className="text-nuvdev-cyan text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {sector.title}
              </h3>
              <p className="text-sm text-nuvdev-text-muted leading-relaxed">
                {sector.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Local Advantages */}
        <motion.div
          className="bg-nuvdev-card border border-nuvdev-border rounded-2xl p-5 sm:p-8 lg:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-center mb-10">
            Por que escolher um parceiro{" "}
            <span className="text-nuvdev-cyan">local</span>?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-nuvdev-cyan/10 flex items-center justify-center mx-auto mb-4">
                  <adv.icon className="text-nuvdev-cyan text-2xl" />
                </div>
                <h4 className="font-semibold text-white mb-2">{adv.title}</h4>
                <p className="text-sm text-nuvdev-text-muted leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}