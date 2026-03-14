import { Pencil, Trash2 } from "lucide-solid";
import type { JSXElement } from "solid-js";

type CardRowProps<T> = {
	row: T;
	onCardClick?: (row: T) => void;
	onEditClick?: (row: T) => void;
	onDeleteClick?: (row: T) => void;
	canEdit?: (row: T) => boolean;
	canDelete?: (row: T) => boolean;
	children: (row: T) => JSXElement;
};

export const CardRow = <T,>(props: CardRowProps<T>) => (
	<div class="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden flex flex-col">
		<button type="button" onClick={() => props.onCardClick?.(props.row)}>
			<div class="p-3">{props.children(props.row)}</div>
		</button>

		<div class="flex border-t border-slate-100 dark:border-white/5">
			{props.onEditClick && (!props.canEdit || props.canEdit(props.row)) && (
				<button
					type="button"
					onClick={() => props.onEditClick?.(props.row)}
					class="flex-1 h-10 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
				>
					<Pencil size={18} />
					Modifier
				</button>
			)}
			{props.onDeleteClick && (!props.canDelete || props.canDelete(props.row)) && (
				<button
					type="button"
					onClick={() => props.onDeleteClick?.(props.row)}
					class="flex-1 border-l border-slate-100 dark:border-white/5 h-10 flex items-center justify-center gap-2 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
				>
					<Trash2 size={18} />
					Supprimer
				</button>
			)}
		</div>
	</div>
);
