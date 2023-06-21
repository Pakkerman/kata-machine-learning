type TrieNode = {
  char: string
  next?: TrieNode
  children?: TrieNode
  isEnd: boolean
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = this.createNode("")
  }

  insert(item: string): void {
    if (!item || item.length === 0) return

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

      const node: TrieNode = this.createNode(char)
      node.next = curr.children
      curr.children = node
      curr = node
    }

    curr.isEnd = true
  }
  delete(item: string): void {
    this.deleteWord(this.root, item, 0)
  }

  private deleteWord(curr: TrieNode, item: string, idx: number): boolean {
    if (idx === item.length) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      return curr.children === undefined
    }

    const char = item[idx].toLowerCase()
    let prev: TrieNode | undefined = undefined
    let child = curr.children
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
    const result: string[] = []
    if (!partial || partial.length === 0) return result
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      let child = curr.children
      while (child) {
        if (child.char === char) break
        child = child.next
      }

      if (!child) return result
      curr = child
    }

    this.getWords(curr, partial, result)
    return result
  }
  private getWords(curr: TrieNode, prefix: string, result: string[]): void {
    if (curr.isEnd) result.push(prefix)

    let child = curr.children
    while (child) {
      this.getWords(child, prefix + child.char, result)
      child = child.next
    }
  }

  private createNode(char: string): TrieNode {
    return { char, isEnd: false }
  }
}
