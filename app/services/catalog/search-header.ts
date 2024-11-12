import FetchApi from "~/composables/api";
import type { CatalogSearchHeaderResultType } from "~/types/catalog/search-header";
import type { ApiResponseType } from "~/types/request";

export function CatalogSearchHeader(search: string): Promise<ApiResponseType<CatalogSearchHeaderResultType | null>> {
  return FetchApi(`/catalog/search/header/?q=${search}`)
}
