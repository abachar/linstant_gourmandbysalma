import salmaImg from "@assets/images/salma.jpeg";
import { HeaderAddButton, HeaderCancelButton } from "@components/buttons";
import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

export interface TopHeaderProps {
	title: string;
	addUrl?: LinkProps["to"];
	withCancel?: boolean;
	moreActions?: ReactNode;
}

export const TopHeader = ({ title, addUrl, withCancel, moreActions }: TopHeaderProps) => (
	<header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark">
		<div className="flex items-center p-4 pb-3 justify-between">
			<div className="flex size-10 shrink-0 items-center overflow-hidden rounded-full border-2 border-primary">
				<div className="bg-center bg-no-repeat aspect-square bg-cover size-full">
					<img src={salmaImg} alt="Salma" />
				</div>
			</div>
			<div className="flex flex-col flex-1 px-3">
				<h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">{title}</h1>
				<p className="text-xs text-primary font-medium">L'Instant Gourmand</p>
			</div>
			<div className="flex items-center gap-4">
				{moreActions}
				{addUrl && <HeaderAddButton to={addUrl} />}
				{withCancel && <HeaderCancelButton />}
			</div>
		</div>
	</header>
);
