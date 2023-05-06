// base case :
// 1. Its a wall
// 2. Step out of the map
// 3. Its the end, its solve
// 4. If seen
// recurse:
// 1. Check every direction, up, right, down, right

const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // Off the map?
    if (
        curr.x < 0 ||
        maze[0].length <= curr.x ||
        curr.y < 0 ||
        maze.length <= curr.y
    )
        return false
    // Hit the wall?
    if (maze[curr.y][curr.x] === wall) return false
    // Reach the end?
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end)
        return true
    }
    // Walked this way?
    if (seen[curr.y][curr.x]) return false
    // Recursion

    // pre
    seen[curr.y][curr.x] = true
    path.push(curr)
    // recurse
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i]
        if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path))
            return true
    }
    // post
    path.pop()

    return false
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = []
    const path: Point[] = []
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[i].length).fill(false))
    }

    walk(maze, wall, start, end, seen, path)

    return path
}
