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

  const QuoteDetailsModal = ({
    quote,
    onClose,
  }: {
    quote: Quote;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
          <h3 className="text-xl font-semibold text-white">
            Detalhes do Orçamento
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Cliente</p>
              <p className="text-white">{quote.userEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <p className="text-white capitalize">{quote.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Tipo de Projeto</p>
              <p className="text-white">{quote.projectType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Orçamento</p>
              <p className="text-white">{quote.budget}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Prazo</p>
              <p className="text-white">
                {new Date(quote.deadline).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Data do Pedido</p>
              <p className="text-white">
                {new Date(quote.createdAt.toDate()).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">Descrição</p>
            <p className="text-white bg-white/5 p-4 rounded-lg">
              {quote.description}
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700/50">
          <select
            value={quote.status}
            onChange={(e) => {
              updateQuoteStatus(quote.id, e.target.value);
              onClose();
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
  );

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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="flex gap-4">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
              <p className="text-sm text-gray-400">Total de Orçamentos</p>
              <p className="text-2xl font-bold text-white">{quotes.length}</p>
            </div>
            {/* Add more stats cards as needed */}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700/50">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Orçamentos Recentes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-3 text-gray-400 font-medium">
                      Cliente
                    </th>
                    <th className="text-left p-3 text-gray-400 font-medium">
                      Tipo
                    </th>
                    <th className="text-left p-3 text-gray-400 font-medium">
                      Status
                    </th>
                    <th className="text-left p-3 text-gray-400 font-medium">
                      Data
                    </th>
                    <th className="text-left p-3 text-gray-400 font-medium">
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
                      <td className="p-3 text-gray-300">{quote.userEmail}</td>
                      <td className="p-3 text-gray-300">{quote.projectType}</td>
                      <td className="p-3">
                        <select
                          value={quote.status}
                          onChange={(e) =>
                            updateQuoteStatus(quote.id, e.target.value)
                          }
                          className="bg-white/5 border border-gray-700 rounded-lg px-3 py-1
                            text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="pending" className="bg-[#0a0d14]">
                            Pendente
                          </option>
                          <option value="in_progress" className="bg-[#0a0d14]">
                            Em Andamento
                          </option>
                          <option value="completed" className="bg-[#0a0d14]">
                            Concluído
                          </option>
                          <option value="cancelled" className="bg-[#0a0d14]">
                            Cancelado
                          </option>
                        </select>
                      </td>
                      <td className="p-3 text-gray-300">
                        {new Date(
                          quote.createdAt.toDate()
                        ).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => setSelectedQuote(quote)}
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <FaEye className="w-4 h-4" />
                          <span>Ver Detalhes</span>
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
      {selectedQuote && (
        <QuoteDetailsModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
        />
      )}
    </AdminLayout>
  );
}
