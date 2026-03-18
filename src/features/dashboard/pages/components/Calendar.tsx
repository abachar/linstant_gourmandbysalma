import { DAYS_OF_WEEK } from "@common/format";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FindDashboardReturn } from "../../api.functions";

type CalendarProps = FindDashboardReturn & {
	onSelectDate: (date: string) => void;
};

export const Calendar = ({ onSelectDate, ...props }: CalendarProps) => (
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

			{props.monthSales.map(({ date, day, count, inCurrentMonth }) => (
				<button
					key={date}
					type="button"
					onClick={() => onSelectDate(date)}
					className={`h-10 w-full text-sm flex flex-col items-center justify-center relative ${
						!inCurrentMonth
							? "text-slate-300 dark:text-white/15"
							: count > 0
								? "text-slate-900 dark:text-white"
								: "text-slate-500 dark:text-white/60"
					}`}
				>
					{day}
					<span className="flex gap-0.5 absolute bottom-1">
						{Array.from({ length: count }, (_, i) => i).map((i) => (
							<span key={i} className="size-1 rounded-full bg-primary" />
						))}
					</span>
				</button>
			))}
		</div>
	</div>
);
