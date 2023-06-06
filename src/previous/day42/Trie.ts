class TrieNode {
  char: string
  isEnd: boolean
  next?: TrieNode
  children?: TrieNode
}

export default class Trie {
  root: TrieNode

  constructor() {
    this.root = { char: "root", isEnd: false }
  }

  insert(item: string): void {
    let curr = this.root // starting at roo
    // iterate through item
    for (let i = 0; i < item.length; i++) {
      let found = false
      let childNode = curr.children // get a pointer to the first child
      while (childNode) {
        if (childNode.char === item[i]) {
          found = true // set found to true, so that it will not create further down
          curr = childNode // Traverse curr for next iteration
          break // break out of the while loop, no reason to iterate more
        }
        childNode = childNode.next // if not found the correct child with the char that is matching to the current char in the item input, will travers to the next one till found or reach the end
      }
      // If matching child is not found, we'll create a new one
      if (!found) {
        const node: TrieNode = { char: item[i], isEnd: false }
        node.next = curr.children // we will use this node as the first node after update, so set the next to point to the current child, if the current child doesn't exist, it will just point to null
        curr.children = node // set the curr's children pointer to point to the new node, because on the last line we already point the next to the current existing node , if there's any. we won't lose any nodes,
        curr = node // Traverse curr to the next logical node, for the next iteration
      }
    }
    curr.isEnd = true
  }
  delete(item: string): void {
    this.deleteHelper(this.root, item, 0)
  }

  private deleteHelper(curr: TrieNode, item: string, idx: number): boolean {
    //  Base cases
    if (idx === item.length) {
      if (!curr.isEnd) {
        return false
      }
      curr.isEnd = false
      return curr.children === undefined
    }

    // pre
    // 1. Get current letter, curr's children and prev ptr
    // 2. Travers and find the matching children char
    const char = item[idx].toLowerCase()
    let childNode = curr.children
    let prev: TrieNode | undefined = undefined

    while (childNode) {
      if (childNode.char === char) break
      prev = childNode
      childNode = childNode.next
    }

    // Recurse - Going down letters one by one and return bool based on base case
    if (!childNode || !this.deleteHelper(childNode, item, idx + 1)) return false

    // Post - Remove the current node if recurse returns true
    // 1. If there is no prev curr.children will point to the next child and omit the current one
    // 2. Else don't need to touch curr, just jump over current childNode by connect prev to the next childNode
    if (!prev) {
      curr.children = childNode.next
    } else {
      prev.next = childNode.next
    }

    // Free childNode
    childNode = undefined

    return curr.children === undefined
  }

  find(partial: string): string[] {
    // // Parse through the input, and use as prefix and find all the children all
    // // the way to the end and return all valid ones that has isEnd set to true
    // // in the end node
    const result: string[] = [] // a string array that will be containing all string that reached the end
    let curr = this.root
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i]
      let childNode = curr.children
      // while there a child node, find if it match
      while (childNode) {
        // if there is one that match , find it's child and see if match
        if (childNode.char === char) {
          curr = childNode
          break
        }
        childNode = childNode.next
      }
      // if there no child to begin with , return empty result
      if (!childNode) {
        return result
      }
    }
    // curr is now at the last char of the input, recursivly build the
    this.collectWords(curr, partial, result)

    return result
  }

  private collectWords(node: TrieNode, prefix: string, result: string[]): void {
    // Base Case
    if (node.isEnd) result.push(prefix)
    // Recurse
    let childNode = node.children
    while (childNode) {
      this.collectWords(childNode, prefix + childNode.char, result)
      childNode = childNode.next
    }
  }
}
