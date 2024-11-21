import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CatalogSearchHeader } from '~/services/catalog/search-header'
import { useAuthenticateStore } from '~/stores/authenticate'
import type { CatalogSearchHeaderResultType } from '~/types/catalog/search-header'

export function useSearchHandler(changeFocusState: (state: boolean) => void) {
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthenticateStore()

  // Search states
  const search = ref<string>('')
  const searchLoading = ref<boolean>(false)
  const searchResult = ref<CatalogSearchHeaderResultType | null>(null)
  const searchPerformed = ref<boolean>(false)
  const searchInput = ref<HTMLInputElement | null>(null)

  // Perform search with debouncing
  const performSearch = useDebounceFn(async () => {
    if (search.value.length < 3) {
      searchPerformed.value = false
      return
    }

    searchLoading.value = true
    try {
      const result = await CatalogSearchHeader(search.value)
      searchPerformed.value = true
      searchResult.value = result.success ? result.data : null
    }
    catch (error) {
      console.error('Search error:', error)
      searchResult.value = null
    }
    finally {
      searchLoading.value = false
    }
  }, 500)

  // Watch for search input changes
  watch(search, performSearch)

  // Submit function for performing a search
  async function submit() {
    if (!search.value)
      return

    // Close the search input and blur the field
    changeFocusState(false)
    searchInput.value?.blur()

    // Save search history and navigate to the search results page
    authStore.SetUserSearchHistory(search.value)
    await router.push({ path: '/search', query: { q: search.value } })

    // Reset search input and results
    search.value = ''
    searchResult.value = null
  }

  // Watch route changes to reset search state
  watch(
    () => route.fullPath,
    () => {
      search.value = ''
      searchResult.value = null
      changeFocusState(false)
    },
  )

  return {
    search,
    searchLoading,
    searchResult,
    searchPerformed,
    searchInput,
    submit,
  }
}
