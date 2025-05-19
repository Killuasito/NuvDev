import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);

  // Add new transform values for shapes
  const shapeRotate1 = useTransform(scrollY, [0, 1000], [0, 360]);
  const shapeRotate2 = useTransform(scrollY, [0, 1000], [360, 0]);
  const shapeY1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const shapeY2 = useTransform(scrollY, [0, 1000], [0, 600]);
  const shapeX1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const shapeX2 = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <div className="relative bg-[#0a0d14] text-white min-h-screen flex items-center overflow-hidden">
      {/* Add animated shapes */}
      <motion.div
        className="absolute top-20 left-5 md:left-10 w-48 md:w-64 h-48 md:h-64 rounded-full bg-blue-600/20 blur-sm"
        style={{
          rotate: shapeRotate1,
          y: shapeY1,
          x: shapeX1,
        }}
      />
      <motion.div
        className="absolute top-40 right-5 md:right-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-blue-500/20 blur-lg"
        style={{
          rotate: shapeRotate2,
          y: shapeY2,
          x: shapeX2,
        }}
      />
      <motion.div
        className="absolute -bottom-20 left-1/4 w-56 md:w-72 h-56 md:h-72 rounded-full bg-blue-400/20 blur-lg"
        style={{
          rotate: shapeRotate1,
          y: shapeY1,
          x: shapeX1,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-transparent to-transparent opacity-80"></div>
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:60px_60px]"></div>
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-[#1a1f2e] via-[#0a0d14] to-transparent"></div>
      <div className="relative container mx-auto px-4 md:px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ y }}
          className="max-w-3xl space-y-4 md:space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Desenvolvimento Web & Mobile Profissional
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-300 leading-relaxed">
            Transformando suas ideias em soluções digitais de alta qualidade
          </p>
          <motion.div
            className="flex gap-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/quote"
              className="group w-full md:w-auto bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg 
                font-semibold text-center hover:bg-blue-500 transition-all duration-300 transform 
                hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
              Solicitar Orçamento
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 w-full"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex justify-center mb-8">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
