import { authClient } from "@/lib/auth-client";
import { Fund, CreateFundInput, UpdateFundInput } from "../types";

const API_URL =
    import.meta.env["VITE_API_URL"] || "http://localhost:3000/api/v1";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
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
            "funds.errors.request_failed"
        );
    }

    const result = (await response.json()) as ApiResponse<T>;
    return result.data;
}

export const fundsApi = {
    async getByTripId(tripId: string): Promise<Fund[]> {
        return request<Fund[]>(`/api/v1/funds/trip/${tripId}`);
    },

    async getById(id: string): Promise<Fund> {
        return request<Fund>(`/api/v1/funds/${id}`);
    },

    async create(data: CreateFundInput): Promise<Fund> {
        return request<Fund>("/api/v1/funds", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    async update(id: string, data: UpdateFundInput): Promise<Fund> {
        return request<Fund>(`/api/v1/funds/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    async delete(id: string): Promise<void> {
        return request<void>(`/api/v1/funds/${id}`, {
            method: "DELETE",
        });
    },
};
