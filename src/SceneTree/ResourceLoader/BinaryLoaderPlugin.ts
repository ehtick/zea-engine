function checkStatus(response: any) {
  if (!response.ok) {
    return false
  }

  return response
}

/**
 * Binary loader plugin.
 */
class BinaryLoaderPlugin {
  init(): void {}

  /**
   * The type of file this plugin handles.
   * @return The type of file.
   */
  getType(): string {
    return 'binary'
  }

  loadFile(url: string): Promise<unknown> {
    const promise = new Promise(
      (resolve, reject) => {
        fetch(url).then((response) => {
          if (checkStatus(response)) resolve(response.arrayBuffer())
          else reject(`loadBinary: ${response.status} - ${response.statusText} : ${url}`)
        })
      }
      // () => {}
    )

    return promise
  }
}

export { BinaryLoaderPlugin }
