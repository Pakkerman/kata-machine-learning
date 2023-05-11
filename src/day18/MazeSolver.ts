const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
]

function traverse(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    const { x, y } = curr
    if (x < 0 || y < 0 || maze.length <= y || maze[0].length <= x) return false
    if (maze[y][x] === wall) return false
    if (seen[y][x]) return false

    path.push(curr)
    seen[y][x] = true

    if (end.x === x && end.y === y) return true

    for (let i = 0; i < dir.length; i++) {
        const [xoff, yoff] = dir[i]
        if (
            traverse(maze, wall, { x: x + xoff, y: y + yoff }, end, seen, path)
        ) {
            return true
        }
    }

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
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[i].length).fill(false))
    }
    const path: Point[] = []
    traverse(maze, wall, start, end, seen, path)

    return path
}
