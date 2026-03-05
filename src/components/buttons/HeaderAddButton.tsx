import type { Component } from "solid-js";
import { Link } from "@tanstack/solid-router";
import type { LinkProps } from "@tanstack/solid-router";

type HeaderAddButtonProps = Pick<LinkProps, "to">;

export const HeaderAddButton: Component<HeaderAddButtonProps> = (props) => (
  <Link
    to={props.to}
    class="flex items-center justify-center rounded-full size-10 bg-primary text-white shadow-lg shadow-primary/20"
  >
    <span class="material-symbols-outlined">add</span>
  </Link>
);
