"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/quote");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14]">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-40">
        <div className="w-full max-w-md relative">
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-10 rounded-lg"></div>

          <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center border border-red-500/20">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-gray-300 font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg 
                      text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                      focus:ring-blue-500 transition-colors"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-gray-300 font-medium"
                >
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-700 rounded-lg 
                      text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 
                      focus:ring-blue-500 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                  hover:bg-blue-500 transition-all duration-300 transform hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-lg hover:shadow-blue-500/25"
              >
                Entrar
              </button>

              <p className="text-center text-gray-400">
                Não tem uma conta?{" "}
                <Link
                  href="/auth/register"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Registre-se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
