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
    this.deleteWord(this.root, item, 0)
  }
  private deleteWord(curr: Node, item: string, idx: number): boolean {
    if (idx === item.length) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      return curr.children === undefined
    }

    const char = item[idx].toLowerCase()
    let child = curr.children
    let prev: Node | undefined = undefined
    while (child) {
      if (child.char === char) break
      prev = child
      child = child.next
    }

    if (!child) return false
    if (!this.deleteWord(child, item, idx + 1)) return false

    if (prev) prev.next = child.next
    else curr.children = child.next
    child = undefined

    return curr.children === undefined
  }
  find(partial: string): string[] {
    const out: string[] = []
    if (partial.length === 0) return out

    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      let child = curr.children
      while (child) {
        if (child.char === char) break
        child = child.next
      }

      if (child) {
        curr = child
        continue
      }
      return out
    }

    this.getWords(curr, partial, out)
    return out
  }
  private getWords(curr: Node, prefix: string, out: string[]): void {
    if (curr.isEnd) out.push(prefix)

    let child = curr.children
    while (child) {
      this.getWords(child, prefix + child.char, out)
      child = child.next
    }
  }

  private createNode(char: string): Node {
    return { char, isEnd: false }
  }
}
