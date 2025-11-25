import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import UserNav from "@/components/user-nav";
import DeleteButton from "@/components/delete-button";
import { AlertTriangle, Lightbulb, FileText, Clock, CheckCircle, XCircle } from "lucide-react";

function SubmissionItem({ sub }: { sub: any }) {
  return (
    <li className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">{sub.title}</h3>
          </div>
          <p className="text-sm text-gray-500 line-clamp-1">{sub.description}</p>
          <p className="text-xs text-gray-400">
            {new Date(sub.createdAt).toLocaleDateString("it-IT", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {sub.status === "PENDING" && (
            <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" /> In attesa
            </span>
          )}
          {sub.status === "APPROVED" && (
            <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" /> Presa in carico
            </span>
          )}
          {sub.status === "REJECTED" && (
            <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <XCircle className="w-3 h-3" /> Rifiutata
            </span>
          )}
          {sub.status === "COMPLETED" && (
            <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" /> Completata
            </span>
          )}
          {sub.status === "PENDING" && <DeleteButton id={sub.id} />}
        </div>
      </div>
    </li>
  );
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const submissions = await prisma.submission.findMany({
    where: {
      author: {
        email: session.user?.email as string,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Segnalazioni Einaudi</h1>
          <div className="flex items-center gap-4">
            {session.user?.admin && (
              <Link
                href="/admin"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Admin Dashboard
              </Link>
            )}
            <UserNav />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/submit?type=REPORT"
            className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-red-100"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Segnala un Problema</h2>
                <p className="text-gray-500">
                  Vuoi segnalare un problema o una situazione che secondo te merita attenzione? Raccontaci cosa sta succedendo.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/submit?type=PROPOSAL"
            className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-yellow-100"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                <Lightbulb className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Proponi un'Idea</h2>
                <p className="text-gray-500">
                  Hai un’idea o una proposta che potrebbe migliorare la scuola o la vita degli studenti? Scrivila qui.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Segnalazioni */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Le tue Segnalazioni
            </h2>
            {submissions.filter((s) => s.type === "REPORT").length === 0 ? (
              <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">Nessuna segnalazione inviata.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {submissions
                    .filter((s) => s.type === "REPORT")
                    .map((sub) => (
                      <SubmissionItem key={sub.id} sub={sub} />
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Proposte */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Le tue Proposte
            </h2>
            {submissions.filter((s) => s.type === "PROPOSAL").length === 0 ? (
              <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-sm">Nessuna proposta inviata.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {submissions
                    .filter((s) => s.type === "PROPOSAL")
                    .map((sub) => (
                      <SubmissionItem key={sub.id} sub={sub} />
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
