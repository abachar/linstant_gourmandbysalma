import { Link } from "@tanstack/solid-router";
import { Component } from "solid-js";

type EmptyStateProps = {
  emptyIcon: string;
  emptyLabel: string;
  actionUrl?: string;
  actionLabel?: string;
};

export const EmptyState: Component<EmptyStateProps> = ({ emptyIcon, emptyLabel, actionUrl, actionLabel }) => {
  return (
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
        <span class="material-symbols-outlined text-3xl">{emptyIcon}</span>
      </div>
      <p class="text-slate-500 dark:text-[#c9929b] text-sm mb-4">
        {emptyLabel}
      </p>
      {actionUrl && (
        <Link
          to={actionUrl}
          class="h-12 px-6 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-primary/20"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
