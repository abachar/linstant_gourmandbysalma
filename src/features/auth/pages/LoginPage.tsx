import salmaImg from "@assets/images/salma.jpeg";
import { type Component, createSignal } from "solid-js";

export const LoginPage: Component = () => {
	const [isPending] = createSignal(false);
	const [error] = createSignal("");

	return (
		<div class="flex items-center justify-center p-4 mt-50">
			<div class="w-full max-w-sm">
				<div class="text-center mb-8">
					<div class="flex justify-center mb-4">
						<div class="flex size-20 shrink-0 items-center overflow-hidden rounded-full border-2 border-primary">
							<div class="bg-center bg-no-repeat aspect-square bg-cover size-full">
								<img src={salmaImg} alt="Salma" />
							</div>
						</div>
					</div>
					<h1 class="text-2xl font-bold text-slate-900 dark:text-white">L'Instant Gourmand</h1>
					<p class="text-primary text-sm font-medium mt-1">Accédez à votre espace d'administration</p>
				</div>

				<form class="space-y-4">
					{error() && (
						<div class="flex gap-2 items-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
							<span class="material-symbols-outlined">error</span>
							<span>{error()}</span>
						</div>
					)}

					<input
						type="password"
						name="password"
						required
						auto-focus
						placeholder="Entrez le mot de passe"
						class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-border-dark bg-white dark:bg-card-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					/>

					<button
						type="submit"
						disabled={isPending()}
						class="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
					>
						Se connecter
					</button>
				</form>
			</div>
		</div>
	);
};
