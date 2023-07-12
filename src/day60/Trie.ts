type TrieNode = {
  children: { [key: string]: TrieNode }
  isEnd: boolean
  word: string
}

export default class Trie {
  private root: TrieNode
  constructor() {
    this.root = { children: {}, isEnd: false, word: "" } as TrieNode
  }

  insert(item: string): void {
    if (item.length === 0) return

    let curr = this.root
    for (let i = 0; i < item.length; i++) {
      const char = item[i].toLowerCase()
      if (!(char in curr.children)) {
        curr.children[char] = { children: {}, isEnd: false, word: "" }
      }

      curr = curr.children[char]
    }
    curr.isEnd = true
    curr.word = item
  }
  delete(item: string): void {
    this.deleteWord(this.root, 0, item)
  }

  private deleteWord(curr: TrieNode, idx: number, word: string): boolean {
    console.log(`running ${curr}, at idx: ${idx}, of ${word}`)
    if (idx === word.length) {
      if (!curr.isEnd) return false
      curr.isEnd = false
      return Object.keys(curr.children).length === 0
    }

    const char = word[idx]
    const child = curr.children[char]
    if (!this.deleteWord(child, idx + 1, word)) return false

    return Object.keys(curr.children).length === 0
  }
  find(partial: string): string[] {
    const out: string[] = []

    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i].toLowerCase()
      if (!(char in curr.children)) return out
      curr = curr.children[char]
    }

    this.getWords(curr, out)
    return out
  }
  private getWords(curr: TrieNode, out: string[]) {
    if (curr?.isEnd) out.push(curr.word)
    for (const char in curr.children) {
      this.getWords(curr.children[char], out)
    }
  }
}
