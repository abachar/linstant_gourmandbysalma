import { Link, useRouterState } from "@tanstack/solid-router";
import type { Component } from "solid-js";

// style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
//
const NavigationLink: Component<{
	href: string;
	label: string;
	icon: string;
}> = ({ href, label, icon }) => {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	const isActive = href === "/" ? pathname() === "/" : pathname().startsWith(href);

	return (
		<Link
			to={href}
			class={`flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-slate-400 dark:text-[#c9929b]"}`}
		>
			<span class="material-symbols-outlined text-[24px]">{icon}</span>
			<span class="text-[10px] font-bold">{label}</span>
		</Link>
	);
};

export const BottomNavigation: Component = () => (
	<nav class="fixed bottom-0 left-0 right-0 ios-tab-bar bg-white/90 dark:bg-background-dark/90 border-t border-slate-200 dark:border-white/5 pb-6 pt-2 z-50">
		<div class="flex justify-between items-center max-w-md mx-auto px-6">
			<NavigationLink href="/" label="Dashboard" icon="dashboard" />
			<NavigationLink href="/sales" label="Ventes" icon="shopping_bag" />
			<NavigationLink href="/purchases" label="Achats" icon="receipt_long" />
			<NavigationLink href="/products" label="Stock" icon="inventory_2" />
			<NavigationLink href="/taxes" label="Taxes" icon="account_balance_wallet" />
		</div>
	</nav>
);
