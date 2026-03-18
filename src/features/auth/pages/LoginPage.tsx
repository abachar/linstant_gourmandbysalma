import salmaImg from "@assets/images/salma.jpeg";
import { loginFn } from "@features/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { CircleX } from "lucide-react";
import { useState } from "react";

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const {
		mutate: login,
		isPending,
		error,
	} = useMutation({
		mutationFn: loginFn,
		onSuccess: () => navigate({ to: "/" }),
	});

	return (
		<div className="flex items-center justify-center p-4 pt-40">
			<div className="w-full max-w-sm">
				<div className="text-center mb-8">
					<div className="flex justify-center mb-4">
						<div className="flex size-20 shrink-0 items-center overflow-hidden rounded-full border-2 border-primary">
							<div className="bg-center bg-no-repeat aspect-square bg-cover size-full">
								<img src={salmaImg} alt="Salma" />
							</div>
						</div>
					</div>
					<h1 className="text-2xl font-bold text-slate-900 dark:text-white">L'Instant Gourmand</h1>
					<p className="text-primary text-sm font-medium mt-1">Accédez à votre espace d'administration</p>
				</div>

				<div className="space-y-4">
					{error && (
						<div className="flex gap-2 items-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
							<CircleX size={18} />
							<span>{error?.message}</span>
						</div>
					)}

					<input
						type="text"
						name="email"
						required
						placeholder="Adresse e-mail"
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-border-dark bg-white dark:bg-card-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					/>

					<input
						type="password"
						name="password"
						required
						placeholder="Mot de passe"
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-border-dark bg-white dark:bg-card-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					/>

					<button
						type="submit"
						disabled={isPending}
						onClick={() => login({ data: { email, password } })}
						className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
					>
						{isPending ? "Connexion..." : "Se connecter"}
					</button>
				</div>
			</div>
		</div>
	);
};
