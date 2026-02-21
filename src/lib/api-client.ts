import { authClient } from "./auth-client";

const API_URL = import.meta.env["VITE_API_URL"] || "http://localhost:3000";

// ── Cached session token ─────────────────────────────────────────────
let cachedToken: string | null = null;
let tokenExpiresAt = 0;
let pendingSessionPromise: Promise<string | null> | null = null;

const SESSION_TTL_MS = 10 * 60 * 1000; // 10 minutes

async function getSessionToken(): Promise<string | null> {
	const now = Date.now();
	if (cachedToken && now < tokenExpiresAt) {
		return cachedToken;
	}

	// De-duplicate concurrent calls: if a fetch is already in-flight, reuse it
	if (pendingSessionPromise) {
		return pendingSessionPromise;
	}

	pendingSessionPromise = authClient
		.getSession()
		.then((session) => {
			const token = session?.data?.session?.token ?? null;
			cachedToken = token;
			tokenExpiresAt = Date.now() + SESSION_TTL_MS;
			return token;
		})
		.catch(() => {
			cachedToken = null;
			tokenExpiresAt = 0;
			return null;
		})
		.finally(() => {
			pendingSessionPromise = null;
		});

	return pendingSessionPromise;
}

/** Call this after login / logout to force a fresh session fetch. */
export function clearSessionCache() {
	cachedToken = null;
	tokenExpiresAt = 0;
}

// ── API client ───────────────────────────────────────────────────────

interface RequestOptions extends RequestInit {
	params?: Record<string, string>;
	returnFullResponse?: boolean;
}

export async function apiClient<T>(
	endpoint: string,
	{ params, ...options }: RequestOptions = {}
): Promise<T> {
	const token = await getSessionToken();
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...(options.headers as Record<string, string>),
	};

	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
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
		// Clear cached token on auth failure so the next call re-fetches
		if (response.status === 401) {
			clearSessionCache();
		}

		const errorData = (await response.json().catch(() => ({}))) as {
			error?: { code?: string; message?: string };
			message?: string;
		};
		throw new Error(
			errorData.error?.message ||
			errorData.message ||
			errorData.error?.code ||
			"Request failed"
		);
	}

	const result = (await response.json()) as any;

	if (options.returnFullResponse) {
		return result as T;
	}

	// Handle consistent API response structure if applicable (e.g., { data: T })
	return (result.data ?? result) as T;
}
