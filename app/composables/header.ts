import { CatalogSearchHeader } from '~/services/catalog/search-header'
import type { CatalogSearchHeaderResultType } from '~/types/catalog/search-header'

export function useHeaderSearch() {
  const search = ref<string>('')
  const searchLoading = ref<boolean>(false)
  const searchResult = ref<CatalogSearchHeaderResultType | null>(null)
  const searchPerformed = ref<boolean>(false)

  // Watch and debounce search input
  watchDebounced(
    search,
    async () => {
      // Prevent search when input is too short
      if (search.value.length < 3) {
        searchPerformed.value = false
        return
      }

      searchLoading.value = true
      try {
        // Fetch search results
        const result = await CatalogSearchHeader(search.value)
        searchPerformed.value = true

        if (result.success) {
          searchResult.value = result.data
        }
        else {
          searchResult.value = null
        }
      }
      catch (error) {
        console.error('Search error:', error)
        searchResult.value = null
      }
      finally {
        searchLoading.value = false
      }
    },
    { debounce: 500, maxWait: 3000 },
  )

  return { search, searchLoading, searchResult, searchPerformed }
}
