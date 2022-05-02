function checkStatus(response: any) {
  if (!response.ok) {
    return false
  }

  return response
}

/**
 * JSON loader plugin.
 */
class JsonLoaderPlugin {
  init(): void {}

  /**
   * The type of file this plugin handles.
   * @return The type of file.
   */
  getType(): string {
    return 'json'
  }

  loadFile(url: string): Promise<unknown> {
    const promise = new Promise(
      (resolve, reject) => {
        fetch(url).then((response) => {
          if (checkStatus(response)) resolve(response.json())
          else reject(`loadJSON: ${response.status} - ${response.statusText} : ${url}`)
        })
      }
      // () => {}
    )

    return promise
  }
}

export { JsonLoaderPlugin }
