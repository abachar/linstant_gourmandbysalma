import { Link } from "@tanstack/react-router";
import type { FindTaxReportingReturn } from "../../api.functions";

export const FilterLink = ({ year, active }: { year: number; active: boolean }) => (
	<Link
		to="/taxes"
		search={{ year: year }}
		className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 ${active ? "bg-primary shadow-l shadow-primary/20" : "bg-slate-200 dark:bg-surface-dark"}`}
	>
		<p className={`text-sm font-medium whitespace-nowrap ${active ? "text-white" : "text-slate-700 dark:text-white"}`}>
			{year}
		</p>
	</Link>
);

export const TaxReportingFilter = ({ availableYears, selectedYear }: FindTaxReportingReturn) => {
	return (
		<div className="flex gap-2 py-3 overflow-x-auto hide-scrollbar">
			{availableYears.map((year) => (
				<FilterLink key={year} year={year} active={selectedYear === year} />
			))}
		</div>
	);
};
