import { PageLayout } from "@components/layouts";
import { useState } from "react";
import type { FindDashboardReturn } from "../api.functions";
import { Calendar, DaySalesDialog, Statistics } from "./components";

export const DashboardPage = (props: FindDashboardReturn) => {
	const [selectedDate, setSelectedDate] = useState<string>("");

	return (
		<PageLayout title="Bienvenue, Salma !">
			<div className="space-y-5">
				<Calendar {...props} onSelectDate={setSelectedDate} />
				<Statistics {...props} />
			</div>
			{selectedDate && <DaySalesDialog date={selectedDate} onClose={() => setSelectedDate("")} />}
		</PageLayout>
	);
};
