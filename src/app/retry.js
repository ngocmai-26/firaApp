export const retry = async (callback, delay, max, error, current = 0) => {
  try {
    return await callback()
  } catch (e) {
    if (current > max) return null
    if (error) error(e)
    setTimeout(async () => {
      current++
      await retry(callback, delay, max, error, current)
    }, delay * 1000)
  }
}
