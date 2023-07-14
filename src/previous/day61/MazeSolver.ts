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
  const seen: boolean[][] = Array.from({ length: maze.length }, () =>
    new Array(maze[0].length).fill(false)
  )
  explore(start)
  return path

  function explore(curr: Point): boolean {
    const { x, y } = curr
    if (y < 0 || maze.length <= y) return false
    if (x < 0 || maze[y].length <= x) return false
    if (maze[y][x] === wall) return false
    if (seen[y][x]) return false
    path.push(curr)
    seen[y][x] = true

    if (x === end.x && y === end.y) return true

    for (let i = 0; i < dir.length; i++) {
      const [xoff, yoff] = dir[i]
      if (explore({ x: x + xoff, y: y + yoff })) return true
    }

    path.pop()
    return false
  }
}
