import type { AuthenticateTokensType } from '~/types/account/authenticate'

export function getAuthenticateTokens(): AuthenticateTokensType | null {
  const tokens = localStorage.getItem('authTokens')
  try {
    const parsedTokens = JSON.parse(tokens || '') as AuthenticateTokensType
    return parsedTokens.access && parsedTokens.refresh ? parsedTokens : null
  }
  catch {
    return null
  }
}
export function isAuthenticateAccessTokenExpired(): boolean {
  const tokens = getAuthenticateTokens()
  return !tokens || Math.floor(Date.now() / 1000) > tokens.access_exp
}
