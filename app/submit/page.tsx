import SubmissionForm from "@/components/submission-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function SubmitPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { type: typeParam } = await searchParams;
  const type = typeParam === "PROPOSAL" ? "PROPOSAL" : "REPORT";
  const title = type === "REPORT" ? "Segnala un Problema" : "Proponi un'Idea";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Torna alla Home
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-500 mt-2">
              Compila il modulo sottostante. Le tue informazioni verranno inviate all'amministrazione.
            </p>
          </div>

          <SubmissionForm />
        </div>
      </div>
    </div>
  );
}
