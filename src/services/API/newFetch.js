export async function newFetch (url) {
  return await fetch(url)
    .then(async function (response) {
      const responseBody = await response.json()
      if (response.status !== 200) {
        return true
      }
      return responseBody
    })
    .catch(async function (error) {
      return error
    })
}
