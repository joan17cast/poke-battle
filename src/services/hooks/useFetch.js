import { useState } from 'react'

export function useFetch () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // * GET
  async function useFetchGet (url) {
    await setLoading(true)
    await setError(false)
    return await fetch(url)
      .then(async function (response) {
        const responseBody = await response.json()
        let error = false
        if (response.status !== 200) {
          error = true
        }
        await setLoading(false)
        await setError(error)
        return responseBody
      })
      .catch(async function (error) {
        await setLoading(false)
        await setError(true)
        return error
      })
  }

  return { loading, error, useFetchGet }
}
