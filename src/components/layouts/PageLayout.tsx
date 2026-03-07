import type { ParentComponent } from "solid-js";
import { BottomNavigation } from "./BottomNavigation";
import { TopHeader, type TopHeaderProps } from "./TopHeader";

export const PageLayout: ParentComponent<TopHeaderProps> = ({ children, ...props }) => (
	<>
		<TopHeader {...props} />

		<main class="px-4 py-4 pb-28">{children}</main>

		<BottomNavigation />
	</>
);
