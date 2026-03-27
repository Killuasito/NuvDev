"use client";

import {
  HiOutlineRefresh,
  HiOutlinePresentationChartBar,
  HiOutlineCog,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { motion } from "framer-motion";

const services = [
  {
    icon: HiOutlineRefresh,
    title: "Modernização Incremental",
    headline: "Evolua sem destruir.",
    description:
      "Não jogamos seu sistema fora. Construímos camadas modernas sobre ele: novas interfaces, APIs e integrações — enquanto sua operação continua rodando normalmente.",
    features: [
      "Migração gradual e sem paradas",
      "APIs RESTful sobre banco legado",
      "Nova interface web responsiva",
      "Documentação completa do processo",
    ],
    color: "cyan" as const,
  },
  {
    icon: HiOutlinePresentationChartBar,
    title: "Dashboards de Indicadores",
    headline: "Seus dados, visíveis.",
    description:
      "Transformamos anos de dados acumulados em painéis visuais em tempo real. KPIs, gráficos e alertas no seu celular — para tomar decisões em segundos, não em dias.",
    features: [
      "Painéis em tempo real (mobile)",
      "KPIs personalizados por setor",
      "Alertas automáticos por WhatsApp",
      "Integração com qualquer banco de dados",
    ],
    color: "indigo" as const,
  },
  {
    icon: HiOutlineCog,
    title: "Automação de Processos",
    headline: "Menos clique, mais resultado.",
    description:
      "Eliminamos o retrabalho manual: notas fiscais, relatórios, cobranças e notificações passam a acontecer sozinhos, com workflows inteligentes e integrados.",
    features: [
      "Workflows automatizados (n8n/Zapier)",
      "Emissão automática de NF-e",
      "Cobrança e follow-up automático",
      "Integração entre sistemas (ERP, CRM)",
    ],
    color: "cyan" as const,
  },
  {
    icon: HiOutlineChatAlt2,
    title: "Chatbots de Vendas",
    headline: "Seu vendedor 24/7.",
    description:
      "Chatbots inteligentes no WhatsApp que qualificam leads, respondem dúvidas, enviam orçamentos e agendam reuniões — mesmo de madrugada. Venda enquanto dorme.",
    features: [
      "Chatbot no WhatsApp Business API",
      "Qualificação automática de leads",
      "Envio de orçamentos e catálogos",
      "Integração direta com seu CRM",
    ],
    color: "indigo" as const,
  },
];

const colorMap = {
  cyan: {
    iconBg: "bg-nuvdev-cyan/10",
    iconText: "text-nuvdev-cyan",
    border: "border-nuvdev-cyan/20 hover:border-nuvdev-cyan/50",
    glow: "group-hover:shadow-nuvdev-cyan/10",
    bullet: "bg-nuvdev-cyan",
  },
  indigo: {
    iconBg: "bg-nuvdev-indigo/10",
    iconText: "text-nuvdev-indigo",
    border: "border-nuvdev-indigo/20 hover:border-nuvdev-indigo/50",
    glow: "group-hover:shadow-nuvdev-indigo/10",
    bullet: "bg-nuvdev-indigo",
  },
};

export default function ServicesSection() {
  return (
    <section id="servicos" className="relative py-20 lg:py-32 bg-grid">
      {/* Background */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-nuvdev-indigo/3 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-nuvdev-indigo-light text-sm font-semibold tracking-widest uppercase mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Soluções estratégicas para{" "}
            <span className="gradient-text">cada dor do seu negócio</span>
          </h2>
          <p className="text-nuvdev-text-muted text-lg">
            Não vendemos tecnologia por tecnologia. Cada serviço é pensado para
            resolver um problema real e gerar retorno mensurável.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => {
            const c = colorMap[service.color];
            return (
              <motion.div
                key={service.title}
                className={`group relative bg-nuvdev-card border ${c.border} rounded-2xl p-5 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl ${c.glow}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl ${c.iconBg} flex items-center justify-center mb-6`}
                >
                  <service.icon className={`text-3xl ${c.iconText}`} />
                </div>

                {/* Content */}
                <span
                  className={`text-xs font-bold tracking-widest uppercase ${c.iconText} mb-2 block`}
                >
                  {service.title}
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.headline}
                </h3>
                <p className="text-nuvdev-text-muted leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, fi) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-nuvdev-text-muted"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 + fi * 0.05 }}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${c.bullet} shrink-0`}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}