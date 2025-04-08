export interface LogoutResponse{
  success : boolean
  message : string
}

export interface LoginFromData{
  handle : string
  password : string
}

  
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