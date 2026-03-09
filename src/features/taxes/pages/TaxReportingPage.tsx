import { PageLayout } from "@components/layouts";
import type { Component } from "solid-js";
import type { FindTaxReportingReturn } from "../api.functions";
import { TaxReportingFilter, TaxReportingTable } from "./components";

export const TaxReportingPage: Component<FindTaxReportingReturn> = ({ props }) => (
	<PageLayout title="Taxes">
		<TaxReportingFilter {...props} />
		<TaxReportingTable {...props} />
	</PageLayout>
);
