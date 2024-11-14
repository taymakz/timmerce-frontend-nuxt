export enum LinksHeaderTypeEnum {
  DEFAULT = 'DEFAULT',
  MEGA_MENU = 'MEGA_MENU',
  NORMAL_MENU = 'NORMAL_MENU',
  DROPDOWN = 'DROPDOWN',
}

export interface LinksHeaderDetailType {
  id: number
  image: number | null
  link_type: LinksHeaderTypeEnum
  title: string
  icon: string
  primary_text_color: boolean
  indicator_color_light: string
  indicator_color_dark: string
  link_category: number | null
  link_custom: string
  main: boolean
  public: boolean
  order: number
  image_preview: string | null
  link: string
  childrens: LinksHeaderDetailType[]
  tn_parent?: number | null
}



export interface LinksFooterDetailType {
  title: string
  link: string
  public: boolean
  order: number
  parent?: number | null
  childrens: LinksFooterDetailType[]

}
