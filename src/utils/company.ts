const CompanyKey: string = 'company' 

export function setCompany(val: string) {
  localStorage.setItem(CompanyKey, val)
}

export function getCompany(): string {
  return localStorage.getItem(CompanyKey)
}

export function removeCompany() {
  localStorage.removeItem(CompanyKey)
}