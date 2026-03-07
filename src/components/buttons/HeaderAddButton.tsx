import type { Component } from "solid-js";
import { Link } from "@tanstack/solid-router";
import type { LinkProps } from "@tanstack/solid-router";

export const HeaderAddButton: Component<Pick<LinkProps, "to">> = ({to}) => (
  <Link
    to={to}
    class="flex items-center justify-center rounded-full size-10 bg-primary text-white shadow-lg shadow-primary/20"
  >
    <span class="material-symbols-outlined">add</span>
  </Link>
);
