import ArrayList from "@code/ArrayList"
import { test_list } from "./ListTest"

test("array-list", function () {
    const list = new ArrayList<number>(1)
    test_list(list)
})
