import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/invitations")({
	component: Invitations,
});

function Invitations() {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Invitations</h1>
			<p>Check your pending trip invitations.</p>
		</div>
	);
}
