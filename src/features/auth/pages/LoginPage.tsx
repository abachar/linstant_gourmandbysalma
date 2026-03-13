import salmaImg from "@assets/images/salma.jpeg";
import { useMutation } from "@common/hooks";
import { loginFn } from "@features/auth";
import { useNavigate } from "@tanstack/solid-router";
import { CircleX } from "lucide-solid";
import { type Component, createSignal, Show } from "solid-js";

export const LoginPage: Component = () => {
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const navigate = useNavigate();
	const {
		mutate: login,
		isLoading,
		error,
	} = useMutation({
		fn: loginFn,
		onSuccess: () => navigate({ to: "/" }),
	});

	return (
		<div class="flex items-center justify-center p-4 pt-40">
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

				<div class="space-y-4">
					<Show when={error()}>
						<div class="flex gap-2 items-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
							<CircleX size={18} />
							<span>{error()}</span>
						</div>
					</Show>

					<input
						type="text"
						name="email"
						required
						autofocus
						placeholder="Adresse e-mail"
						onInput={(e) => setEmail(e.target.value)}
						class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-border-dark bg-white dark:bg-card-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					/>

					<input
						type="password"
						name="password"
						required
						autofocus
						placeholder="Mot de passe"
						onInput={(e) => setPassword(e.target.value)}
						class="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-border-dark bg-white dark:bg-card-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					/>

					<button
						type="submit"
						disabled={isLoading()}
						onClick={() => login({ data: { email: email(), password: password() } })}
						class="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
					>
						{isLoading() ? "Connexion..." : "Se connecter"}
					</button>
				</div>
			</div>
		</div>
	);
};
