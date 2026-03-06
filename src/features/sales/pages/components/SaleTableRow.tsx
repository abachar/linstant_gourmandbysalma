import { amount, dateShort } from "@common/format";
import { Link } from "@tanstack/solid-router";
import { Component } from "solid-js";
import { GetSalesReturn } from "../../api.functions";

export const SaleTableRow: Component<{ sale: GetSalesReturn[number] }> = ({ sale }) => {
  return (
    <Link
      to="/sales/$id"
      params={{ id: sale.id }}
      class="block p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-white/5"
    >
      <div class="flex flex-col gap-3">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <p class="text-slate-500 dark:text-[#c9929b] text-xs font-medium flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">
                  schedule
                </span>
                {dateShort(sale.deliveryDatetime)}
              </p>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              {sale.clientName}
            </h3>
          </div>
          <p class="text-xl font-black text-slate-900 dark:text-white">
            {amount(sale.amount)}
          </p>
        </div>

        {sale.deliveryAddress && (
          <div class="flex items-start gap-2 py-2 border-y border-slate-50 dark:border-white/5">
            <span class="material-symbols-outlined text-slate-400 text-lg">
              location_on
            </span>
            <p class="text-sm text-slate-600 dark:text-[#c9929b]">
              {sale.deliveryAddress}
            </p>
          </div>
        )}

        {sale.description && (
          <p class="text-sm font-medium text-slate-800 dark:text-slate-200">
            {sale.description}
          </p>
        )}

        <div class="grid grid-cols-3 gap-2 mt-1">
          <div class="bg-slate-50 dark:bg-black/20 p-2 rounded-lg text-center">
            <p class="text-[10px] text-slate-400 uppercase font-bold">
              Acompte
            </p>
            <p class="text-sm font-bold text-slate-700 dark:text-white">
              {amount(sale.deposit)}
            </p>
            <p class="text-[9px] text-slate-400">
              {sale.depositPaymentMethod}
            </p>
          </div>
          <div class="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg text-center">
            <p class="text-[10px] text-primary uppercase font-bold">
              Reste
            </p>
            <p class="text-sm font-bold text-primary">
              {amount(sale.remaining)}
            </p>
            <p class="text-[9px] text-primary/70">
              {sale.remainingPaymentMethod}
            </p>
          </div>
          <div class="bg-slate-50 dark:bg-black/20 p-2 rounded-lg text-center border border-primary/20">
            <p class="text-[10px] text-slate-400 uppercase font-bold">
              Total
            </p>
            <p class="text-sm font-bold text-slate-700 dark:text-white">
              {amount(sale.amount)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
