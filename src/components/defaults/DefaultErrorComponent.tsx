import { type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export function DefaultErrorComponent(props: ErrorComponentProps) {
	const router = useRouter();

	useEffect(() => {
		console.error("Route Error:", props.error);
	}, [props.error]);

	return (
		<div className="p-6 flex flex-col items-center justify-center min-h-100 bg-red-50 text-red-900 rounded-lg border border-red-200">
			<h2 className="text-2xl font-bold mb-2">Oups ! Quelque chose a cassé.</h2>

			{props.error && (
				<p className="mb-4 font-mono text-sm bg-white p-3 rounded border">
					{props.error instanceof Error ? props.error.message : "Erreur inconnue"}
				</p>
			)}

			<div className="flex gap-4">
				<button
					type="button"
					onClick={() => props.reset()}
					className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
				>
					Réessayer
				</button>
				<button
					type="button"
					onClick={() => router.navigate({ to: "/" })}
					className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
				>
					Retour à l'accueil
				</button>
			</div>
		</div>
	);
}
