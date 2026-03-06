import { Component } from "solid-js";
import { GetTaxReportingReturn } from "../../api.functions";
import { amount } from "@common/format";

type MonthlyItem = GetTaxReportingReturn['monthlyItems'][0];

export const TaxReportingTableRow: Component<{ monthlyItem: MonthlyItem }> = ({monthlyItem}) => {
  return (
    <div class="flex items-center gap-4 px-4 min-h-18 py-3 justify-between bg-white dark:bg-[#482329]/30 rounded-xl border border-slate-200 dark:border-none active:bg-slate-50 dark:active:bg-white/5 transition-colors">
        <div class="flex flex-col justify-center">
            <p class="text-slate-900 dark:text-white text-base font-bold leading-tight">{monthlyItem.monthLabel}</p>
        </div>
        <div class="flex items-center gap-2">
            <p class="text-slate-900 dark:text-white text-base font-bold tabular-nums">{ amount(monthlyItem.totalToDeclare)}</p>
        </div>
    </div>
  );
};
