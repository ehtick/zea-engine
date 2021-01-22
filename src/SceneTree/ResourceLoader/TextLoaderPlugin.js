function checkStatus(response) {
  if (!response.ok) {
    return false
  }

  return response
}

/**
 * Text loader plugin.
 */
class TextLoaderPlugin {
  init(resourceLoader) {
    this.resourceLoader = resourceLoader
  }

  /**
   * The type of file this pluglin handles.
   * @return {string} The type of file.
   */
  getType() {
    return 'text'
  }

  loadFile(url) {
    this.resourceLoader.incrementWorkload(1)

    const promise = new Promise(
      (resolve, reject) => {
        fetch(url).then((response) => {
          this.resourceLoader.incrementWorkDone(1)
          if (checkStatus(response)) resolve(response.text())
          else reject(`loadText: ${response.status} - ${response.statusText}`)
        })
      },
      () => {}
    )

    return promise
  }
}

export { TextLoaderPlugin }
