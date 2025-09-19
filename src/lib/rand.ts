/**
 * Random number generation utilities
 *
 * This module provides utility functions for generating random numbers
 * within specified ranges, including both floating-point and integer values.
 */

// Destructure Math methods for cleaner usage
const { random, floor } = Math

/**
 * Generates a random floating-point number within a specified range.
 *
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (exclusive)
 * @returns A random float where min <= result < max
 *
 * @example
 * ```ts
 * rollFloat(1.0, 5.0) // Returns a float like 3.847291...
 * rollFloat(0, 1)     // Returns a float between 0 and 1 (like Math.random but with explicit bounds)
 * ```
 */
export const rollFloat = function (min: number, max: number): number {
  return min + random() * (max - min)
}

/**
 * Generates a random integer within a specified range.
 *
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random integer where min <= result <= max
 *
 * @example
 * ```ts
 * rollInt(1, 6)    // Returns 1, 2, 3, 4, 5, or 6 (like a dice roll)
 * rollInt(0, 10)   // Returns any integer from 0 to 10
 * rollInt(-5, 5)   // Returns any integer from -5 to 5
 * ```
 *
 * @note The key difference from rollFloat is that max is inclusive for integers,
 *       and we add 1 to the range calculation to ensure max can be selected.
 */
export const rollInt = function (min: number, max: number): number {
  return floor(min + random() * (1 + max - min))
}
