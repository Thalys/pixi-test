export function shuffle<T> (array: T[], rand: () => number = Math.random): T[] {

  const result = array.slice()

  let length = array.length
  while (length > 0) {
    const i = Math.floor(rand() * length--)
    const temp = result[length]
    result[length] = result[i]
    result[i] = temp
  }

  return result
}

export function uniques<T> (arr: T[]) {
  return Array.from(new Set(arr))
}

/**
 * Returns a random item
 * @param arr - The array to choose from
 * @returns The randomly selected item
 */
export function choose<T> (arr: T[], rand: () => number = Math.random): T {
  return arr[Math.floor(rand() * arr.length)]
}

export function randomPick<T> (arr: T[], count: number) {
  return shuffle(arr.slice()).slice(0, count)
}

/**
 * Returns a random element from the given array within the specified range.
 *
 * @param {Array} array - The array to select a random element from.
 * @param {number} min - The minimum index (default: 0).
 * @param {number} max - The maximum index (default: array.length - 1).
 * @returns {*} - The randomly selected element.
 */
export function pick<T> (array: T[], min: number = 0, max: number = array.length - 1): T {
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min
  return array[randomIndex]
}

// Generic toMap function that converts an array to a Map
// Uses a key selector function to determine the map keys
export function toMap<T, K> (
  array: readonly T[],
  keySelector: (item: T) => K,
): Map<K, T> {
  return new Map(array.map(item => [keySelector(item), item] as const))
}
