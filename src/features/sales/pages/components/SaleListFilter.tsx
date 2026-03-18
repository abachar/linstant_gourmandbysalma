import { Link } from "@tanstack/react-router";

const FilterLink = ({ label, value, active }: { label: string; value: string; active: boolean }) => (
	<Link
		to="/sales"
		search={{ filter: value }}
		className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 ${active ? "bg-primary shadow-l shadow-primary/20" : "bg-slate-200 dark:bg-surface-dark"}`}
	>
		<p className={`text-sm font-medium whitespace-nowrap ${active ? "text-white" : "text-slate-700 dark:text-white"}`}>
			{label}
		</p>
	</Link>
);

export const SaleListFilter = ({ selectedFilter }: { selectedFilter: string | undefined }) => {
	return (
		<div className="flex gap-2 py-3 overflow-x-auto hide-scrollbar">
			<FilterLink label="À venir" value="upcoming" active={selectedFilter === "upcoming"} />
			<FilterLink label="Ce mois" value="month" active={selectedFilter === "month"} />
			<FilterLink label="Passées" value="past" active={selectedFilter === "past"} />
			<FilterLink label="Tout" value="all" active={selectedFilter === "all"} />
		</div>
	);
};
