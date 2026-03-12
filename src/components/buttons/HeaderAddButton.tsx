import type { LinkProps } from "@tanstack/solid-router";
import { Link } from "@tanstack/solid-router";
import { Plus } from "lucide-solid";
import type { Component } from "solid-js";

export const HeaderAddButton: Component<Pick<LinkProps, "to">> = ({ to }) => (
	<Link
		to={to}
		class="flex items-center justify-center rounded-full size-10 bg-primary text-white shadow-lg shadow-primary/20"
	>
		<Plus />
	</Link>
);
