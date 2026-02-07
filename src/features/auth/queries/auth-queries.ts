import { queryOptions } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const authQueryKeys = {
    session: ["auth", "session"] as const,
};

export const sessionQueryOptions = queryOptions({
    queryKey: authQueryKeys.session,
    queryFn: async () => {
        const { data, error } = await authClient.getSession();
        if (error) throw error;
        return data;
    },
    staleTime: 1000 * 60 * 15, // Cache session for 15 minutes
});
