export default function two_crystal_balls(breaks: boolean[]): number {
  const len = breaks.length
  const j = Math.floor(Math.sqrt(len))
  let i = j
  for (; i < len; i += j) {
    if (breaks[i]) break
  }
  i -= j
  for (; i < len; i++) {
    if (breaks[i]) return i
  }

  return -1
}
