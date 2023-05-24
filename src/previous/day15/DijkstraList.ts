function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    // console.log(seen.some((seen, idx) => !seen && dists[idx] < Infinity))
    return seen.some((seen, idx) => !seen && dists[idx] < Infinity)
    // If any one of the callbacks returns true, some will return true
    // in the first iterateion, seen is all false so in the callback of some the first
    // fill in for the first  iteration => seen.some((false, 0) => !false && 0 < Infinity)
    // fill in for the first  iteration => seen.some((false, 0) => true && true)
    // return true
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    // get the lowest in the dists, and it has to be unseen
    let idx = -1
    let lowersDistance = Infinity
    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) continue
        if (dists[i] < lowersDistance) {
            idx = i
            lowersDistance = dists[i]
        }
    }

    return idx
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen: boolean[] = new Array(arr.length).fill(false)
    const dists: number[] = new Array(arr.length).fill(Infinity)
    const prev: number[] = new Array(arr.length).fill(-1)

    dists[source] = 0

    while (hasUnvisited(seen, dists)) {
        console.log(seen, dists, prev)
        const curr = getLowestUnvisited(seen, dists)
        seen[curr] = true
        const adjs = arr[curr]
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i].to
            const weight = adjs[i].weight
            if (seen[edge]) continue

            const dist = dists[i] + weight
            if (dists[edge] > dist) {
                dists[edge] = dist
                prev[edge] = curr
            }
        }
    }

    const out: number[] = []
    let curr = sink
    while (prev[curr] !== -1) {
        out.push(curr)
        curr = prev[curr]
    }
    out.push(source)
    return out.reverse()
}
