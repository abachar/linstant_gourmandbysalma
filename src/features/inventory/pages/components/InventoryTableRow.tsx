import { Link } from "@tanstack/solid-router";
import { Component } from "solid-js";
import { GetInventoryReturn } from "../../api.functions";

export const InventoryTableRow: Component<{ inventoryItem: GetInventoryReturn[number] }> = ({ inventoryItem }) => {
  return (
    <div class="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
      <div class="flex items-center gap-4 p-3">
        <div class="flex flex-col flex-1 min-w-0">
          <div class="flex justify-between items-start">
            <p class="text-slate-900 dark:text-white text-base font-bold leading-tight line-clamp-1">
              {inventoryItem.productName}
            </p>
            {inventoryItem.quantity === 0 ? (
              <span class="text-primary font-bold text-sm">
                0 unité
              </span>
            ) : inventoryItem.quantity < 10 ? (
              <span class="text-warning font-bold text-sm">
                {inventoryItem.quantity} unités
              </span>
            ) : (
              <span class="text-success font-bold text-sm">
                {inventoryItem.quantity} unités
              </span>
            )}
          </div>
          <div class="mt-2 flex items-center gap-1.5">
            {inventoryItem.quantity === 0 ? (
              <>
                <div class="size-2 rounded-full bg-primary" />
                <span class="text-[10px] font-bold uppercase tracking-wide text-primary">
                  Rupture
                </span>
              </>
            ) : inventoryItem.quantity < 10 ? (
              <>
                <div class="size-2 rounded-full bg-warning" />
                <span class="text-[10px] font-bold uppercase tracking-wide text-warning">
                  Stock faible
                </span>
              </>
            ) : (
              <>
                <div class="size-2 rounded-full bg-success" />
                <span class="text-[10px] font-bold uppercase tracking-wide text-success">
                  En stock
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div class="flex border-t border-slate-100 dark:border-white/5">
        <Link
          to="/inventory/$id/edit"
          params={{ id: inventoryItem.id }}
          class="flex-1 h-10 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
        >
          <span class="material-symbols-outlined text-lg">edit</span>
          Modifier
        </Link>
        <button
          type="button"
          class="flex-1 border-l border-slate-100 dark:border-white/5 h-10 flex items-center justify-center gap-2 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
        >
          <span class="material-symbols-outlined text-lg">
            delete
          </span>
          Supprimer
        </button>
      </div>
    </div>
  );
};
