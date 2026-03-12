import type { JSXElement } from "solid-js";

type CardRowProps<T> = {
	row: T;
	onCardClick?: (row: T) => void;
	onEditClick?: (row: T) => void;
	onDeleteClick?: (row: T) => void;
	children: (row: T) => JSXElement;
};

export const CardRow = <T,>(props: CardRowProps<T>) => (
	<div class="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden flex flex-col">
		<button
			type="button"
			onClick={() => props.onCardClick?.(props.row)}
			class="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm block w-full"
		>
			<div class="p-3">{props.children(props.row)}</div>
		</button>

		<div class="flex border-t border-slate-100 dark:border-white/5">
			{props.onEditClick && (
				<button
					type="button"
					onClick={() => props.onEditClick(props.row)}
					class="flex-1 h-10 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
				>
					<span class="material-symbols-outlined text-lg">edit</span>
					Modifier
				</button>
			)}
			{props.onDeleteClick && (
				<button
					type="button"
					onClick={() => props.onDeleteClick(props.row)}
					class="flex-1 border-l border-slate-100 dark:border-white/5 h-10 flex items-center justify-center gap-2 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
				>
					<span class="material-symbols-outlined text-lg">delete</span>
					Supprimer
				</button>
			)}
		</div>
	</div>
);
