import { Expense } from '../types';
import { CENTRAL_FUND_ID } from '../constants/thresholds';

export interface DebtBreakdown {
  userId: string;
  amount: number;
  transactions: Expense[];
}

export interface DebtSummary {
  whoOwesMe: DebtBreakdown[];
  iOweWho: DebtBreakdown[];
  netBalance: number;
  totalReceivable: number;
  totalPayable: number;
}

/**
 * Calculates debt balances between the current user and all other participants
 * from a list of expenses.
 *
 * For each expense:
 * - If the current user paid, other involved users owe their share.
 * - If someone else paid and the current user is involved, the current user owes their share.
 *
 * Debts are aggregated by user to compute net balances. A positive net balance
 * means the other user owes the current user; a negative net balance means the
 * current user owes the other user.
 *
 * Central fund payments (payerId === CENTRAL_FUND_ID) are excluded.
 *
 * A tolerance of 1 THB is applied when classifying debts to avoid floating-point noise.
 */
export function calculateDebts(
  expenses: Expense[],
  currentUserId: string
): DebtSummary {
  const debtMap: Record<string, number> = {};
  const transactionsMap: Record<string, Expense[]> = {};

  expenses.forEach((ex) => {
    if (ex.payerId === CENTRAL_FUND_ID) return;

    const payerId = ex.payerId;
    const splitters = ex.splitDetails.involvedUserIds;
    const isExact = ex.splitDetails.type === 'exact';
    const exactAmounts = ex.splitDetails.amounts;

    const amountPerPerson = ex.thbAmount / splitters.length;

    if (payerId === currentUserId) {
      // I paid, others owe me
      splitters.forEach((uid) => {
        if (uid !== currentUserId) {
          const share = isExact && exactAmounts
            ? (exactAmounts[uid] || 0) * ex.exchangeRate
            : amountPerPerson;

          debtMap[uid] = (debtMap[uid] || 0) + share;

          if (!transactionsMap[uid]) transactionsMap[uid] = [];
          transactionsMap[uid].push(ex);
        }
      });
    } else if (splitters.includes(currentUserId)) {
      // Someone else paid, I owe them
      const myShare = isExact && exactAmounts
        ? (exactAmounts[currentUserId] || 0) * ex.exchangeRate
        : amountPerPerson;

      debtMap[payerId] = (debtMap[payerId] || 0) - myShare;

      if (!transactionsMap[payerId]) transactionsMap[payerId] = [];
      transactionsMap[payerId].push(ex);
    }
  });

  const whoOwesMe: DebtBreakdown[] = Object.entries(debtMap)
    .filter(([, amt]) => amt > 1) // Tolerance for floating point
    .map(([uid, amt]) => ({
      userId: uid,
      amount: amt,
      transactions: transactionsMap[uid] || [],
    }));

  const iOweWho: DebtBreakdown[] = Object.entries(debtMap)
    .filter(([, amt]) => amt < -1)
    .map(([uid, amt]) => ({
      userId: uid,
      amount: amt,
      transactions: transactionsMap[uid] || [],
    }));


  const netBalance = Object.values(debtMap).reduce(
    (sum, amt) => sum + amt,
    0
  );

  const totalReceivable = whoOwesMe.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalPayable = iOweWho.reduce(
    (sum, item) => sum + Math.abs(item.amount),
    0
  );

  return { whoOwesMe, iOweWho, netBalance, totalReceivable, totalPayable };
}
