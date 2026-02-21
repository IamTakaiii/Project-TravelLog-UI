import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import type { TanstackRouter } from "./main";
import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";
// import { ReactDevInspector } from "./components/utils/development-tools/ReactDevInspector";
import { queryClient } from "./lib/query-client";
import { Toaster } from "@/components/ui/sonner";

type AppProps = { router: TanstackRouter };

const App = ({ router }: AppProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<Toaster position="top-center" richColors />
			{/* <ReactDevInspector /> */}
			<TanStackRouterDevelopmentTools
				initialIsOpen={false}
				position="bottom-left"
				router={router}
			/>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
		</QueryClientProvider>
	);
};

export default App;
