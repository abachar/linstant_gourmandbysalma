import { GetTaxReportingReturn } from "../../api.functions";
import { Link } from "@tanstack/solid-router";
import { Component } from "solid-js";

export const FilterLink: Component<{ year: number, active: boolean }> = ({ year, active }) => (
  <Link to="/taxes" search={{ year: year }}
    class={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 ${active ? "bg-primary shadow-l shadow-primary/20" : "bg-slate-200 dark:bg-surface-dark"}`}>
    <p class="text-sm font-medium whitespace-nowrap"
      classList={{
        "text-white": active,
        "text-slate-700 dark:text-white": !active
      }}>
      {year}
    </p>
  </Link>
)

export const TaxReportingFilter: Component<GetTaxReportingReturn> = ({ availableYears, selectedYear }) => {
  return (
    <div class="flex gap-2 py-3 overflow-x-auto hide-scrollbar">
      {availableYears.map((year) => (
        <FilterLink year={year} active={selectedYear === year} />
      ))}
    </div>
  );
};
