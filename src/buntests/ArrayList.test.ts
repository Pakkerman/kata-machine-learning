import { test, expect } from "bun:test"
import ArrayList from "@code/ArrayList"
import { test_list } from "./ListTest.test"

test("ArrayList.ts", function () {
  const list = new ArrayList<number>(1)
  test_list(list)
})

test("Prepend", () => {
  const list = new ArrayList<number>(5)
  list.prepend(1)
  expect(list.length).toBe(1)
  list.prepend(2)
  expect(list.length).toBe(2)
  list.prepend(3)
  expect(list.length).toBe(3)
  expect(list.get(0)).toBe(3)
  expect(list.get(1)).toBe(2)
  expect(list.get(2)).toBe(1)
  expect(list.get(3)).toBe(undefined)
})

test("Append", () => {
  const list = new ArrayList<number>(5)
  list.append(1)
  expect(list.length).toBe(1)
  list.append(2)
  expect(list.length).toBe(2)
  list.append(3)
  expect(list.length).toBe(3)
  expect(list.get(0)).toBe(1)
  expect(list.get(1)).toBe(2)
  expect(list.get(2)).toBe(3)
  expect(list.get(3)).toBe(undefined)
})

test("InsertAt", () => {
  const list = new ArrayList<number>(5)
  list.append(1)
  expect(list.length).toBe(1)
  list.insertAt(2, 1)
  expect(list.length).toBe(2)
  list.insertAt(3, 0)
  expect(list.length).toBe(3)
  expect(list.get(0)).toBe(3)
  expect(list.get(1)).toBe(1)
  expect(list.get(2)).toBe(2)
  expect(list.get(3)).toBe(undefined)
})

test("Remove", () => {
  const list = new ArrayList<number>(5)
  list.append(1)
  expect(list.length).toBe(1)
  list.append(2)
  expect(list.length).toBe(2)
  list.append(3)
  expect(list.length).toBe(3)
  expect(list.remove(1)).toBe(1)
  expect(list.length).toBe(2)
  expect(list.remove(1)).toBe(undefined)
  expect(list.remove(2)).toBe(2)
  expect(list.remove(3)).toBe(3)
  expect(list.length).toBe(0)
})

test("RemoveAt", () => {
  const list = new ArrayList<number>(5)
  list.append(1)
  expect(list.length).toBe(1)
  list.append(2)
  expect(list.length).toBe(2)
  list.append(3)
  expect(list.length).toBe(3)
  expect(list.removeAt(0)).toBe(1)
  expect(list.removeAt(1)).toBe(3)
  expect(list.length).toBe(1)
  expect(list.get(1)).toBe(undefined)
  expect(list.removeAt(0)).toBe(2)
})