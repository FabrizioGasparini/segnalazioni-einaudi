"use client";

import { updateStatus } from "@/app/admin/actions";
import { useState } from "react";

export default function StatusSelect({ id, currentStatus }: { id: number; currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    try {
      await updateStatus(id, e.target.value);
    } catch (error) {
      console.error(error);
      alert("Errore durante l'aggiornamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={loading}
      className={`text-xs font-medium px-2 py-1 rounded-full border-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
        currentStatus === "PENDING"
          ? "bg-yellow-100 text-yellow-700"
          : currentStatus === "APPROVED"
          ? "bg-green-100 text-green-700"
          : currentStatus === "REJECTED"
          ? "bg-red-100 text-red-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      <option value="PENDING">In attesa</option>
      <option value="APPROVED">Presa in carico</option>
      <option value="REJECTED">Rifiutata</option>
      <option value="COMPLETED">Completata</option>
    </select>
  );
}
