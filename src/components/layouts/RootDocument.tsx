import { HeadContent, Scripts } from "@tanstack/solid-router";
import { type ParentComponent, Suspense } from "solid-js";
import { HydrationScript } from "solid-js/web";

export const RootDocument: ParentComponent = ({ children }) => (
	<html lang="fr">
		<head>
			<HydrationScript />
		</head>
		<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24">
			<HeadContent />
			<Suspense>{children}</Suspense>
			<Scripts />
		</body>
	</html>
);
