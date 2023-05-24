const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
]

// maze = [
//  "########E#"
//  "#        #"
//  "#S########"
// ]

function walk(
    maze: string[],
    wall: string,
    current: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    //base cases
    // Go off the map
    if (
        current.x < 0 ||
        current.x >= maze[0].length ||
        current.y < 0 ||
        current.y >= maze.length
    )
        return false
    // Hit the wall
    if (maze[current.y][current.x] === wall) return false
    // Has been to the tile
    if (current.x === end.x && current.y === end.y) {
        path.push(end)
        return true
    }
    if (seen[current.y][current.x]) return false
    // Reach the end

    // 3 Steps of Recursion

    // Pre - set the tile to seen, push current to path
    seen[current.y][current.x] = true
    path.push(current)
    // recurse - recurse all 4 directions
    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i]
        if (
            walk(
                maze,
                wall,
                { x: current.x + x, y: current.y + y },
                end,
                seen,
                path,
            )
        )
            return true
    }
    // post if none of the direction worked, pop this point in the path, and return false
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
        seen.push(new Array(maze[0].length).fill(false))
    }

    walk(maze, wall, start, end, seen, path)

    return path
}
