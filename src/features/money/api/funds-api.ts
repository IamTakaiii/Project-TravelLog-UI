import { apiClient } from "@/lib/api-client";
import { Fund, CreateFundInput, UpdateFundInput } from "../types";

export interface FundSummary {
    totalDeposited: number;
    totalSpent: number;
    remaining: number;
    usagePercent: number;
    fundsCount: number;
    fundDetails: {
        id: string;
        title: string;
        currency: string;
        deposited: number;
        spent: number;
        remaining: number;
    }[];
}

export const fundsApi = {
    async getByTripId(tripId: string): Promise<Fund[]> {
        return apiClient<Fund[]>(`/api/v1/funds/trip/${tripId}`);
    },

    async getSummary(tripId: string): Promise<FundSummary> {
        return apiClient<FundSummary>(`/api/v1/funds/trip/${tripId}/summary`);
    },

    async getById(id: string): Promise<Fund> {
        return apiClient<Fund>(`/api/v1/funds/${id}`);
    },

    async create(data: CreateFundInput): Promise<Fund> {
        return apiClient<Fund>("/api/v1/funds", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    async update(id: string, data: UpdateFundInput): Promise<Fund> {
        return apiClient<Fund>(`/api/v1/funds/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    async delete(id: string): Promise<void> {
        return apiClient<void>(`/api/v1/funds/${id}`, {
            method: "DELETE",
        });
    },
};

