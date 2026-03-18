import { HeadContent, Scripts } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";

export const RootDocument = ({ children }: PropsWithChildren) => (
	<html lang="fr">
		<head>
			<HeadContent />
		</head>
		<body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen">
			<Suspense>{children}</Suspense>
			<Scripts />
		</body>
	</html>
);
