class TrieNode {
  char: string
  children: { [key: string]: TrieNode }
  isEnd: boolean

  constructor(char: string = "") {
    this.char = char
    this.children = {}
    this.isEnd = false
  }
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  insert(item: string): void {
    if (item.length === 0) return
    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i].toLowerCase()
      if (!curr.children[char]) curr.children[char] = new TrieNode(char)
      curr = curr.children[char]
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
      return Object.keys(curr.children).length === 0
    }

    const char = item[idx]
    let child = curr.children[char]
    if (!child) return false
    if (!this.deleteWord(child, item, idx + 1)) return false

    delete curr.children[char]
    return Object.keys(curr.children).length === 0
  }
  find(partial: string): string[] {
    if (partial.length === 0) return []
    const out: string[] = []
    let curr = this.root

    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      let child = curr.children[char]
      if (!child) break
      curr = child
    }
    this.getWords(curr, partial, out)
    return out
  }
  private getWords(curr: TrieNode, prefix: string, out: string[]): void {
    if (curr.isEnd) out.push(prefix)

    for (const key in curr.children) {
      const child = curr.children[key]
      this.getWords(child, prefix + child.char, out)
    }
  }
}
