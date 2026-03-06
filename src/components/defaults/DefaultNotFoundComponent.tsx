import { Link } from "@tanstack/solid-router";

export function DefaultNotFoundComponent() {
  return (
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 class="text-6xl font-extrabold text-gray-300 mb-4">404</h1>
      <h2 class="text-2xl font-semibold mb-2">Page introuvable</h2>
      <p class="text-gray-600 mb-8">
        Désolé, la page que vous recherchez n'existe pas.
      </p>

      <Link
        to="/"
        class="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-shadow shadow-lg hover:shadow-blue-200"
      >
        Retourner à l'accueil
      </Link>
    </div>
  );
}
