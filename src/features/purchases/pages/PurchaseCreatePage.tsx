import { HeaderCancelButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import { useNavigate } from "@tanstack/solid-router";
import { createSignal, type Component } from "solid-js";
import { createPurchaseFn } from "../api.functions";

export const PurchaseCreatePage: Component = () => {
  const navigate = useNavigate();
  const [date, setDate] = createSignal("");
  const [amount, setAmount] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [isPending, setIsPending] = createSignal(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    setIsPending(true);
    try {
      await createPurchaseFn({
        data: {
          date: date(),
          amount: amount(),
          description: description() || undefined,
        },
      });
      navigate({ to: "/purchases/" });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <PageLayout title="Nouvel achat" action={<HeaderCancelButton />}>
      <form onSubmit={handleSubmit} class="space-y-6">
        <div class="space-y-4">
          <label class="flex flex-col">
            <p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
              Date <span class="text-primary">*</span>
            </p>
            <div class="flex w-full items-center rounded-lg border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark h-14 px-4">
              <input
                type="date"
                required
                value={date()}
                onInput={(e) => setDate(e.currentTarget.value)}
                class="bg-transparent border-none text-slate-900 dark:text-white w-full focus:ring-0 p-0 text-base"
              />
            </div>
          </label>

          <label class="flex flex-col">
            <p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
              Montant (€) <span class="text-primary">*</span>
            </p>
            <input
              type="number"
              step="0.01"
              required
              value={amount()}
              onInput={(e) => setAmount(e.currentTarget.value)}
              placeholder="0.00"
              class="form-input w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark h-14 placeholder:text-slate-400 dark:placeholder:text-[#c9929b] px-4 text-base font-normal"
            />
          </label>

          <label class="flex flex-col">
            <p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
              Description
            </p>
            <textarea
              rows={3}
              value={description()}
              onInput={(e) => setDescription(e.currentTarget.value)}
              placeholder="Ex: Achat ingrédients, fournitures..."
              class="form-textarea w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-[#67323b] bg-white dark:bg-surface-dark min-h-[100px] placeholder:text-slate-400 dark:placeholder:text-[#c9929b] px-4 py-3 text-base font-normal resize-none"
            />
          </label>
        </div>

        <div class="flex gap-3 pt-4">
          <a
            href="/purchases/"
            class="flex-1 h-14 rounded-xl border border-slate-300 dark:border-[#67323b] text-slate-700 dark:text-white font-bold text-base flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Annuler
          </a>
          <button
            type="submit"
            disabled={isPending()}
            class="flex-[2] h-14 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/25 active:scale-95 transition-transform disabled:opacity-50"
          >
            Créer l'achat
          </button>
        </div>
      </form>
    </PageLayout>
  );
};
