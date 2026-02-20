import { useState, useEffect } from "react";
import { CurrencyCode } from "../types";
import { apiClient } from "@/lib/api-client";

const CACHE_PREFIX = "exchange_rates_v3_";

interface FrontendCache {
    date: string;        // "YYYY-MM-DD" to match backend valid_date
    baseCurrency: CurrencyCode;
    rates: Partial<Record<CurrencyCode, number>>;
}

function getTodayString() {
    return new Date().toISOString().slice(0, 10);
}

function getCacheKey(baseCurrency: CurrencyCode) {
    return `${CACHE_PREFIX}${baseCurrency}`;
}

function readCache(baseCurrency: CurrencyCode): Partial<Record<CurrencyCode, number>> | null {
    try {
        const raw = localStorage.getItem(getCacheKey(baseCurrency));
        if (!raw) return null;
        const parsed = JSON.parse(raw) as FrontendCache;
        if (parsed.date === getTodayString() && parsed.baseCurrency === baseCurrency) {
            return parsed.rates;
        }
        return null;
    } catch {
        return null;
    }
}

function writeCache(baseCurrency: CurrencyCode, rates: Partial<Record<CurrencyCode, number>>) {
    const cache: FrontendCache = { date: getTodayString(), baseCurrency, rates };
    localStorage.setItem(getCacheKey(baseCurrency), JSON.stringify(cache));
}

export interface ExchangeRatesResult {
    /** How many baseCurrency per 1 unit of the queried currency. baseCurrency itself = 1. */
    rates: Partial<Record<CurrencyCode, number>>;
    isLoading: boolean;
    isError: boolean;
    lastUpdated: string | null;
    getRate: (currency: CurrencyCode) => number;
    baseCurrency: CurrencyCode;
}

/**
 * Fetches exchange rates from our backend (/api/v1/exchange-rates?base=X),
 * which caches in the DB daily and proxies Frankfurter API.
 * Also adds a second-layer localStorage cache to avoid repeated API calls within the same day.
 *
 * getRate(X) = "how many baseCurrency per 1 unit of X"
 */
export function useExchangeRates(baseCurrency: CurrencyCode = "THB"): ExchangeRatesResult {
    const [rates, setRates] = useState<Partial<Record<CurrencyCode, number>>>({ [baseCurrency]: 1 });
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadRates() {
            // 1. Check localStorage cache (same-day)
            const cached = readCache(baseCurrency);
            if (cached) {
                if (!cancelled) {
                    setRates(cached);
                    setLastUpdated(getTodayString());
                    setIsLoading(false);
                }
                return;
            }

            // 2. Fetch from our backend using apiClient (correct base URL + auth)
            try {
                const data = await apiClient<{
                    baseCurrency: string;
                    rates: Record<string, number>;
                    date: string;
                }>(`/api/v1/exchange-rates?base=${baseCurrency}`);

                const built = data.rates as Partial<Record<CurrencyCode, number>>;
                built[baseCurrency] = 1;

                writeCache(baseCurrency, built);
                if (!cancelled) {
                    setRates(built);
                    setLastUpdated(data.date);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("[useExchangeRates] Failed:", err);
                if (!cancelled) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        }

        setIsLoading(true);
        setIsError(false);
        setRates({ [baseCurrency]: 1 });
        loadRates();

        return () => { cancelled = true; };
    }, [baseCurrency]);

    const getRate = (currency: CurrencyCode): number => rates[currency] ?? 1;

    return { rates, isLoading, isError, lastUpdated, getRate, baseCurrency };
}
