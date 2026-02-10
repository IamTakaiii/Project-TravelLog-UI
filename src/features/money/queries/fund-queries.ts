import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { fundsApi } from "../api/funds-api";
import { CreateFundInput, UpdateFundInput } from "../types";

export const fundsQueryKeys = {
    all: ["funds"] as const,
    lists: () => [...fundsQueryKeys.all, "list"] as const,
    list: (tripId: string) => [...fundsQueryKeys.lists(), tripId] as const,
    details: () => [...fundsQueryKeys.all, "detail"] as const,
    detail: (id: string) => [...fundsQueryKeys.details(), id] as const,
};

export const fundsQueryOptions = (tripId: string) =>
    queryOptions({
        queryKey: fundsQueryKeys.list(tripId),
        queryFn: () => fundsApi.getByTripId(tripId),
        enabled: !!tripId,
    });

export const useFundMutations = (tripId: string) => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (data: CreateFundInput) => fundsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: fundsQueryKeys.list(tripId) });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateFundInput }) =>
            fundsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: fundsQueryKeys.list(tripId) });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => fundsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: fundsQueryKeys.list(tripId) });
        },
    });

    return {
        createMutation,
        updateMutation,
        deleteMutation,
    };
};
