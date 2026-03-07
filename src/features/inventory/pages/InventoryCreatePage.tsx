import { HeaderCancelButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import { useNavigate } from "@tanstack/solid-router";
import { type Component, createSignal } from "solid-js";
import { createInventoryItemFn } from "../api.functions";

export const InventoryCreatePage: Component = () => {
	const navigate = useNavigate();
	const [productName, setProductName] = createSignal("");
	const [quantity, setQuantity] = createSignal("0");
	const [isPending, setIsPending] = createSignal(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		setIsPending(true);
		try {
			await createInventoryItemFn({
				data: { productName: productName(), quantity: parseInt(quantity(), 10) },
			});
			navigate({ to: "/inventory/" });
		} finally {
			setIsPending(false);
		}
	}

	return (
		<PageLayout title="Ajouter au stock" action={<HeaderCancelButton />}>
			<form onSubmit={handleSubmit} class="space-y-6">
				<div class="space-y-4">
					<label class="flex flex-col">
						<p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
							Nom du produit <span class="text-primary">*</span>
						</p>
						<input
							type="text"
							required
							value={productName()}
							onInput={(e) => setProductName(e.currentTarget.value)}
							placeholder="Ex: Mini Burger Poulet"
							class="form-input w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark h-14 placeholder:text-slate-400 dark:placeholder:text-[#c9929b] px-4 text-base font-normal"
						/>
					</label>

					<label class="flex flex-col">
						<p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
							Quantité <span class="text-primary">*</span>
						</p>
						<input
							type="number"
							required
							value={quantity()}
							onInput={(e) => setQuantity(e.currentTarget.value)}
							class="form-input w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark h-14 placeholder:text-slate-400 dark:placeholder:text-[#c9929b] px-4 text-base font-normal"
						/>
					</label>
				</div>

				<div class="flex gap-3 pt-4">
					<a
						href="/inventory/"
						class="flex-1 h-14 rounded-xl border border-slate-300 dark:border-[#67323b] text-slate-700 dark:text-white font-bold text-base flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
					>
						Annuler
					</a>
					<button
						type="submit"
						disabled={isPending()}
						class="flex-[2] h-14 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 active:scale-95 transition-transform disabled:opacity-50"
					>
						Ajouter
					</button>
				</div>
			</form>
		</PageLayout>
	);
};
