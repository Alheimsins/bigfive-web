module.exports = (position, itemsPerPage, inventory) => {
  const pos = parseInt(position)
  const pp = parseInt(itemsPerPage)
  const next = pos + pp
  const back = pos - pp
  const previous = back !== 0

  return {
    next: () => {
      return {
        items: inventory.slice(next, next + pp),
        finished: inventory.length === next,
        position: next
      }
    },
    back: () => {
      return {
        items: inventory.slice(back, pos),
        previous,
        position: back
      }
    },
    current: () => {
      return {
        items: inventory.slice(pos, next),
        previous
      }
    }
  }
}
