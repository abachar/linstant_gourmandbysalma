import { Link } from "@tanstack/solid-router";
import { Component } from "solid-js";

export const FilterLink: Component<{ label: string, value: string, active: boolean }> = ({ label, value, active }) => (
  <Link to="/sales" search={{ filter: value }}
    class={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 ${active ? "bg-primary shadow-l shadow-primary/20" : "bg-slate-200 dark:bg-surface-dark"}`}>
    <p class="text-sm font-medium whitespace-nowrap"
      classList={{
        "text-white": active,
        "text-slate-700 dark:text-white": !active
      }}>
      {label}
    </p>
  </Link>
)

export const SaleListFilter: Component<{ selectedFilter: string | undefined }> = ({ selectedFilter }) => {
  return (
    <div class="flex gap-2 py-3 overflow-x-auto hide-scrollbar">
      <FilterLink label="À venir" value="upcoming" active={selectedFilter === "upcoming"} />
      <FilterLink label="Ce mois" value="month" active={selectedFilter === "month"} />
      <FilterLink label="Passées" value="past" active={selectedFilter === "past"} />
      <FilterLink label="Tout" value="all" active={selectedFilter === "all"} />
    </div>
  );
};
