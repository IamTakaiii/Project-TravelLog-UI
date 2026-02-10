import { EqualSplitResult, SplitValidation } from '../types';
import { SPLIT_TOLERANCE } from '../constants/thresholds';

/**
 * Calculates an equal split of a total amount among participants.
 *
 * Each participant pays `totalAmount / participantIds.length`.
 * If the participant list is empty, returns `perPersonAmount: 0` with an empty list.
 */
export function calculateEqualSplit(
  totalAmount: number,
  participantIds: string[]
): EqualSplitResult {
  const perPersonAmount =
    participantIds.length > 0 ? totalAmount / participantIds.length : 0;

  return {
    type: 'equal',
    perPersonAmount,
    involvedUserIds: [...participantIds],
    totalAmount,
  };
}

/**
 * Validates that exact split amounts sum to the expected total within a tolerance.
 *
 * Returns a `SplitValidation` indicating whether the split is valid,
 * the total assigned, the expected total, and the absolute discrepancy.
 *
 * @param tolerance - Maximum allowed absolute difference (defaults to SPLIT_TOLERANCE = 0.01)
 */
export function validateExactSplit(
  totalAmount: number,
  amounts: Record<string, number>,
  tolerance: number = SPLIT_TOLERANCE
): SplitValidation {
  const totalAssigned = Object.values(amounts).reduce(
    (sum, amt) => sum + (amt || 0),
    0
  );
  const discrepancy = Math.abs(totalAssigned - totalAmount);

  return {
    isValid: discrepancy <= tolerance,
    totalAssigned,
    expectedTotal: totalAmount,
    discrepancy,
  };
}
