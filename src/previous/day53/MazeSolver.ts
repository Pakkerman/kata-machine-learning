const dir = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]

export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  const path: Point[] = []
  const seen: boolean[][] = []
  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[i].length).fill(false))
  }

  traverse(start)
  function traverse(curr: Point): boolean {
    const { x, y } = curr
    if (x < 0 || maze[y].length <= x || y < 0 || maze.length <= y) return false
    if (seen[y][x]) return false
    if (maze[y][x] === wall) return false

    path.push(curr)
    seen[y][x] = true
    if (x === end.x && y === end.y) return true

    for (let i = 0; i < dir.length; i++) {
      const [xoff, yoff] = dir[i]
      if (traverse({ x: x + xoff, y: y + yoff })) return true
    }

    path.pop()
    return false
  }

  return path
}
