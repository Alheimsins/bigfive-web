export const setItem = (key, value) => {
  if (window.localStorage) {
    return window.localStorage.setItem(key, value)
  }
}

export const getItem = key => {
  if (window.localStorage) {
    return window.localStorage.getItem(key)
  }
}

export const populateData = data => {
  setItem('inProgress', 'true')
  const { position, progress, next, previous, items } = data
  const answers = Object.assign({}, data.answers)
  setItem('b5data', JSON.stringify({ progress, next, previous, answers, position, items }))
}

export const restoreData = () => {
  const data = getItem('b5data')
  return JSON.parse(data)
}

export const getProgress = () => !!getItem('inProgress')

export const clearItems = () => {
  if (window.localStorage) {
    window.localStorage.clear()
  }
}
