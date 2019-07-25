const ReadIdKey = 'read_id'

export function setReadId(id) {
  const origin = getReadId()

  origin.push(id)
  
  localStorage.setItem(ReadIdKey, JSON.parse([...new Set(origin)]))
}

export function deleteReadId() {
  localStorage.removeItem(ReadIdKey)
}

export function getReadId() {
  return JSON.parse(localStorage.getItem(ReadIdKey)) || []
}