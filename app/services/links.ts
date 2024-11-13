import FetchApi from '~/composables/api'
import type { LinksFooterDetailType, LinksHeaderDetailType } from '~/types/links'

import type { ApiResponseType } from '~/types/request'

export function LinksHeaderGet(): Promise<
  ApiResponseType<LinksHeaderDetailType[]>
> {
  return FetchApi('/links/header/get/')
}

export function LinksFooterGet(): Promise<
  ApiResponseType<LinksFooterDetailType[]>
> {
  return FetchApi('/links/footer/get/')
}
