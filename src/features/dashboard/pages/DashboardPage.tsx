import { PageLayout } from "@components/layouts";
import type { FindDashboardReturn } from "../api.functions";
import { Calendar, Statistics } from "./components";

export const DashboardPage = (props: FindDashboardReturn) => (
	<PageLayout title="Bienvenue, Salma !">
		<div className="space-y-5">
			<Calendar {...props} />
			<Statistics {...props} />
		</div>
	</PageLayout>
);
