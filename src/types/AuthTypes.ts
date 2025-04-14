export interface LogoutResponse{
  success : boolean
  message : string
}

export interface LoginFromData{
  handle : string
  password : string
}

export type SignUpResponse = SuccessResponse | ErrorResponse

export type SignUpFormData = {
  handle : string
  name : string
  password : string
}

export type SignUpTokenResponse = {
  success : true
  verificationCode : string
} | ErrorResponse

export type LoginResponse = SuccessResponse | ErrorResponse

interface SuccessResponse{
  success : true
  user: {
    handle : string,
    name : string,
  }
}

interface ErrorResponse{
  success : false
  message : string
}