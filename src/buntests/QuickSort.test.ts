import { describe, test, expect } from "bun:test"
import quick_sort from "@code/QuickSort"
import { hugeNumberArray } from "../lib/HugeArray"

const huge = [
  22733, 34627, 88111, 34234, 97469, 18375, 69999, 25553, 16969, 58410, 40763,
  6944, 28233, 27107, 68812, 91135, 26734, 56060, 23583, 96869, 70063, 49,
  45786, 22004, 82558, 55821, 27733, 53329, 73825, 16797, 11547, 71032, 29075,
  3932, 12043, 71043, 62238, 70278, 38619, 14392, 27716, 54556, 17335, 48093,
  20685, 95552, 38145, 75975, 82956, 87195, 90261, 40883, 93117, 65718, 65613,
  86532, 93235, 8030, 75632, 71369, 90171, 66712, 49434, 70929, 35185, 73093,
  31593, 76343, 29540, 72639, 12583, 65110, 9271, 54450, 51147, 65506, 42978,
  20560, 70847, 56929, 33067, 77581, 79243, 15909, 15681, 64798, 49731, 21218,
  84098,
]

describe("Quick Sort test", function () {
  test(() => {
    const arr = [9, 3, 7, 4, 69, 420, 42]
    const arr2 = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

    quick_sort(arr)
    expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420])

    // quick_sort(arr2)
    // expect(arr2).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

    // quick_sort(hugeNumberArray)
    // expect(hugeNumberArray).toEqual(hugeNumberArray.sort())
  })

  test(() => {
    const sorted = huge.toSorted((a, b) => a - b)
    quick_sort(huge)
    expect(huge).toEqual(sorted)
  })

  test(() => {
    const array = [7, 2, 69, 1, 42, 8, 5]
    quick_sort(array)
    console.log(array)
  })
})
