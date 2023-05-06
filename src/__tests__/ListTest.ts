export function test_list(list: List<number>): void {
    list.append(5)
    list.append(7)
    list.append(9)
    // 5 >> 7 >> 9
    console.log("checkpoint [5 >> 7 >> 9]", printlist(list))

    expect(list.get(2)).toEqual(9)
    expect(list.removeAt(1)).toEqual(7)
    // 5 >> 9
    console.log("checkpoint, [5 >> 9]", printlist(list))

    expect(list.length).toEqual(2)

    list.append(11)
    // 5 >> 9 >> 11
    console.log("checkpoint, [5 >> 9 >> 11]", printlist(list))

    expect(list.removeAt(1)).toEqual(9)
    // 5 >> 11
    expect(list.remove(9)).toEqual(undefined)

    // 5 >> 11
    expect(list.removeAt(0)).toEqual(5)
    // 11

    expect(list.removeAt(0)).toEqual(11)
    // >> undefined
    expect(list.length).toEqual(0)

    list.prepend(5)
    list.prepend(7)
    list.prepend(9)
    // 9 >> 7 >> 5
    console.log("checkpoint, [9 >> 7 >> 5]", printlist(list))

    list.insertAt(69, 1)

    console.log("checkpoint, [9 >> 69 >> 7 >> 5]", printlist(list))
    // 5 >> 69 >> 7 >> 9
    list.removeAt(1)
    // 9 >> 7 >> 5
    console.log("checkpoint, [9 >> 7 >> 5]", printlist(list))

    expect(list.get(2)).toEqual(5)
    expect(list.get(0)).toEqual(9)
    expect(list.remove(9)).toEqual(9)
    expect(list.length).toEqual(2)
    expect(list.get(0)).toEqual(7)
    // 7 >> 5

    printlist(list)
}

function printlist(list: List<number>): (number | undefined)[] {
    const out = []
    for (let i = 0; i < 5; i++) {
        out.push(list.get(i))
    }
    return out
}
