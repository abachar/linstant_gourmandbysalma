import { PageLayout } from "@components/layouts";
import { CardList, EmptyState } from "@components/ui";
import { ChartPie } from "lucide-solid";
import type { Component } from "solid-js";
import type { FindTaxReportingReturn } from "../api.functions";
import { TaxReportingCardContent, TaxReportingFilter } from "./components";

export const TaxReportingPage: Component<FindTaxReportingReturn> = (props) => (
	<PageLayout title="Taxes">
		<TaxReportingFilter {...props} />
		{props.monthlyItems.length === 0 ? (
			<EmptyState emptyIcon={<ChartPie />} emptyLabel="Aucune donnée de taxes disponible" />
		) : (
			<CardList rows={props.monthlyItems}>{(it) => <TaxReportingCardContent monthlyItem={it} />}</CardList>
		)}
	</PageLayout>
);
