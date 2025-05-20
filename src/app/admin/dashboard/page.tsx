/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaEye, FaSpinner, FaTimes } from "react-icons/fa";
import { Quote } from "@/types";

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const fetchQuotes = async () => {
      try {
        const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const quotesData = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                userEmail: data.userEmail || "",
                projectType: data.projectType || "",
                description: data.description || "",
                budget: data.budget || "",
                deadline: data.deadline || "",
                status: data.status || "pending",
                createdAt: data.createdAt,
              } as Quote;
            });
            setQuotes(quotesData);
            setLoading(false);
            setError(null);
          },
          (error) => {
            console.error("Error fetching quotes:", error);
            if (error.code === "permission-denied") {
              setError("Você não tem permissão para acessar esta página.");
              router.push("/");
            } else {
              setError(
                "Erro ao carregar orçamentos. Tente novamente mais tarde."
              );
            }
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting up quotes listener:", error);
        setError("Erro ao configurar conexão com o servidor.");
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [user, router]);

  const updateQuoteStatus = async (quoteId: string, status: string) => {
    try {
      await updateDoc(doc(db, "quotes", quoteId), {
        status,
      });
      // Show success toast
    } catch (error) {
      // Show error toast
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <FaSpinner className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center border border-red-500/20">
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 sm:flex gap-4 w-full sm:w-auto">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 w-full sm:w-auto">
              <p className="text-sm text-gray-400">Total de Orçamentos</p>
              <p className="text-2xl font-bold text-white">{quotes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/50">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
              Orçamentos Recentes
            </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-x-auto border border-gray-700/50 rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-2 sm:p-3 text-gray-400 font-medium text-sm">
                          Cliente
                        </th>
                        <th className="text-left p-2 sm:p-3 text-gray-400 font-medium text-sm hidden sm:table-cell">
                          Tipo
                        </th>
                        <th className="text-left p-2 sm:p-3 text-gray-400 font-medium text-sm">
                          Status
                        </th>
                        <th className="text-left p-2 sm:p-3 text-gray-400 font-medium text-sm hidden sm:table-cell">
                          Data
                        </th>
                        <th className="text-left p-2 sm:p-3 text-gray-400 font-medium text-sm">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote: Quote) => (
                        <tr
                          key={quote.id}
                          className="border-b border-gray-700/50 hover:bg-white/5"
                        >
                          <td className="p-2 sm:p-3 text-gray-300 text-sm">
                            {quote.userEmail}
                          </td>
                          <td className="p-2 sm:p-3 text-gray-300 text-sm hidden sm:table-cell">
                            {quote.projectType}
                          </td>
                          <td className="p-2 sm:p-3">
                            <select
                              value={quote.status}
                              onChange={(e) =>
                                updateQuoteStatus(quote.id, e.target.value)
                              }
                              className="bg-white/5 border border-gray-700 rounded-lg px-2 py-1 text-sm
                                text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full"
                            >
                              <option value="pending" className="bg-[#0a0d14]">
                                Pendente
                              </option>
                              <option
                                value="in_progress"
                                className="bg-[#0a0d14]"
                              >
                                Em Andamento
                              </option>
                              <option
                                value="completed"
                                className="bg-[#0a0d14]"
                              >
                                Concluído
                              </option>
                              <option
                                value="cancelled"
                                className="bg-[#0a0d14]"
                              >
                                Cancelado
                              </option>
                            </select>
                          </td>
                          <td className="p-2 sm:p-3 text-gray-300 text-sm hidden sm:table-cell">
                            {new Date(
                              quote.createdAt.toDate()
                            ).toLocaleDateString()}
                          </td>
                          <td className="p-2 sm:p-3">
                            <button
                              onClick={() => setSelectedQuote(quote)}
                              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                            >
                              <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">
                                Ver Detalhes
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-700/50 sticky top-0 bg-[#1a1f2e]">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Detalhes do Orçamento
              </h3>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Cliente</p>
                  <p className="text-white">{selectedQuote.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="text-white capitalize">
                    {selectedQuote.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tipo de Projeto</p>
                  <p className="text-white">{selectedQuote.projectType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Orçamento</p>
                  <p className="text-white">{selectedQuote.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Prazo</p>
                  <p className="text-white">
                    {new Date(selectedQuote.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Data do Pedido</p>
                  <p className="text-white">
                    {new Date(
                      selectedQuote.createdAt.toDate()
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Descrição</p>
                <p className="text-white bg-white/5 p-4 rounded-lg text-sm">
                  {selectedQuote.description}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-700/50">
              <select
                value={selectedQuote.status}
                onChange={(e) => {
                  updateQuoteStatus(selectedQuote.id, e.target.value);
                  setSelectedQuote(null);
                }}
                className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2
                  text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="pending" className="bg-[#1a1f2e]">
                  Pendente
                </option>
                <option value="in_progress" className="bg-[#1a1f2e]">
                  Em Andamento
                </option>
                <option value="completed" className="bg-[#1a1f2e]">
                  Concluído
                </option>
                <option value="cancelled" className="bg-[#1a1f2e]">
                  Cancelado
                </option>
              </select>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
