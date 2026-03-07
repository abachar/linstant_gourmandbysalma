import { HeaderCancelButton } from "@components/buttons";
import { PageLayout } from "@components/layouts";
import { amount, datetimeLong } from "@common/format";
import { dateLong } from "@common/format/date";
import { Link, useNavigate } from "@tanstack/solid-router";
import { createSignal, Show, type Component } from "solid-js";
import type { GetPurchaseByIdReturn } from "../api.functions";
import { deletePurchaseFn } from "../api.functions";

export const PurchaseShowPage: Component<{ purchase: GetPurchaseByIdReturn }> = ({ purchase }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = createSignal(false);

  async function handleDelete() {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet achat ?")) return;
    setIsDeleting(true);
    try {
      await deletePurchaseFn({ data: { id: purchase.id } });
      navigate({ to: "/purchases/" });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <PageLayout title="Détail de l'achat" action={<HeaderCancelButton />}>
      <div class="space-y-4">
        <div class="p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-white/5">
          <div class="py-3">
            <p class="text-slate-400 dark:text-white/40 text-[11px] font-bold uppercase tracking-widest mb-2">
              Date
            </p>
            <p class="text-slate-800 dark:text-slate-200">{dateLong(purchase.date)}</p>
          </div>

          <div class="py-3 border-t border-slate-100 dark:border-white/5">
            <p class="text-slate-400 dark:text-white/40 text-[11px] font-bold uppercase tracking-widest mb-2">
              Montant
            </p>
            <p class="text-2xl font-black text-slate-900 dark:text-white">{amount(purchase.amount)}</p>
          </div>

          <Show when={purchase.description}>
            <div class="py-3 border-t border-slate-100 dark:border-white/5">
              <p class="text-slate-400 dark:text-white/40 text-[11px] font-bold uppercase tracking-widest mb-2">
                Description
              </p>
              <p class="text-sm text-slate-800 dark:text-slate-200">{purchase.description}</p>
            </div>
          </Show>
        </div>

        <p class="text-center text-slate-400 dark:text-white/40 text-xs italic">
          Créé le {datetimeLong(purchase.createdAt)}
        </p>

        <div class="flex gap-3 pt-4">
          <Link
            to="/purchases/$id/edit"
            params={{ id: purchase.id }}
            class="flex-1 h-12 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined">edit</span>
            Modifier
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting()}
            class="flex-1 h-12 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span class="material-symbols-outlined">delete</span>
            Supprimer
          </button>
        </div>
      </div>
    </PageLayout>
  );
};
