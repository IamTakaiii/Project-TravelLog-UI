import { authClient } from "@/lib/auth-client";
import type { CreateTripFormValues } from "../schemas/create-trip-schema";

const API_URL =
	import.meta.env["VITE_API_URL"] || "http://localhost:3000/api/v1";

export interface TripUser {
	id: string;
	name: string;
	email: string;
	image?: string | null;
}

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
	updatedBy: TripUser | null;
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

async function request<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const headers = await getAuthHeaders();

	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers: {
			...headers,
			...options.headers,
		},
		credentials: "include",
	});

	if (!response.ok) {
		const errorData = (await response.json().catch(() => ({}))) as {
			error?: { code?: string };
			message?: string;
		};
		throw new Error(
			errorData.error?.code ||
				errorData.message ||
				"trips.errors.request_failed"
		);
	}

	const result = (await response.json()) as ApiResponse<T>;
	return result.data;
}

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

		return request<Trip>("/api/v1/trips", {
			method: "POST",
			body: JSON.stringify(payload),
		});
	},

	async getAll(): Promise<Trip[]> {
		return request<Trip[]>("/api/v1/trips", {
			method: "GET",
		});
	},

	async getById(id: string): Promise<Trip> {
		return request<Trip>(`/api/v1/trips/${id}`, {
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

		return request<Trip>(`/api/v1/trips/${id}`, {
			method: "PATCH",
			body: JSON.stringify(payload),
		});
	},

	async delete(id: string): Promise<void> {
		await request<void>(`/api/v1/trips/${id}`, {
			method: "DELETE",
		});
	},
};
