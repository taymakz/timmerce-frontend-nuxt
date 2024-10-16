// Split number by , 10000 => 10,000
export function splitNumber(value: number | string | null) {
  if (value === null || value === undefined || value === 0)
    return '0'

  // Round the number to 2 decimal places
  const roundedValue = Math.round(Number(value) * 100) / 100

  // Use Intl.NumberFormat to format the rounded value with commas
  return new Intl.NumberFormat().format(roundedValue)
}

export function calcDiffPercentage(originalPrice: number, discount: number) {
  // Calculate the diffrent price percentage
  return Math.floor(((originalPrice - discount) / originalPrice) * 100)
}

export function useCapitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

interface useTimerArgs {
  second?: number
  minute?: number
  hour?: number
}
// Timer that used for Resend OTP and ...
export function useTimer(option: useTimerArgs) {
  // Calculate total time in milliseconds
  const totalTimeInMilliseconds
    = (option.second || 0) * 1000
    + (option.minute || 0) * 60 * 1000
    + (option.hour || 0) * 60 * 60 * 1000
  // Calculate total time in seconds
  const totalTimeInSeconds
    = (option.second || 0)
    + (option.minute || 0) * 60
    + (option.hour || 0) * 60 * 60
  const { isPending, start: startTimer } = useTimeoutFn(
    () => {},
    totalTimeInMilliseconds,
  )
  const { counter, reset, pause } = useInterval(1000, { controls: true })
  watch(
    () => isPending,
    (oldVal, newVal) => {
      if (oldVal && !newVal)
        pause()
    },
  )
  function resetTimer() {
    reset()
    startTimer()
  }
  const getCounter = computed((): number => totalTimeInSeconds - counter.value)

  const getFormattedCounter = computed(() => {
    const remainingTimeInSeconds = getCounter.value
    const formattedMinutes = Math.floor(remainingTimeInSeconds / 60)
    const formattedSeconds = remainingTimeInSeconds % 60
    return `${formattedSeconds.toString().padStart(2, '0')} : ${formattedMinutes}`
  })

  return {
    isPending,
    getFormattedCounter,

    startTimer,
    resetTimer,
  }
}

// Lock Body Scroll ( Use With modals,Sheets and ... )
export function useWebScrollLock() {
  const isLocked = ref<boolean>(false)

  if (import.meta.client) {
    const refRoot = ref()
    const scrollbarWidth = useCssVar('--scrollbar-width', refRoot)
    const windowScrollTop = useCssVar('--window-scroll-top', refRoot)

    if (!scrollbarWidth.value)
      scrollbarWidth.value = `${window.innerWidth - document.body.clientWidth}px`

    const classes = document.documentElement.classList

    watch(isLocked, (val) => {
      if (val) {
        windowScrollTop.value = `-${window.scrollY}px`
        classes.add('scroll-lock')
      }
      else {
        const scrollY = windowScrollTop.value
        classes.remove('scroll-lock')
        window.scrollTo(0, Number.parseInt(scrollY || '0') * -1)
      }
    })
  }

  return computed<boolean>({
    get() {
      return isLocked.value
    },
    set(v) {
      isLocked.value = v
    },
  })
}

// Simple expiring cache for useMemoize
export function createSimpleMemoizeExpiringCache(timeout = 4000) {
  const cache = new Map()

  return {
    get(key: string) {
      const entry = cache.get(key)
      if (entry) {
        return entry.value
      }
      return undefined
    },
    set(key: string, value: any) {
      cache.set(key, { value })
      setTimeout(() => cache.delete(key), timeout) // Automatically delete cache after timeout
    },
    has(key: string) {
      return cache.has(key)
    },
    delete(key: string) {
      cache.delete(key)
    },
    clear() {
      cache.clear()
    },
  }
}
