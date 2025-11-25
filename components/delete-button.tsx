"use client";

import { deleteSubmission } from "@/app/actions";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "./confirm-modal";

export default function DeleteButton({ id }: { id: number }) {
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
        title="Elimina"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Elimina Segnalazione"
        description="Sei sicuro di voler eliminare questa segnalazione? L'azione non può essere annullata."
        loading={loading}
      />
    </>
  );
}
