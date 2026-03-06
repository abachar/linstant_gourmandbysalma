import { PageLayout } from "@components/layouts";
import { createSignal, Show, type Component } from "solid-js";
import { Calendar, Statistics, DaySalesDialog } from "./components";
import { GetDashboardReturn } from "../api.functions";

export const DashboardPage: Component<GetDashboardReturn> = (props) => {
	const [selectedDate, setSelectedDate] = createSignal<string>("");

	return (
		<PageLayout title="Bienvenue, Salma !">
			<div class="space-y-5">
				<Calendar {...props} onSelectDate={setSelectedDate} />
				<Statistics {...props} />
			</div>
			<Show when={selectedDate()}>
				<DaySalesDialog date={selectedDate()} onClose={() => setSelectedDate("")} />
			</Show>
		</PageLayout>
	);
};
