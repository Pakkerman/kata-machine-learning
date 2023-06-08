import Trie from "@code/Trie"

test("Trie", function () {
  const trie = new Trie()

  //   trie.insert("fo")
  // trie.delete("fo")

  // og tests

  // trie.insert("ca")
  // trie.insert("cat")
  // trie.insert("cats")
  // trie.insert("carrer")
  // expect(trie.find("ca").sort()).toEqual(["ca", "carrer", "cat", "cats"])
  // trie.delete("ca")
  // expect(trie.find("ca").sort()).toEqual(["carrer", "cat", "cats"])

  trie.insert("foo")
  trie.insert("fool")
  trie.insert("foolish")
  trie.insert("bar")
  trie.insert("cat")

  expect(trie.find("fo").sort()).toEqual(["foo", "fool", "foolish"])

  trie.delete("fool")
  trie.delete("cat")

  expect(trie.find("fo").sort()).toEqual(["foo", "foolish"])
})
