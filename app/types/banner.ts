export interface BannerDetailType {
  position: BannerPositionEnum
  normal_banner: string
  small_banner?: string
  title: string
  description: string
  url: string
  external_url: boolean
}
export enum BannerPositionEnum {
  SOLO_FULL_WIDTH_SLIDER = 'SOLO_FULL_WIDTH_SLIDER',
  SOLO_CONTAINERIZED_SLIDER = 'SOLO_CONTAINERIZED_SLIDER',
  GROUP_COMBINE_SLIDER = 'GROUP_COMBINE_SLIDER',
  GROUP_COMBINE_BANNER = 'GROUP_COMBINE_BANNER',
  GROUP_FOUR_BANNER = 'GROUP_FOUR_BANNER',
  GROUP_TWO_BANNER = 'GROUP_TWO_BANNER',
}
