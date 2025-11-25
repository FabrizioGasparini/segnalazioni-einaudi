"use client";

import LoginButton from "@/components/login-button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [showSecret, setShowSecret] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSecretLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Portale Segnalazioni</h1>
          <p className="text-gray-600">
            Benvenuto nel sistema di gestione segnalazioni e proposte dell'Istituto Einaudi.
            Accedi per inviare una segnalazione o proporre una nuova idea per la scuola.
          </p>
          <p className="text-sm text-gray-500 pt-2">Accedi con la tua email scolastica @einaudicorreggio.it</p>
        </div>
        
        <div className="flex justify-center">
          <LoginButton />
        </div>

        {showSecret && (
          <form onSubmit={handleSecretLogin} className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
            <div className="flex gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password Amministratore"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "..." : "Accedi"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setShowSecret(!showSecret)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
          >
            Istituto Tecnico Statale L.Einaudi - Correggio
            {showSecret && <Lock className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}
