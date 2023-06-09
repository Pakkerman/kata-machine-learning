type Node = {
  char: string
  children?: Node
  next?: Node
  isEnd: boolean
}

export default class Trie {
  private root: Node
  constructor() {
    this.root = this.createNode("")
  }

  insert(item: string): void {
    if (item.length === 0 || !item) return

    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i].toLowerCase()
      let child = curr.children
      while (child) {
        if (child.char === char) break
        child = child.next
      }

      if (child) {
        curr = child
        continue
      }

      const node = this.createNode(char)
      node.next = curr.children
      curr.children = node
      curr = node
    }
    curr.isEnd = true
  }
  delete(item: string): void {
    if (!item) return

    this.deleteWord(this.root, item, 0)
  }
  private deleteWord(curr: Node, item: string, idx: number): boolean {
    if (item.length === idx) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      return !curr.children
    }

    const char = item[idx].toLowerCase()
    let prev: Node | undefined
    let child = curr.children
    while (child) {
      if (child.char === char) break
      prev = child
      child = child.next
    }

    if (!child) return false
    if (!this.deleteWord(child, item, idx + 1)) return false

    if (prev) {
      prev.next = child.next
    } else {
      curr.children = child.next
    }

    return !child.children
  }
  find(partial: string): string[] {
    console.log("71", this.root)
    const out: string[] = []
    if (!partial) return out

    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      let child = curr.children
      while (child) {
        if (child.char === char) break
        child = child.next
      }

      if (!child) return out

      curr = child
    }

    this.getWords(curr, partial, out)
    return out
  }

  private getWords(curr: Node, prefix: string, output: string[]): void {
    if (curr.isEnd) output.push(prefix)

    let child = curr.children
    while (child) {
      this.getWords(child, prefix + child.char, output)
      child = child.next
    }
  }

  private createNode(char: string): Node {
    return { char, isEnd: false }
  }
}
