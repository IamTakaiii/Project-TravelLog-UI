import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/settings")({
	component: Settings,
});

function Settings() {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Settings</h1>
			<p>Configure application settings.</p>
		</div>
	);
}
