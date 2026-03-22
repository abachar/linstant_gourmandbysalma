import clsx from "clsx";
import { useState } from "react";
import type { FindDashboardReturn } from "../../../api.functions";
import { DaySalesDialog } from "../DaySalesDialog";

export const CalendarDay = (props: FindDashboardReturn["monthSales"][0]) => {
	const [openDetails, setOpenDetails] = useState<boolean>(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setOpenDetails(props.saleCount > 0)}
				className={clsx("h-10 w-full text-sm flex flex-col items-center justify-center relative rounded-lg", {
					"bg-primary/80 text-white shadow-md": props.isToday,
					"font-medium": props.saleCount > 0,
					"opacity-15": !props.inSelectedMonth,
					"text-slate-900 dark:text-white": props.inSelectedMonth && !props.isToday && props.saleCount > 0,
					"text-slate-500 dark:text-white/60": props.inSelectedMonth && !props.isToday && props.saleCount === 0,
				})}
			>
				<span>{props.day}</span>
				<div className="flex gap-0.5 absolute bottom-1">
					{Array.from({ length: props.saleCount }).map((_, i) => (
						<span key={i} className={clsx("size-1 rounded-full", props.isToday ? "bg-white/80" : "bg-primary")} />
					))}
				</div>
			</button>
			{openDetails && <DaySalesDialog date={props.date} onClose={() => setOpenDetails(false)} />}
		</>
	);
};
