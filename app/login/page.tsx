import LoginButton from "@/components/login-button";

export default function LoginPage() {
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

        <p className="text-xs text-gray-400 mt-8">
          Istituto Tecnico Statale L.Einaudi - Correggio
        </p>
      </div>
    </div>
  );
}
