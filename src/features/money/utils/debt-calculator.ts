import { Expense, DebtBreakdown, DebtSummary } from "../types";
import { CENTRAL_FUND_ID } from "../constants/thresholds";

export type { DebtBreakdown, DebtSummary };

/**
 * Calculates debt balances between the current user and all other participants.
 *
 * For each expense:
 * - If the current user paid → other involved users owe their share.
 * - If someone else paid and the current user is involved → the current user owes their share.
 *
 * A tolerance of 1 (base currency unit) is applied to ignore floating-point noise.
 * Central fund payments are excluded.
 */
export function calculateDebts(expenses: Expense[], currentUserId: string): DebtSummary {
  const debtMap: Record<string, number> = {};
  const transactionsMap: Record<string, Expense[]> = {};

  expenses.forEach((ex) => {
    if (ex.payerId === CENTRAL_FUND_ID) return;

    const { payerId } = ex;
    const splitters = ex.splitDetails.involvedUserIds;
    const isExact = ex.splitDetails.type === "exact";
    const exactAmounts = ex.splitDetails.amounts;
    const amountPerPerson = ex.thbAmount / splitters.length;

    if (payerId === currentUserId) {
      // I paid — others owe me their share
      splitters.forEach((uid) => {
        if (uid === currentUserId) return;

        const share =
          isExact && exactAmounts
            ? (exactAmounts[uid] ?? 0) * ex.exchangeRate
            : amountPerPerson;

        debtMap[uid] = (debtMap[uid] ?? 0) + share;
        (transactionsMap[uid] ??= []).push(ex);
      });
    } else if (splitters.includes(currentUserId)) {
      // Someone else paid — I owe them my share
      const myShare =
        isExact && exactAmounts
          ? (exactAmounts[currentUserId] ?? 0) * ex.exchangeRate
          : amountPerPerson;

      debtMap[payerId] = (debtMap[payerId] ?? 0) - myShare;
      (transactionsMap[payerId] ??= []).push(ex);
    }
  });

  const whoOwesMe: DebtBreakdown[] = Object.entries(debtMap)
    .filter(([, amt]) => amt > 1)
    .map(([uid, amt]) => ({ userId: uid, amount: amt, transactions: transactionsMap[uid] ?? [] }));

  const iOweWho: DebtBreakdown[] = Object.entries(debtMap)
    .filter(([, amt]) => amt < -1)
    .map(([uid, amt]) => ({ userId: uid, amount: amt, transactions: transactionsMap[uid] ?? [] }));

  const netBalance = Object.values(debtMap).reduce((sum, amt) => sum + amt, 0);
  const totalReceivable = whoOwesMe.reduce((sum, item) => sum + item.amount, 0);
  const totalPayable = iOweWho.reduce((sum, item) => sum + Math.abs(item.amount), 0);

  return { whoOwesMe, iOweWho, netBalance, totalReceivable, totalPayable };
}
