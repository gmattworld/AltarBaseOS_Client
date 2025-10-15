import { Tenant } from "./tenant"
import { User } from "./user"

export interface BaseResponse<T> {
  data: T
  success: boolean
  message: string
  status: number
}

export interface BaseResponseExt<T> {
  data: Array<T>
  current_page: number
  page_size: number
  total: number
  success: boolean
  message: string
  status_code: number
}

export interface BaseTokenResponse {
  user: User
  tenant: Tenant
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: string
  success: boolean
  message: string
  status_code: number
}