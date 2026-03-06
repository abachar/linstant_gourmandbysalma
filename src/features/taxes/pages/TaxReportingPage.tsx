import { PageLayout } from "@components/layouts";
import type {  Component } from "solid-js";
import type { GetTaxReportingReturn } from "../api.functions";
import { TaxReportingFilter, TaxReportingTable } from "./components";

export const TaxReportingPage: Component<GetTaxReportingReturn> = ({selectedYear, availableYears, ...props}) => (
  <PageLayout title="Taxes">
    <TaxReportingFilter availableYears={availableYears} selectedYear={selectedYear} />
    <TaxReportingTable {...props} />
  </PageLayout>
)
