import { request } from '@/utils/request'

export function getCompanyList() {
  return request.get(`/sentiment/company`)
}
