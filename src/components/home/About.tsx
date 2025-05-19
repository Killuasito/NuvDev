import { FaReact } from "react-icons/fa";
import { TbBrandNextjs, TbBrandTypescript } from "react-icons/tb";
import { IoLogoNodejs } from "react-icons/io";
import { SiFirebase } from "react-icons/si";
import { AiFillMobile } from "react-icons/ai";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const technologies = [
    { name: "React.js", icon: FaReact },
    { name: "Next.js", icon: TbBrandNextjs },
    { name: "Node.js", icon: IoLogoNodejs },
    { name: "TypeScript", icon: TbBrandTypescript },
    { name: "Firebase", icon: SiFirebase },
    { name: "React Native", icon: AiFillMobile },
  ];

  return (
    <section
      id="about"
      className="relative py-12 sm:py-24 bg-gradient-to-b from-[#1a1f2e] to-[#0a0d14]"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Sobre Mim
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/10">
              <div className="space-y-6 sm:space-y-8">
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed animate-fade-in">
                  Olá! <br />
                  <br />
                  <span className="text-blue-400">
                    Meu nome é Tiago da Silva Ferreira, tenho 19 anos e sou um
                    desenvolvedor fullstack apaixonado por tecnologia e
                    inovação.
                  </span>{" "}
                  <br />
                  <br />
                  Formado em Desenvolvimento de Sistemas pela Etec de Itapevi,
                  desenvolvi uma base sólida em programação, banco de dados e
                  criação de sistemas eficientes, tanto web quanto mobile.
                  <br />
                  <br />
                  Meu grande sonho é automatizar e facilitar os processos de
                  venda online, ajudando empreendedores e empresas a economizar
                  tempo, vender mais e melhorar sua presença digital com
                  soluções inteligentes e modernas.
                  <br />
                  <br />
                  Trabalho com as tecnologias mais recentes do mercado, sempre
                  buscando entregar projetos escaláveis, de alta performance e
                  com ótima experiência de usuário.
                </p>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-300 mb-4 sm:mb-6">
                    Trabalho com as tecnologias mais recentes do mercado,
                    incluindo:
                  </h3>
                  <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
                  >
                    {technologies.map((tech) => (
                      <motion.div
                        key={tech.name}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group bg-white/5 p-3 sm:p-4 rounded-xl 
                        border border-white/10 hover:border-blue-500/50
                        transition-all duration-300 hover:scale-105
                        hover:bg-white/10"
                      >
                        <div className="flex items-center space-x-3">
                          <tech.icon className="text-2xl text-blue-400 group-hover:text-blue-300 transition-colors" />
                          <span
                            className="text-gray-300 group-hover:text-blue-400 
                          font-medium transition-colors"
                          >
                            {tech.name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1f2e] pointer-events-none"></div>
      </div>
    </section>
  );
}
