const TokenKey: string = 'access-token' 

export function setToken(val: string) {
  localStorage.setItem(TokenKey, val)
}

export function getToken(): string {
  return localStorage.getItem(TokenKey)
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
}