function checkStatus(response: any) {
  if (!response.ok) {
    return false
  }

  return response
}

/**
 * Text loader plugin.
 */
class TextLoaderPlugin {
  init() {}

  /**
   * The type of file this plugin handles.
   * @return The type of file.
   */
  getType(): string {
    return 'text'
  }

  loadFile(url: string): Promise<unknown> {
    const promise = new Promise((resolve, reject) => {
      fetch(url).then((response) => {
        if (checkStatus(response)) resolve(response.text())
        else reject(`loadText: ${response.status} - ${response.statusText} : ${url}`)
      })
    })

    return promise
  }
}

export { TextLoaderPlugin }
