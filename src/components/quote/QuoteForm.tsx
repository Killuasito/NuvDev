"use client";

import { useAuth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import {
  FaBuilding,
  FaCalendar,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";

export default function QuoteForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectType: "",
    description: "",
    budget: "",
    deadline: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!user) {
        router.push("/auth/login");
        return;
      }

      await addDoc(collection(db, "quotes"), {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
        status: "pending",
        createdAt: new Date(),
      });

      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erro ao enviar orçamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14]">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-40">
        <div className="w-full max-w-2xl relative">
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-10 rounded-lg"></div>

          <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Solicitar Orçamento
            </h1>

            {error && (
              <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center border border-red-500/20 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-300 font-medium">
                  Tipo de Projeto
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBuilding className="text-gray-400" />
                  </div>
                  <select
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg 
                      text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors
                      appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-[#1a1f2e] text-gray-400">
                      Selecione um tipo...
                    </option>
                    <option value="website" className="bg-[#1a1f2e]">
                      Website
                    </option>
                    <option value="app" className="bg-[#1a1f2e]">
                      Aplicativo Mobile
                    </option>
                    <option value="ecommerce" className="bg-[#1a1f2e]">
                      E-commerce
                    </option>
                    <option value="other" className="bg-[#1a1f2e]">
                      Outro
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-300 font-medium">
                  Descrição do Projeto
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FaFileAlt className="text-gray-400" />
                  </div>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg 
                      text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                      focus:ring-blue-500 transition-colors min-h-[120px]"
                    placeholder="Descreva seu projeto em detalhes..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-300 font-medium">
                  Orçamento Previsto
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMoneyBillWave className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg 
                      text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                      focus:ring-blue-500 transition-colors"
                    placeholder="Ex: R$ 5.000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-300 font-medium">
                  Prazo Desejado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg 
                      text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full group bg-blue-600 text-white py-3 rounded-lg font-semibold
                  hover:bg-blue-500 transition-all duration-300 transform hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-lg hover:shadow-blue-500/25 mt-8
                  flex items-center justify-center space-x-2"
              >
                <span>{loading ? "Enviando..." : "Enviar Solicitação"}</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
