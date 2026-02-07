import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Error500 } from "@/pages/error-500";
import type { QueryClient } from "@tanstack/react-query";

interface RouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: Outlet,
	errorComponent: Error500,
});
