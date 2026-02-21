import { authClient } from "./auth-client";

const API_URL = import.meta.env["VITE_API_URL"] || "http://localhost:3000";

interface RequestOptions extends RequestInit {
	params?: Record<string, string>;
	returnFullResponse?: boolean;
}

export async function apiClient<T>(
	endpoint: string,
	{ params, ...options }: RequestOptions = {}
): Promise<T> {
	const session = await authClient.getSession();
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...(options.headers as Record<string, string>),
	};

	if (session?.data?.session?.token) {
		headers["Authorization"] = `Bearer ${session.data.session.token}`;
	}

	let url = `${API_URL}${endpoint}`;
	if (params) {
		const searchParams = new URLSearchParams(params);
		url += `?${searchParams.toString()}`;
	}

	const response = await fetch(url, {
		...options,
		headers,
		credentials: "include",
	});

	if (!response.ok) {
		const errorData = (await response.json().catch(() => ({}))) as {
			error?: { code?: string };
			message?: string;
		};
		throw new Error(
			errorData.error?.code || errorData.message || "Request failed"
		);
	}

	const result = (await response.json()) as any;

	if (options.returnFullResponse) {
		return result as T;
	}

	// Handle consistent API response structure if applicable (e.g., { data: T })
	return (result.data ?? result) as T;
}

