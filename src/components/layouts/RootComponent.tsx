import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { RootDocument } from "./RootDocument";

const queryClient = new QueryClient();

export const RootComponent = () => (
	<QueryClientProvider client={queryClient}>
		<RootDocument>
			<Outlet />
		</RootDocument>
	</QueryClientProvider>
);
