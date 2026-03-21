import { DAYS_OF_WEEK } from "@common/format";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FindDashboardReturn } from "../../api.functions";

type CalendarProps = FindDashboardReturn & {
	onSelectDate: (date: string) => void;
};

function getTodayAndWeekRange() {
	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, "0");
	const dd = String(today.getDate()).padStart(2, "0");
	const todayStr = `${yyyy}-${mm}-${dd}`;

	// Week starts on Monday (ISO week)
	const dow = today.getDay(); // 0=Sun
	const diffToMonday = (dow + 6) % 7;
	const monday = new Date(today);
	monday.setDate(today.getDate() - diffToMonday);
	const sunday = new Date(monday);
	sunday.setDate(monday.getDate() + 6);

	const weekStart = monday.toISOString().slice(0, 10);
	const weekEnd = sunday.toISOString().slice(0, 10);

	return { todayStr, weekStart, weekEnd };
}

export const Calendar = ({ onSelectDate, ...props }: CalendarProps) => {
	const { todayStr, weekStart, weekEnd } = getTodayAndWeekRange();

	return (
		<div className="bg-white/5 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/10">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-slate-900 dark:text-white font-bold text-lg">Planning des commandes</h3>
				<div className="flex gap-2">
					<Link
						to="/"
						search={{ month: props.prevMonth }}
						className="size-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white"
					>
						<ChevronLeft />
					</Link>
					<Link
						to="/"
						search={{ month: props.nextMonth }}
						className="size-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white"
					>
						<ChevronRight />
					</Link>
				</div>
			</div>
			<div className="mb-4">
				<p className="text-primary text-sm font-semibold">{props.calendarTitle}</p>
			</div>

			<div className="grid grid-cols-7 gap-y-2">
				{DAYS_OF_WEEK.map((d) => (
					<p key={d} className="text-slate-400 dark:text-white/40 text-[11px] font-bold text-center">
						{d}
					</p>
				))}

				{props.monthSales.map(({ date, day, count, inCurrentMonth }) => {
					const isToday = date === todayStr;
					const isCurrentWeek = date >= weekStart && date <= weekEnd;

					return (
						<button
							key={date}
							type="button"
							onClick={() => onSelectDate(date)}
							className={clsx("h-10 w-full text-sm flex flex-col items-center justify-center relative rounded-lg", {
								// Current week: subtle background
								"bg-primary/8 dark:bg-primary/15": isCurrentWeek && !isToday,
								// Today: bold ring + primary background
								"bg-primary text-white! rounded-lg": isToday,
								// Normal text colors (not today)
								"text-slate-300 dark:text-white/15": !inCurrentMonth && !isToday,
								"text-slate-900 dark:text-white": inCurrentMonth && count > 0 && !isToday,
								"text-slate-500 dark:text-white/60": inCurrentMonth && count === 0 && !isToday,
							})}
						>
							{day}
							<span className="flex gap-0.5 absolute bottom-1">
								{Array.from({ length: count }, (_, i) => i).map((i) => (
									<span key={i} className={clsx("size-1 rounded-full", isToday ? "bg-white/70" : "bg-primary")} />
								))}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};
