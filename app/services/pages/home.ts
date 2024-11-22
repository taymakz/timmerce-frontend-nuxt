import FetchApi from "~/composables/api";
import type { HomeCommonDataType } from "~/types/pages/home";
import type { ApiResponseType } from "~/types/request";

export function GetPageHomeData(): Promise<ApiResponseType<HomeCommonDataType>> {
  return FetchApi('/pages-content/home/')
}
