"use client";

import { deleteSubmission } from "@/app/admin/actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "./confirm-modal";

export default function AdminDeleteButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteSubmission(id);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Errore durante l'eliminazione.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        title="Elimina definitivamente"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Elimina Attività"
        description="Sei sicuro di voler eliminare questa attività? L'azione è irreversibile e verrà rimossa dal database."
        loading={loading}
      />
    </>
  );
}
