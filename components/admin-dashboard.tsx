"use client";

import { useState } from "react";
import StatusSelect from "@/components/status-select";

type Submission = {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  createdAt: Date;
  author: {
    nome: string | null;
    email: string | null;
    classe: string | null;
  };
};

export default function AdminDashboard({ submissions }: { submissions: Submission[] }) {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredSubmissions = submissions.filter((sub) => {
    if (statusFilter === "ALL") return true;
    return sub.status === statusFilter;
  });

  const reports = filteredSubmissions.filter((sub) => sub.type === "REPORT");
  const proposals = filteredSubmissions.filter((sub) => sub.type === "PROPOSAL");

  const Table = ({ items, title }: { items: Submission[]; title: string }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">
          {title} <span className="text-sm font-normal text-gray-500">({items.length})</span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titolo / Descrizione
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Autore
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stato
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Nessuna attività trovata
                </td>
              </tr>
            ) : (
              items.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{sub.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-2 max-w-md">
                      {sub.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{sub.author.nome || "N/A"}</div>
                    <div className="text-xs text-gray-500">{sub.author.email}</div>
                    <div className="text-xs text-gray-500">Classe: {sub.author.classe || "N/A"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(sub.createdAt).toLocaleDateString("it-IT")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusSelect id={sub.id} currentStatus={sub.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
        <span className="text-sm font-medium text-gray-700">Filtra per stato:</span>
        <div className="flex gap-2">
          {[
            { label: "Tutti", value: "ALL" },
            { label: "In attesa", value: "PENDING" },
            { label: "Prese in carico", value: "APPROVED" },
            { label: "Rifiutati", value: "REJECTED" },
            { label: "Completati", value: "COMPLETED" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                statusFilter === filter.value
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <Table items={reports} title="Segnalazioni" />
      <Table items={proposals} title="Proposte" />
    </div>
  );
}
