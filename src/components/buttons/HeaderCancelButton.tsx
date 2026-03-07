import type { Component } from "solid-js";
import { useRouter } from "@tanstack/solid-router";

export const HeaderCancelButton: Component = () => {
  const { history } = useRouter();

  return (
    <button
      type="button"
      onClick={() => history.back()}
      class="text-slate-500 dark:text-[#c9929b] text-sm font-medium hover:opacity-80 transition-opacity"
    >
      Annuler
    </button>
  );
}
