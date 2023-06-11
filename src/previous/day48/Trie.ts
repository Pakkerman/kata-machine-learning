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
    if (!item) return

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

      const node: Node = { char, isEnd: false }
      node.next = curr.children
      curr.children = node
      curr = node
    }
    curr.isEnd = true
  }
  delete(item: string): void {
    this.deleteWord(this.root, item, 0)
  }

  private deleteWord(curr: Node, word: string, idx: number): boolean {
    if (idx === word.length) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      return !curr.children
    }

    const char = word[idx].toLowerCase()
    let child = curr.children
    let prev: Node | undefined

    while (child) {
      if (child.char === char) break
      prev = child
      child = child.next
    }

    if (!child) return false
    if (!this.deleteWord(child, word, idx + 1)) return false

    if (prev) {
      prev.next = child.next
    } else {
      curr.children = child.next
    }

    child = undefined
    return !curr.children
  }

  find(partial: string): string[] {
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

  private getWords(curr: Node, prefix: string, result: string[]): void {
    if (curr.isEnd) result.push(prefix)

    let child = curr.children
    while (child) {
      this.getWords(child, prefix + child.char, result)
      child = child.next
    }
  }
  private createNode(char: string): Node {
    return { char, isEnd: false }
  }
}
