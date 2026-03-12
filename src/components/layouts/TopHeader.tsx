import salmaImg from "@assets/images/salma.jpeg";
import type { Component, JSXElement } from "solid-js";

export interface TopHeaderProps {
	title: string;
	action?: JSXElement;
}

export const TopHeader: Component<TopHeaderProps> = ({ title, action }) => (
	<header class="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark">
		<div class="flex items-center p-4 pb-3 justify-between">
			<div class="flex size-10 shrink-0 items-center overflow-hidden rounded-full border-2 border-primary">
				<div class="bg-center bg-no-repeat aspect-square bg-cover size-full">
					<img src={salmaImg} alt="Salma" />
				</div>
			</div>
			<div class="flex flex-col flex-1 px-3">
				<h1 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">{title}</h1>
				<p class="text-xs text-primary font-medium">L'Instant Gourmand</p>
			</div>
			{action && <div class="flex items-center gap-4">{action}</div>}
		</div>
	</header>
);
