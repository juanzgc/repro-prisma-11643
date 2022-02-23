export const fetcher = async url => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const info = await res.json();
    let errorMessage = 'An error occurred while fetching the data.'
    if (info && info.error) {
      errorMessage = info.error
    }

    const error : any = new Error(errorMessage)
    // Attach extra info to the error object.
    error.info = info
    error.status = res.status
    error.url = url
    console.error(error);
    throw error;
  }

  return res.json()
}