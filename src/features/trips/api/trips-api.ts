import { authClient } from "@/lib/auth-client";
import type { CreateTripFormValues } from "../schemas/create-trip-schema";

const API_URL =
	import.meta.env["VITE_API_URL"] || "http://localhost:3000/api/v1";

export interface Trip {
	id: string;
	title: string;
	description: string | null;
	coverImage: string | null;
	destination: string | null;
	destinationType?: string;
	currency?: string;
	budget: string | null;
	startDate: string;
	endDate: string;
	status: "active" | "inactive" | "completed";
	createdBy: string;
	updatedBy: string;
	createdAt: string;
	updatedAt: string;
}

export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export interface CreateTripPayload {
	title: string;
	description?: string;
	coverImage?: string;
	destination?: string;
	destinationType?: string;
	currency?: string;
	budget?: string;
	startDate: string;
	endDate: string;
}

async function getAuthHeaders(): Promise<HeadersInit> {
	const session = await authClient.getSession();
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	if (session?.data?.session?.token) {
		headers["Authorization"] = `Bearer ${session.data.session.token}`;
	}

	return headers;
}

export const tripsApi = {
	async create(data: CreateTripFormValues): Promise<Trip> {
		const headers = await getAuthHeaders();

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

		const response = await fetch(`${API_URL}/api/v1/trips`, {
			method: "POST",
			headers,
			credentials: "include",
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const errorData = (await response.json().catch(() => ({}))) as {
				error?: { code?: string };
				message?: string;
			};
			throw new Error(
				errorData.error?.code ||
				errorData.message ||
				"trips.errors.create_failed"
			);
		}

		const result = (await response.json()) as ApiResponse<Trip>;
		return result.data;
	},

	async getAll(): Promise<Trip[]> {
		const headers = await getAuthHeaders();

		const response = await fetch(`${API_URL}/api/v1/trips`, {
			method: "GET",
			headers,
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("trips.errors.fetch_failed");
		}

		const result = (await response.json()) as ApiResponse<Trip[]>;
		return result.data;
	},

	async getById(id: string): Promise<Trip> {
		const headers = await getAuthHeaders();

		const response = await fetch(`${API_URL}/api/v1/trips/${id}`, {
			method: "GET",
			headers,
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("trips.errors.fetch_failed");
		}

		const result = (await response.json()) as ApiResponse<Trip>;
		return result.data;
	},

	async update(id: string, data: Partial<CreateTripFormValues>): Promise<Trip> {
		const headers = await getAuthHeaders();

		const payload: Partial<CreateTripPayload> = {
			...data,
			startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
			endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
		};

		const response = await fetch(`${API_URL}/api/v1/trips/${id}`, {
			method: "PATCH",
			headers,
			credentials: "include",
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const errorData = (await response.json().catch(() => ({}))) as {
				error?: { code?: string };
				message?: string;
			};
			throw new Error(
				errorData.error?.code ||
				errorData.message ||
				"trips.errors.update_failed"
			);
		}

		const result = (await response.json()) as ApiResponse<Trip>;
		return result.data;
	},

	async delete(id: string): Promise<void> {
		const headers = await getAuthHeaders();

		const response = await fetch(`${API_URL}/api/v1/trips/${id}`, {
			method: "DELETE",
			headers,
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("trips.errors.delete_failed");
		}
	},
};
