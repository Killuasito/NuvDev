"use client";

import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import { Quote } from "@/types";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { FaClock, FaCheck, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    const q = query(
      collection(db, "quotes"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const quotesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            deadline: new Date(data.deadline), // Convert string date to Date object
          };
        }) as unknown as Quote[];
        setQuotes(quotesData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Error fetching quotes:", error);
        setError(
          "Erro ao carregar orçamentos. Por favor, tente novamente mais tarde."
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, router]);

  const getStatusDetails = (status: Quote["status"]) => {
    const details = {
      pending: {
        icon: FaClock,
        label: "Pendente",
        color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      },
      in_progress: {
        icon: FaClock,
        label: "Em Andamento",
        color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      },
      completed: {
        icon: FaCheck,
        label: "Concluído",
        color: "text-green-400 bg-green-400/10 border-green-400/20",
      },
      cancelled: {
        icon: FaTimes,
        label: "Cancelado",
        color: "text-red-400 bg-red-400/10 border-red-400/20",
      },
    };
    return details[status];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0d14]">
        <Header />
        <main className="flex-grow container mx-auto px-6 py-32">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-gray-700/50 rounded-lg"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-24 bg-gray-800/50 rounded-xl"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14]">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Meus Orçamentos
          </h1>

          {error ? (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center border border-red-500/20">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">
                    Você ainda não possui orçamentos solicitados.
                  </p>
                  <a
                    href="/quote"
                    className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg 
                      hover:bg-blue-500 transition-all duration-300"
                  >
                    Solicitar Orçamento
                  </a>
                </div>
              ) : (
                quotes.map((quote) => {
                  const status = getStatusDetails(quote.status);
                  const StatusIcon = status.icon;

                  return (
                    <div
                      key={quote.id}
                      className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50
                        hover:border-blue-500/50 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-white">
                              {quote.projectType}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm border flex items-center gap-2 ${status.color}`}
                            >
                              <StatusIcon className="w-4 h-4" />
                              {status.label}
                            </span>
                          </div>
                          <p className="text-gray-400">{quote.description}</p>
                          <div className="flex gap-6 text-sm text-gray-500">
                            <span>Orçamento: {quote.budget}</span>
                            <span>
                              Prazo:{" "}
                              {new Date(quote.deadline).toLocaleDateString()}
                            </span>
                            <span>
                              Data do pedido:{" "}
                              {(quote.createdAt instanceof Date
                                ? quote.createdAt
                                : quote.createdAt?.toDate?.() || new Date()
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
