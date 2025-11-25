"use client";

import { createSubmission } from "@/app/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { Loader2 } from "lucide-react";
import AlertModal from "./alert-modal";

function SubmissionFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "REPORT";
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, title: "", description: "" });

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await createSubmission(formData);
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      // Extract error message if possible
      const message = error.message || "Si è verificato un errore durante l'invio. Riprova più tardi.";
      
      setErrorModal({
        isOpen: true,
        title: "Attenzione",
        description: message
      });
      setLoading(false);
    }
  };

  return (
    <>
      <form action={handleSubmit} className="space-y-6">
        <input type="hidden" name="type" value={type} />
        
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titolo
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white"
            placeholder={type === "REPORT" ? "Es. Proiettore rotto in 3A" : "Es. Macchinette nell'atrio"}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrizione
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-900 bg-white"
            placeholder={
              type === "REPORT"
                ? "Descrivi il problema in dettaglio..."
                : "Descrivi la tua idea..."
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Invio in corso...
            </>
          ) : (
            "Invia"
          )}
        </button>
      </form>

      <AlertModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
        title={errorModal.title}
        description={errorModal.description}
      />
    </>
  );
}

export default function SubmissionForm() {
  return (
    <Suspense fallback={<div>Caricamento form...</div>}>
      <SubmissionFormContent />
    </Suspense>
  );
}
