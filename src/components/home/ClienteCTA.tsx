import Link from "next/link";
import { motion } from "framer-motion";

export default function ClienteCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-t from-[#0a0d14] to-[#1a1f2e]">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:60px_60px]"></div>
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b"></div>

      <div className="container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Pronto para Transformar sua Ideia em Realidade?
          </h2>
          <p className="text-xl text-gray-300">
            Junte-se aos nossos clientes satisfeitos e permita-nos criar uma
            solução digital excepcional para o seu negócio.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/quote"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold 
                text-white bg-blue-600 rounded-lg overflow-hidden hover:shadow-2xl 
                hover:shadow-blue-500/50 transition-shadow duration-300"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-500 rounded-full group-hover:w-80 group-hover:h-80"></span>
              <span className="relative">
                Comece seu Projeto
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
