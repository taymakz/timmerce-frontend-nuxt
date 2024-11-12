export interface CatalogSearchHeaderResultType {
  products: CatalogSearchHeaderProductType[]
  categories: CatalogSearchHeaderCategoryType[]
  brands: CatalogSearchHeaderBrandType[]
}

export interface CatalogSearchHeaderProductType {
  title_ir: string
  title_en: string
  url: string
  image: string
}

export interface CatalogSearchHeaderBrandType {
  title_ir: string
  title_en: string
  url: string
}
export interface CatalogSearchHeaderCategoryType {
  title_ir: string
  title_en: string
  url: string
}
