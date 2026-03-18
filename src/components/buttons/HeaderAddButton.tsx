import { Link, type LinkProps } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const HeaderAddButton = ({ to }: Pick<LinkProps, "to">) => (
	<Link
		to={to}
		className="flex items-center justify-center rounded-full size-10 bg-primary text-white shadow-lg shadow-primary/20"
	>
		<Plus />
	</Link>
);
