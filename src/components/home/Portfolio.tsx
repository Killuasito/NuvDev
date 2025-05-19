"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Project } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const defaultProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "Plataforma completa de e-commerce com painel administrativo e integração com diversos meios de pagamento.",
    imageUrl: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    link: "https://example.com",
    githubUrl: "https://github.com/example",
    createdAt: {
      toDate: () => new Date(),
    },
  },
] as Project[];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

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
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt,
        })) as Project[];
        setProjects(projectsData.length ? projectsData : defaultProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="relative py-24 bg-gradient-to-b from-[#0a0d14] to-[#1a1f2e]">
        <div className="container mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-12 w-64 bg-gray-700/50 rounded-lg mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-gray-800/50 rounded-xl h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  );

  const filteredProjects = selectedTech
    ? projects.filter((p) => p.technologies.includes(selectedTech))
    : projects;

  return (
    <section
      id="portfolio"
      className="relative py-24 bg-gradient-to-b from-[#0a0d14] to-[#1a1f2e]"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Portfólio
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedTech(null)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 cursor-pointer
              ${
                !selectedTech
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-600"
              }`}
          >
            Todos
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 cursor-pointer
                ${
                  selectedTech === tech
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600"
                }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.a
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden
                border border-gray-700/50 hover:border-blue-500
                transform hover:-translate-y-2 transition-all duration-300
                hover:shadow-xl hover:shadow-blue-500/10 block"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full
                      bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:32px_32px]"></div>
    </section>
  );
}
