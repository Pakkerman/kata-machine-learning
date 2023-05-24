function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity)
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
        // fillin => seen[i] = false , dists[i] = 0
        if (seen[i]) continue
        if (lowersDistance > dists[i]) {
            lowersDistance = dists[i]
            idx = i
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
        const curr = getLowestUnvisited(seen, dists)
        seen[curr] = true

        const adjs = arr[curr]
        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i].to // get the edge in the i-th of adjs
            const weight = adjs[i].weight // get the weight in the i-th of adjs
            if (seen[edge]) continue //if the edge is seen, continue

            const dist = dists[i] + weight // dist = dists[
            if (dist < dists[edge]) {
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
