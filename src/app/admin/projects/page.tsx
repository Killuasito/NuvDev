"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Project } from "@/types";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projectsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
    setProjects(projectsData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
        link: formData.link,
        imageUrl: formData.imageUrl,
        createdAt: new Date(),
      };

      if (editingProject?.id) {
        await updateDoc(doc(db, "projects", editingProject.id), projectData);
      } else {
        await addDoc(collection(db, "projects"), projectData);
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      try {
        await deleteDoc(doc(db, "projects", projectId));
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      link: project.link || "",
      imageUrl: project.imageUrl || "",
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      link: "",
      imageUrl: "",
    });
    setEditingProject(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6 px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Gerenciar Projetos
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm p-4 sm:p-8 rounded-xl border border-gray-700/50"
        >
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
              <label className="block mb-2 text-sm sm:text-base text-gray-300 font-medium">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 border border-gray-700 rounded-lg 
                  text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                  focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm sm:text-base text-gray-300 font-medium">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 border border-gray-700 rounded-lg 
                  text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                  focus:ring-blue-500 transition-colors"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm sm:text-base text-gray-300 font-medium">
                Tecnologias (separadas por vírgula)
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) =>
                  setFormData({ ...formData, technologies: e.target.value })
                }
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 border border-gray-700 rounded-lg 
                  text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                  focus:ring-blue-500 transition-colors"
                placeholder="React, Node.js, TypeScript"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm sm:text-base text-gray-300 font-medium">
                Link do Projeto
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 border border-gray-700 rounded-lg 
                  text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                  focus:ring-blue-500 transition-colors"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block mb-2 text-sm sm:text-base text-gray-300 font-medium">
                URL da Imagem
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 border border-gray-700 rounded-lg 
                  text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                  focus:ring-blue-500 transition-colors"
                placeholder="https://exemplo.com/imagem.jpg"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 
                  transition-colors border border-gray-600 text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 
                  transition-all duration-300 transform hover:scale-[1.02]
                  shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
              >
                {editingProject ? "Atualizar" : "Adicionar"} Projeto
              </button>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700/50
                hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between mb-4">
                <h3
                  className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-400 
                  transition-colors"
                >
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 sm:flex-none text-sm text-blue-400 hover:text-blue-300 transition-colors px-3 py-1.5
                      bg-blue-500/10 rounded-lg hover:bg-blue-500/20"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => project.id && handleDelete(project.id)}
                    className="flex-1 sm:flex-none text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1.5
                      bg-red-500/10 rounded-lg hover:bg-red-500/20"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-400 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs sm:text-sm bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full
                      border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
