import { apiClient } from "@/lib/api-client";
import type { CreateTripFormValues } from "../schemas/create-trip-schema";
export { type Trip, type CreateTripPayload } from "../types";
import { Trip, CreateTripPayload } from "../types";

export const tripsApi = {
	async create(data: CreateTripFormValues): Promise<Trip> {
		const payload: CreateTripPayload = {
			title: data.title,
			startDate: new Date(data.startDate).toISOString(),
			endDate: new Date(data.endDate).toISOString(),
		};

		if (data.description) payload.description = data.description;
		if (data.coverImage) payload.coverImage = data.coverImage;
		if (data.destination) payload.destination = data.destination;
		if (data.destinationType) payload.destinationType = data.destinationType;
		if (data.currency) payload.currency = data.currency;
		if (data.budget) payload.budget = data.budget;

		return apiClient<Trip>("/api/v1/trips", {
			method: "POST",
			body: JSON.stringify(payload),
		});
	},

	async getAll(): Promise<Trip[]> {
		return apiClient<Trip[]>("/api/v1/trips", {
			method: "GET",
		});
	},

	async getById(id: string): Promise<Trip> {
		return apiClient<Trip>(`/api/v1/trips/${id}`, {
			method: "GET",
		});
	},

	async update(id: string, data: Partial<CreateTripFormValues>): Promise<Trip> {
		const payload: Partial<CreateTripPayload> = {
			...data,
			startDate: data.startDate
				? new Date(data.startDate).toISOString()
				: undefined,
			endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
		};

		return apiClient<Trip>(`/api/v1/trips/${id}`, {
			method: "PATCH",
			body: JSON.stringify(payload),
		});
	},

	async delete(id: string): Promise<void> {
		return apiClient<void>(`/api/v1/trips/${id}`, {
			method: "DELETE",
		});
	},
};
