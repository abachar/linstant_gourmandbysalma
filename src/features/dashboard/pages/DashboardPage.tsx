import { PageLayout } from "@components/layouts";
import { type Component, createSignal, Show } from "solid-js";
import type { GetDashboardReturn } from "../api.functions";
import { Calendar, DaySalesDialog, Statistics } from "./components";

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
