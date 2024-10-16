export enum AuthenticateSectionEnum {
  CHECK = 'CHECK',
  PASSWORD = 'PASSWORD',
  OTP = 'OTP',
}

export interface AuthenticateCheckResultType {
  section: AuthenticateSectionEnum
}

export interface AuthenticateTokensType {
  access: string
  refresh: string
}

// ForgotPassword
export interface ForgotPasswordTokenType {
  token: string
}

export enum ForgotPasswordSectionEnum {
  CHECK = 'CHECK',
  OTP = 'OTP',
  RESET = 'RESET',
}

export interface ForgotPasswordResetDataType {
  current_password: string
  password: string
  confirm_password: string
}

export interface ForgotPasswordResetResultType {
  error_input_name?: string
  access?: string
  refresh?: string
}
