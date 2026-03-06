import { Outlet } from "@tanstack/solid-router";
import type { Component } from "solid-js";
import { RootDocument } from "./RootDocument";

export const RootComponent: Component = () => (
  <RootDocument>
    <Outlet />
  </RootDocument>
);
