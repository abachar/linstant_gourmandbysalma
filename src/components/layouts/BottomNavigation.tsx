import { Link, useRouterState } from "@tanstack/solid-router";
import { ChartPie, LayoutDashboard, Refrigerator, ShoppingBag, ShoppingBasket } from "lucide-solid";
import type { Component, JSXElement } from "solid-js";

const NavigationLink: Component<{
	href: string;
	label: string;
	icon: JSXElement;
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
			{icon}
			<span class="text-[10px] font-bold">{label}</span>
		</Link>
	);
};

export const BottomNavigation: Component = () => (
	<nav class="fixed bottom-0 left-0 right-0 ios-tab-bar bg-white/90 dark:bg-background-dark/90 border-t border-slate-200 dark:border-white/5 pb-6 pt-2 z-50">
		<div class="flex justify-between items-center max-w-md mx-auto px-6">
			<NavigationLink href="/" label="Dashboard" icon={<LayoutDashboard />} />
			<NavigationLink href="/sales" label="Ventes" icon={<ShoppingBag />} />
			<NavigationLink href="/purchases" label="Achats" icon={<ShoppingBasket />} />
			<NavigationLink href="/products" label="Stock" icon={<Refrigerator />} />
			<NavigationLink href="/taxes" label="Taxes" icon={<ChartPie />} />
		</div>
	</nav>
);
