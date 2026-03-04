import type { ParentComponent } from "solid-js";
import { TopHeader, type TopHeaderProps } from "./TopHeader";
import { BottomNavigation } from "./BottomNavigation";

export const PageLayout: ParentComponent<TopHeaderProps> = ({
  children,
  ...props
}) => (
  <>
    <TopHeader {...props} />

    <main class="px-4 py-4 pb-28">{children}</main>

    <BottomNavigation />
  </>
);
