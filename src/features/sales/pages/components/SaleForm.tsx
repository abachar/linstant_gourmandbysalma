import { type Component, For } from "solid-js";
import { createStore } from "solid-js/store";
import { PaymentMethodValue } from "./PaymentMethodValue";
import { CreditCard, HandCoins } from "lucide-solid";

const PAYMENT_METHODS = ["Bank", "Cash"] as const;

export interface SaleFormValues {
	clientName: string;
	deliveryDatetime: string;
	deliveryAddress: string;
	description: string;
	amount: string;
	deposit: string;
	depositPaymentMethod: string;
	remaining: string;
	remainingPaymentMethod: string;
}

interface SaleFormProps {
	initialValues: SaleFormValues;
	onSubmit: (values: SaleFormValues) => Promise<void>;
	submitLabel: string;
	cancelHref: string;
	isPending: boolean;
}

export const SaleForm: Component<SaleFormProps> = (props) => {
	const [values, setValues] = createStore<SaleFormValues>(props.initialValues);

	function set(key: keyof SaleFormValues, value: string) {
		setValues(key, value);
	}

	function onAmountChange(amountVal: string) {
		const a = parseFloat(amountVal) || 0;
		const remaining = Math.ceil((a * 0.7) / 10) * 10;
		const deposit = a - remaining;
		setValues("amount", amountVal);
		setValues("deposit", deposit.toFixed(2));
		setValues("remaining", remaining.toFixed(2));
	}

	function onDepositChange(depositVal: string) {
		const a = parseFloat(values.amount) || 0;
		const d = parseFloat(depositVal) || 0;
		setValues("deposit", depositVal);
		setValues("remaining", (a - d).toFixed(2));
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		await props.onSubmit({ ...values });
	}

	return (
		<form onSubmit={handleSubmit} class="space-y-6">
			{/* Client */}
			<div>
				<h3 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
					Informations Client
				</h3>
				<div class="flex flex-col gap-4">
					<label class="flex flex-col">
						<p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
							Nom du client <span class="text-primary">*</span>
						</p>
						<input
							type="text"
							required
							value={values.clientName}
							onInput={(e) => set("clientName", e.currentTarget.value)}
							placeholder="Ex: Marie Lefebvre"
							class="form-input w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark h-14 placeholder:text-slate-400 dark:placeholder:text-[#c9929b] px-4 text-base font-normal"
						/>
					</label>
					<label class="flex flex-col">
						<p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
							Adresse de livraison
						</p>
						<textarea
							rows={2}
							value={values.deliveryAddress}
							onInput={(e) => set("deliveryAddress", e.currentTarget.value)}
							placeholder="15 Rue de Rivoli, Paris"
							class="form-textarea w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark placeholder:text-slate-400 dark:placeholder:text-[#c9929b] px-4 py-3 text-base font-normal resize-none"
						/>
					</label>
				</div>
			</div>

			{/* Logistique */}
			<div>
				<h3 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
					Logistique
				</h3>
				<div>
					<label class="flex flex-col">
						<p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
							Date et heure de livraison <span class="text-primary">*</span>
						</p>
						<div class="flex w-full items-center rounded-lg border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark h-14 px-4">
							<input
								type="datetime-local"
								required
								value={values.deliveryDatetime}
								onInput={(e) => set("deliveryDatetime", e.currentTarget.value)}
								class="bg-transparent border-none text-slate-900 dark:text-white w-full focus:ring-0 p-0 text-base"
							/>
						</div>
					</label>
				</div>
			</div>

			{/* Commande */}
			<div>
				<h3 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
					Détails Commande
				</h3>
				<div>
					<label class="flex flex-col">
						<p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
							Description des produits
						</p>
						<textarea
							rows={3}
							value={values.description}
							onInput={(e) => set("description", e.currentTarget.value)}
							placeholder="Ex: 20 Mini-burgers, 15 Navettes saumon..."
							class="form-textarea w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark min-h-[100px] placeholder:text-slate-400 dark:placeholder:text-[#c9929b] px-4 py-3 text-base font-normal resize-none"
						/>
					</label>
				</div>
			</div>

			{/* Paiement */}
			<div>
				<h3 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
					Paiement
				</h3>
				<div class="space-y-6">
					<div class="bg-primary/5 dark:bg-primary/10 rounded-xl p-5 border border-primary/20">
						<div class="space-y-4">
							{/* Montant total */}
							<label class="flex flex-col">
								<p class="text-primary font-bold text-sm mb-2">
									Montant Total (€) <span class="text-primary">*</span>
								</p>
								<input
									type="number"
									step="0.01"
									required
									value={values.amount}
									onInput={(e) => onAmountChange(e.currentTarget.value)}
									placeholder="0.00"
									class="form-input w-full rounded-lg text-lg font-bold bg-white dark:bg-background-dark border-primary/30 text-slate-900 dark:text-white focus:ring-primary px-4 py-3"
								/>
							</label>

							{/* Acompte */}
							<label class="flex flex-col pt-2 border-t border-primary/10 space-y-2">
								<p class="text-primary font-bold text-sm">Acompte (~30%) *</p>
								<div class="flex gap-2">
									<input
										type="number"
										step="0.01"
										required
										value={values.deposit}
										onInput={(e) => onDepositChange(e.currentTarget.value)}
										placeholder="0.00"
										class="form-input w-full rounded-lg text-lg font-bold bg-white dark:bg-background-dark border-primary/30 text-slate-900 dark:text-white focus:ring-primary px-4 py-3"
									/>
									<For each={PAYMENT_METHODS}>
										{(method) => (
											<label class="cursor-pointer">
												<input
													type="radio"
													name="deposit_payment_method"
													value={method}
													checked={values.depositPaymentMethod === method}
													onChange={() => set("depositPaymentMethod", method)}
													class="peer hidden"
												/>
												<div class="peer-checked:border-primary peer-checked:border-2 peer-checked:bg-primary peer-checked:text-white flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-400 transition-all">
													{method === "Bank" ? <CreditCard /> : <HandCoins />}
													<span class="text-xs font-bold mt-1">
														<PaymentMethodValue value={method} />
													</span>
												</div>
											</label>
										)}
									</For>
								</div>
							</label>

							{/* Solde */}
							<label class="flex flex-col pt-2 border-t border-primary/10 space-y-2">
								<p class="text-slate-500 dark:text-slate-400 font-bold text-sm">Solde (70%)</p>
								<div class="flex gap-2">
									<input
										type="number"
										step="0.01"
										readOnly
										value={values.remaining}
										placeholder="0.00"
										class="form-input w-full rounded-lg text-lg font-bold bg-white dark:bg-background-dark border-primary/30 text-slate-900 dark:text-white focus:ring-primary px-4 py-3"
									/>
									<For each={PAYMENT_METHODS}>
										{(method) => (
											<label class="cursor-pointer">
												<input
													type="radio"
													name="remaining_payment_method"
													value={method}
													checked={values.remainingPaymentMethod === method}
													onChange={() => set("remainingPaymentMethod", method)}
													class="peer hidden"
												/>
												<div class="peer-checked:border-primary peer-checked:border-2 peer-checked:bg-primary peer-checked:text-white flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-400 transition-all">
													{method === "Bank" ? <CreditCard /> : <HandCoins />}
													<span class="text-xs font-bold mt-1">
														<PaymentMethodValue value={method} />
													</span>
												</div>
											</label>
										)}
									</For>
								</div>
							</label>
						</div>
					</div>
				</div>
			</div>

			{/* Fixed Footer */}
			<div class="flex gap-3 pt-4">
				<a
					href={props.cancelHref}
					class="flex-1 h-14 rounded-xl border border-slate-300 dark:border-[#67323b] text-slate-700 dark:text-white font-bold text-base flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
				>
					Annuler
				</a>
				<button
					type="submit"
					disabled={props.isPending}
					class="flex-[2] h-14 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 active:scale-95 transition-transform disabled:opacity-50"
				>
					{props.submitLabel}
				</button>
			</div>
		</form>
	);
};
