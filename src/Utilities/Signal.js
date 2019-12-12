/** Class representing a signal. */
class Signal {
  /**
   * Create a signal.
   * @param {boolean} toggledSignal - The toggledSignal value.
   */
  constructor(toggledSignal = false) {
    this.__slots = []
    // A toggled signal means that once it is fired, it is toggled to true
    // and never fired again. Any connections are immedietly emitted.
    // Note: this is emulating the 'promise' system, and I really should
    // investigate using promisses.
    this.__toggledSignal = toggledSignal
    this.__toggled = false
    this.__data = null

    this.connect = this.connect.bind(this)
    this.disconnect = this.disconnect.bind(this)
    this.emit = this.emit.bind(this)
  }

  /**
   * The connect method.
   * @param {any} fn - The fn param.
   * @return {any} - The return value.
   */
  connect(fn) {
    if (fn == undefined)
      throw new Error('a function callback must be passed to Signal.connect')
    if (this.__slots.indexOf(fn) != -1) {
      console.warn("fn '" + fn.name + "' already connected to Signal.")
      return
    }
    const id = this.__slots.length
    this.__slots[id] = fn

    if (this.__toggledSignal && this.__toggled) {
      // Note: we are moving away from using 'toggled' Signals
      // in favor of promises. We will start generating errors
      // when connecting to Toggled signals soon

      // This signal has already been toggled, so we should emit immedietly.
      if (this.__data) fn(...this.__data)
      else fn()
    }
    return id
  }

  /**
   * The disconnect method.
   * @param {any} fn - The fn param.
   */
  disconnect(fn) {
    if (fn == undefined)
      throw new Error('a function callback must be passed to Signal.disconnect')
    const ids = []
    this.__slots.forEach(function(item, index) {
      if (item === fn) {
        ids.push(index)
      }
    })
    if (ids.length == 0) {
      console.warn(
        'callback :' +
          fn.name +
          ' was not connected to this signal:' +
          this.__name
      )
      return
    }
    for (const id of ids) {
      this.__slots[id] = undefined
    }
  }

  /**
   * The disconnectId method.
   * @param {any} id - The id param.
   */
  disconnectId(id) {
    if (!this.__slots[id]) throw new Error('Invalid ID')
    this.__slots[id] = undefined
  }

  /**
   * Emit the signal to all slots(observers)
   * @param {...object} ...data - The ...data param.
   */
  emit(...data) {
    if (this.__toggledSignal) {
      if (!this.__toggled) {
        this.__toggled = true
        this.__data = data
      } else {
        console.warn(
          'Toggled signals should only be fired once, or untoggled before re-firing..'
        )
      }
    }
    const len = this.__slots.length
    for (let i = 0; i < len; i++) {
      const fn = this.__slots[i]
      // Skip disconnected slots.
      if (fn) {
        fn(...data)
      }
    }
  }

  /**
   * The isToggled method.
   * @return {boolean} - The return value.
   */
  isToggled() {
    return this.__toggled
  }

  /**
   * The setToggled method.
   * @param {any} state - The state param.
   */
  setToggled(state) {
    this.__toggled = state
    this.__data = undefined
  }

  /**
   * The getNumConnections method.
   * @return {number} - The number of connections to this signal.
   */
  getNumConnections() {
    return this.__slots.length
  }

  /**
   * The untoggle method.
   */
  untoggle() {
    // When a toggled action needs to be re-applied, we should untoggle first.
    this.__toggled = false
    this.__data = undefined
  }
}

export { Signal }
