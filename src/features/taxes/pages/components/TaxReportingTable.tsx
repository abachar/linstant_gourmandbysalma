import { EmptyState } from "@components/ui";
import type { Component } from "solid-js";
import type { FindTaxReportingReturn } from "../../api.functions";
import { TaxReportingTableRow } from "./TaxReportingTableRow";

export const TaxReportingTable: Component<FindTaxReportingReturn> = ({ monthlyItems }) => {
	return monthlyItems.length === 0 ? (
		<EmptyState emptyIcon="bar_chart" emptyLabel="Aucune donnée de taxes disponible" />
	) : (
		<div class="space-y-5">
			{monthlyItems.map((it) => (
				<TaxReportingTableRow monthlyItem={it} />
			))}
		</div>
	);
};
