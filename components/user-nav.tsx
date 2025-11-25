"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, User } from "lucide-react";

export default function UserNav() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      <div className="text-right hidden md:block">
        <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
        <p className="text-xs text-gray-500">{session?.user?.email}</p>
      </div>
      <button
        onClick={() => signOut()}
        className="p-2 text-gray-500 hover:text-red-600 transition-colors"
        title="Esci"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
}
