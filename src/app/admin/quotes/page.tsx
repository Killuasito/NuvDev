"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Quote } from "@/types";
import { FaFilter, FaCheck, FaClock, FaTimes } from "react-icons/fa";

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const quotesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        deadline: doc.data().deadline?.toDate(),
      })) as Quote[];
      setQuotes(quotesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (
    quoteId: string,
    newStatus: Quote["status"]
  ) => {
    try {
      await updateDoc(doc(db, "quotes", quoteId), {
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating quote status:", error);
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    if (filter === "all") return true;
    return quote.status === filter;
  });

  const getStatusColor = (status: Quote["status"]) => {
    const colors = {
      pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      in_progress: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      completed: "text-green-400 bg-green-400/10 border-green-400/20",
      cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
    };
    return colors[status];
  };

  const getStatusIcon = (status: Quote["status"]) => {
    const icons = {
      pending: FaClock,
      in_progress: FaCheck,
      completed: FaCheck,
      cancelled: FaTimes,
    };
    const Icon = icons[status];
    return <Icon className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 bg-gray-700/50 rounded-lg"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-24 bg-gray-800/50 rounded-xl"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Gerenciar Orçamentos
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
              <FaFilter className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-gray-300 outline-none"
              >
                <option value="all" className="bg-[#1a1f2e]">
                  Todos
                </option>
                <option value="pending" className="bg-[#1a1f2e]">
                  Pendentes
                </option>
                <option value="in_progress" className="bg-[#1a1f2e]">
                  Em Andamento
                </option>
                <option value="completed" className="bg-[#1a1f2e]">
                  Concluídos
                </option>
                <option value="cancelled" className="bg-[#1a1f2e]">
                  Cancelados
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50
                hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">
                      {quote.userEmail}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(
                        quote.status
                      )} flex items-center gap-2`}
                    >
                      {getStatusIcon(quote.status)}
                      {quote.status === "pending" && "Pendente"}
                      {quote.status === "in_progress" && "Em Andamento"}
                      {quote.status === "completed" && "Concluído"}
                      {quote.status === "cancelled" && "Cancelado"}
                    </span>
                  </div>
                  <p className="text-gray-400">{quote.description}</p>
                  <div className="flex gap-6 text-sm text-gray-500">
                    <span>Orçamento: {quote.budget}</span>
                    <span>
                      Prazo: {new Date(quote.deadline).toLocaleDateString()}
                    </span>
                    <span>Tipo: {quote.projectType}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <select
                    value={quote.status}
                    onChange={(e) =>
                      quote.id &&
                      handleStatusUpdate(
                        quote.id,
                        e.target.value as Quote["status"]
                      )
                    }
                    className="bg-white/5 border border-gray-700 rounded-lg px-3 py-1
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
          ))}

          {filteredQuotes.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Nenhum orçamento encontrado.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
