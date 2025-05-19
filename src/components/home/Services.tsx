"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Service } from "@/types";
import {
  FaCode,
  FaMobile,
  FaPaintBrush,
  FaStore,
  FaBrain,
  FaTools,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaShieldAlt,
  FaDesktop,
  FaChartLine,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const defaultServices = [
  {
    id: "web-dev",
    title: "Desenvolvimento Web",
    description:
      "Criação de sites modernos, responsivos e otimizados para SEO. Desenvolvimento de aplicações web complexas e sistemas personalizados.",
    icon: FaCode,
  },
  {
    id: "mobile-dev",
    title: "Desenvolvimento Mobile",
    description:
      "Aplicativos nativos e multiplataforma para iOS e Android. Integração com APIs e sistemas existentes.",
    icon: FaMobile,
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description:
      "Design de interfaces intuitivas e experiências de usuário atraentes. Prototipagem e testes de usabilidade.",
    icon: FaPaintBrush,
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description:
      "Desenvolvimento de lojas virtuais completas com gestão de produtos, pagamentos e integrações.",
    icon: FaStore,
  },
  {
    id: "consulting",
    title: "Consultoria Técnica",
    description:
      "Análise de projetos, arquitetura de sistemas e mentoria para equipes de desenvolvimento.",
    icon: FaBrain,
  },
  {
    id: "maintenance",
    title: "Manutenção",
    description:
      "Suporte contínuo, atualizações de segurança e melhorias em sistemas existentes.",
    icon: FaTools,
  },
];

const iconMap: { [key: string]: IconType } = {
  FaCode,
  FaMobile,
  FaPaintBrush,
  FaStore,
  FaBrain,
  FaTools,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaShieldAlt,
  FaDesktop,
  FaChartLine,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const servicesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            icon: iconMap[data.icon as keyof typeof iconMap] || FaCode, // Atualizado para usar o novo mapa
          };
        }) as Service[];
        setServices(servicesData.length > 0 ? servicesData : defaultServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices(defaultServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="relative py-24 bg-gradient-to-b from-[#1a1f2e] to-[#0a0d14]">
        <div className="container mx-auto px-6">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-gray-700 rounded mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-64 bg-gray-800/50 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="relative py-24 bg-gradient-to-b from-[#1a1f2e] to-[#0a0d14]"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
        >
          Serviços
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/5 backdrop-blur-sm p-8 rounded-xl 
                border border-gray-700/50 hover:border-blue-500
                transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300
                hover:shadow-xl hover:shadow-blue-500/20
                relative overflow-hidden cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-500/0 to-blue-400/0 
                opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              ></div>

              <div className="relative z-10 flex flex-col h-full">
                <div
                  className="w-12 h-12 mb-6 text-blue-400 group-hover:text-blue-300 
                  transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3"
                >
                  <service.icon className="w-full h-full" />
                </div>
                <h3
                  className="text-xl font-semibold mb-4 text-white group-hover:text-blue-400 
                  transition-colors duration-300"
                >
                  {service.title}
                </h3>
                <p
                  className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 
                  leading-relaxed flex-grow"
                >
                  {service.description}
                </p>
                <div
                  className="mt-6 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 
                  transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                >
                  <span className="text-sm font-medium">Saiba mais</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:32px_32px]"></div>
    </section>
  );
}
