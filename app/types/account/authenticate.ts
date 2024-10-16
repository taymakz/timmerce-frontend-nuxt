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
