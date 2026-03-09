import { DAYS_OF_WEEK } from "@common/format";
import { Link } from "@tanstack/solid-router";
import type { Component } from "solid-js";
import type { FindDashboardReturn } from "../../api.functions";

type CalendarProps = FindDashboardReturn & {
	onSelectDate: (date: string) => void;
};

export const Calendar: Component<CalendarProps> = ({ onSelectDate, ...props }) => (
	<div class="bg-white/5 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
		<div class="flex items-center justify-between mb-4">
			<h3 class="text-slate-900 dark:text-white font-bold text-lg">Planning des commandes</h3>
			<div class="flex gap-2">
				<Link
					to="/"
					search={{ month: props.prevMonth }}
					class="size-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white"
				>
					<span class="material-symbols-outlined">chevron_left</span>
				</Link>
				<Link
					to="/"
					search={{ month: props.nextMonth }}
					class="size-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white"
				>
					<span class="material-symbols-outlined">chevron_right</span>
				</Link>
			</div>
		</div>
		<div class="mb-4">
			<p class="text-primary text-sm font-semibold">{props.calendarTitle}</p>
		</div>

		<div class="grid grid-cols-7 gap-y-2">
			{DAYS_OF_WEEK.map((d) => (
				<p class="text-slate-400 dark:text-white/40 text-[11px] font-bold text-center">{d}</p>
			))}

			{props.monthSales.map(({ date, day, count, inCurrentMonth }) => (
				<button
					type="button"
					onClick={() => onSelectDate(date)}
					class="h-10 w-full text-sm flex flex-col items-center justify-center relative"
					classList={{
						"text-slate-900 dark:text-white": inCurrentMonth && count > 0,
						"text-slate-500 dark:text-white/60": inCurrentMonth && count === 0,
						"text-slate-300 dark:text-white/15": !inCurrentMonth,
					}}
				>
					{day}
					<span class="flex gap-0.5 absolute bottom-1">
						{Array.from({ length: count }, (_, i) => i).map(() => (
							<span class="size-1 rounded-full bg-primary" />
						))}
					</span>
				</button>
			))}
		</div>
	</div>
);
