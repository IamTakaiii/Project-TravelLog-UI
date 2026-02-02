import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/trips")({
  component: Trips,
});

function Trips() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Trips</h1>
      <p>List of your planned and past trips.</p>
    </div>
  );
}
