"use client";

import { signIn } from "next-auth/react";
import { Chrome } from "lucide-react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
    >
      <Chrome className="w-5 h-5" />
      Accedi con Google
    </button>
  );
}
