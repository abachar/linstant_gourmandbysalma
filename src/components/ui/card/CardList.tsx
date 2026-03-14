import type { JSXElement } from "solid-js";
import { CardRow } from "./CardRow";

type CardListProps<T> = {
	rows: T[];
	onCardClick?: (row: T) => void;
	onEditClick?: (row: T) => void;
	onDeleteClick?: (row: T) => void;
	canEdit?: (row: T) => boolean;
	canDelete?: (row: T) => boolean;
	children: (row: T) => JSXElement;
};

export const CardList = <T,>({ rows, ...props }: CardListProps<T>) => (
	<div class="space-y-5">
		{rows.map((row) => (
			<CardRow row={row} {...props} />
		))}
	</div>
);
